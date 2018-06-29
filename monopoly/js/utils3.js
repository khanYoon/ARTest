var scene;
var rouletteTimeoutId;
// 말판의 포지션
var positionArr = ["bord1-1", "bord1-2", "bord1-3", "bord1-4", "bord1-5", "bord2-1", "bord2-2", "bord2-3", "bord2-4", "bord2-5", "bord3-1", "bord3-2", "bord3-3", "bord3-4", "bord3-5", "bord4-1", "bord4-2", "bord4-3", "bord4-4", "bord4-5"];
// 꺽어지는 위치
var turnArr = ["bord1-1", "bord2-1", "bord3-1", "bord4-1"];
// 게임 유저
var gameInfo = {
	  gameUser : [{id:"user1", name:"홍길동", color:"yellow", active:"on", _this:{}}, {id:"user2", name:"AI 유져", color:"black", active:"off"}]
	 ,gameStatus : [{code:"00", name:"게임준비"}, {code:"01", name:"시작버튼"}, {code:"02", name:"주사위굴리기"}, {code:"03", name:"이동"}, {code:"04", name:"정지"}
	             , {code:"05", name:"말판구입"}, {code:"06", name:"건물건설"}, {code:"07", name:"전체View"}, {code:"08", name:"대기"},]
}
var moveArr = []
// 현재 순서인 유저
var nowGameUserIndex = 0;
// 전체 게임유저수
var totalUser = 2;
// 움직인 칸수
var moveCount = 0;
// 이동중
var isMoving = true;
// 소유자 체크중
var isOwnerCheck = true;
var gameStatus = "00";
var ownObj = {};

var renderer = new THREE.WebGLRenderer({ antialias: true });

var movingUserId;
var backBtn = false;

utils = {
		/**
		 * scene이 로드 되면 이벤트를 추가한다.
		 */
		init : function(){
			scene = document.querySelector("a-scene");
			if(scene.hasLoaded) {
				utils.setUserInfo()
			}else{
				scene.addEventListener("loaded", utils.setUserInfo());
			}
		},
		/**
		 * 사용자 정보 저장 및 소유자 초기화
		 */
		setUserInfo : function(){

			for(var i =0; i < positionArr.length; i++){
				this.obj("#" + positionArr[i]).object3D.ownerId = "user1";
				this.obj("#" + positionArr[i]).object3D.el.querySelector("[geometry]").setAttribute("material", "color", "yellow");
			}

		},
		/*
		 * 카메라 줌 아웃
		 */
		/**
		 * 게임상태 취득
		 */
		getGameStatus : function(code){
			let gameStatusObj;

			const gameStatusArr = gameInfo.gameStatus;
			for(var i = 0; i < gameStatusArr.length; i++){
				if(code == gameStatusArr[i].code){
					gameStatusObj = gameStatusArr[i];
					break;
				}
			}
			return gameStatusObj;
		},
		/**
		 * 소유자 확인
		 */
		ownerCheck : function(moveId){

			movingUserId = moveId;
			// 시작점은 제외
			if(gameInfo.gameUser[nowGameUserIndex]._this.positionIndex == 0){
				isOwnerCheck = false;
			}

			if(isOwnerCheck){
				isOwnerCheck = false;

				const targetId = positionArr[gameInfo.gameUser[nowGameUserIndex]._this.positionIndex];
				ownObj = this.obj("#" + targetId).object3D;

				// 소유자가 없을경우
				if(typeof ownObj.ownerId === "undefined"){
					gameStatus = "05";
				// 소유자가 있을경우
				}else{

					if(moveId != ownObj.ownerId){
						var isHouse = ownObj.el.querySelector("[house]").getAttribute("visible");
						var isBuilding = ownObj.el.querySelector("[building]").getAttribute("visible");

						var toll = 200;
						var houseUse = 0;
						var buildingUse = 0;

						var text = "Toll : 200";
						if(isHouse){
							houseUse = 300;
							text += "House Use : 300 ";
						}

						if(isBuilding){
							buildingUse = 500;

							text += "Building Use : 500 ";
						}

						text += "Minus";
						utils.setText(text);
						utils.textView(true);
						setTimeout("utils.textView(false);utils.turnOver();", 3000);

					}else{

						gameStatus = "06";

					}

				}

				isOwnerCheck = true;

			}
		},
		/**
		 * 소유자 등록
		 */
		setOwner : function(){
			ownObj.ownerId = gameInfo.gameUser[nowGameUserIndex].id;
			ownObj.el.querySelector("[geometry]").setAttribute("material", "color", gameInfo.gameUser[nowGameUserIndex].color);
			gameStatus = "06";
		},
		/*
		 * 건물 체크
		 */
		buildCheck : function(moveId){

			var isHouse = ownObj.el.querySelector("[house]").getAttribute("visible");
			var isBuilding = ownObj.el.querySelector("[building]").getAttribute("visible");

			if(isHouse == false && isBuilding == false){
				utils.confirm("buildDialog1", true);
			}else if(isHouse == false && isBuilding == true){
				utils.confirm("buildDialog2", true);
			}else if(isHouse == true && isBuilding == false){
				utils.confirm("buildDialog3", true);
			}else if(isHouse == true && isBuilding == true){
				utils.confirm("buildDialog4", true);
			}

		},
		/**
		 * 건설하기
		 **/
		setOwnerBuild : function(code){

			if(code == "01"){
				ownObj.el.querySelector("[house]").setAttribute("visible", true);
			}else if(code == "02"){
				ownObj.el.querySelector("[building]").setAttribute("visible", true);
			}else if(code == "03"){
				ownObj.el.querySelector("[house]").setAttribute("visible", true);
				ownObj.el.querySelector("[building]").setAttribute("visible", true);
			}
			utils.buildCheck();
		},
		/**
		 * 캐릭터의 첫 포지션
		 */
		firstCharacterPosition : function(){

			// 캐릭터가 처음 위치할 표지션 찾기
			var firstPositionId = $("[firstPosition]").attr("id");
			var firstPosition = this.obj("#" + firstPositionId).object3D.position;

			// 캐릭터의 Element 생성
			var character = this.createElement({id:"character1", geometry:"primitive:sphere", position:firstPosition});
			$("a-scene").append(character);

		},
		/**
		 * 포지션 비교
		 */
		positionCompare : function(sPosition, ePosition){
			var index = 0;

			if(sPosition.x != ePosition.x){
				index = Math.abs(sPosition.x + ePosition.x * -1);
				return {x: index};
			}

			if(sPosition.z != ePosition.z){
				index = Math.abs(sPosition.z + ePosition.z * -1);
				return {z: index};
			}

		},
		/**
		 * 캐릭터 이동
		 * @param moveId : 움직이는 object ID
		 * @param startId : 시작하는 말판의 ID
		 * @param endId : 도착하는 말판의 ID
		 */
		move : function(moveId, positionIndex){

			let scene = this.obj("a-scene").object3D;
			let moveObject = this.obj("#" + moveId).object3D;
			let renderer = new THREE.WebGLRenderer();

			let isMoving = true;
			let _moveCount = 0;
			let movingIndex = 0;

			function render(){
				if(isMoving){
					requestAnimationFrame(render);
					moving();
					renderer.render(scene, moveObject);
				}
			}

			render();

			function moving(){
				if(_moveCount == moveCount){

					utils.obj("#" + moveId).setAttribute("animation-mixer", "clip", "run_stop");
					isMoving = false;
					utils.textView(false);

				}else{

					var sPositionIndex = positionIndex + _moveCount;
					var ePositionIndex = sPositionIndex + 1;

					// 마지막 말판에 도착했는지를 확인
					if(sPositionIndex >= positionArr.length){
						sPositionIndex -= positionArr.length;
					}
					if(ePositionIndex >= positionArr.length){
						ePositionIndex -= positionArr.length;
					}

					// 시작ID
					var startId = positionArr[sPositionIndex];
					// 종료ID
					var endId = positionArr[ePositionIndex];

					var _y = 0;
					if(movingIndex == 0 && (endId == "bord1-1" || endId == "bord2-1" || endId == "bord3-1" || endId == "bord4-1")){
						var _y = utils.obj("#" + moveId).getAttribute("rotation").y - 90;

						if(utils.obj("#" + moveId).getAttribute("rotation").y <= 0){
							_y = 270;
						}
						utils.obj("#" + moveId).setAttribute("rotation", {x:-180, y:_y, z:-180});
					}

					// 한칸씩 이동
					var obj = utils.obj("#" + moveId);
					var sPosition = utils.obj("#" + startId).object3D.position;
					var ePosition = utils.obj("#" + endId).object3D.position;

					var movePosition = {};

					let isLoop = true;

					// x축으로 움직일경우
					if(sPosition.x != ePosition.x){
						index = Math.abs(sPosition.x + ePosition.x * -1);
						movePosition = {x: index};
						// x축으로 움직일때
						if(typeof movePosition.x === "number"){
							if(sPosition.x > ePosition.x){
								obj.object3D.position.x = parseFloat(parseFloat(obj.object3D.position.x) + parseFloat(parseFloat(((movePosition.x * -1) / 4) / 8).toFixed(3))).toFixed(3);
							}else{
								obj.object3D.position.x = parseFloat(parseFloat(obj.object3D.position.x) + parseFloat(parseFloat((movePosition.x / 4) / 8).toFixed(3))).toFixed(3);
							}
						}
					}

					// z축으로 움직일경우
					if(sPosition.z != ePosition.z){
						index = Math.abs(sPosition.z + ePosition.z * -1);
						movePosition = {z: index};
						// z축으로 움직일때
						if(typeof movePosition.z === "number"){
							if(sPosition.z > ePosition.z){
								obj.object3D.position.z = parseFloat(parseFloat(obj.object3D.position.z) + parseFloat(parseFloat(((movePosition.z * -1) / 4) / 20).toFixed(3))).toFixed(3);
							}else{
								obj.object3D.position.z = parseFloat(parseFloat(obj.object3D.position.z) + parseFloat(parseFloat((movePosition.z / 4) / 20).toFixed(3))).toFixed(3);
							}
						}
					}

					if(movingIndex == 30){
						_moveCount++;
						movingIndex = 0;
					}else{
						//2018 06-26 khan 추가
//						alert('movingIndex : '+ movingIndex);
						movingIndex ++;
					}

				}
			}

		},
		/**
		 * 슬롯머신 시작버튼(랜덤으로 번호들이 돌아감)
		 */
		rouletteStart : function(){
			var num1 = Math.floor(Math.random() * 6);
			var num2 = Math.floor(Math.random() * 6);

			this.obj("#roulette1").setAttribute("text", {value: (num1 % 6) + 1});
			this.obj("#roulette2").setAttribute("text", {value: (num2 % 6) + 1});
			rouletteTimeoutId = setTimeout("utils.rouletteStart()",60);
		},
		/**
		 * 슬롯머신 정지
		 */
		rouletteEnd : function(){
			clearTimeout(rouletteTimeoutId);
			moveCount = this.getText("roulette1") + this.getText("roulette2");
			if(moveCount == 0){
				alert("start 버튼을 눌러 주세요");
				return false;
			}

			this.objView("rouletteBoard", false);
			this.setText(moveCount + " MOVE");
			this.textView(true);
			this.luckSevenInit();
		},
		/**
		 * 슬롯머신 초기화
		 */
		luckSevenInit : function(){
			this.obj("#roulette1").setAttribute("text", {value: 0});
			this.obj("#roulette2").setAttribute("text", {value: 0});
		},
		/**
		 * confirm 창
		 * @param string : confirmId - 컨펌창 ID
		 * @param boolean : isView - 컨펌창 열기/닫기
		 * @param object : callBackObj - 콜백정보 (fn:콜백함수(function or string), parma:파라메터(Array)) ex){fn:utils.objView, param:['rouletteBoard', true]}
		 */
		confirm : function(confirmId, isView, callBackObj){

			if(confirmId == "empty"){
				return;
			}

			// 모든 다이얼로그를 안보이게 한다.
			var dialogContainer = this.objAll("a-gui-flex-container");
			for(var i = 0; i < dialogContainer.length; i++){
				dialogContainer[i].setAttribute("visible", false);
			}

			// 특정 다이얼로그를 보여지거나 숨긴다.
			var confirmObj = this.obj("#" + confirmId);
			if(typeof isView != "undefined"){
				if(confirmObj.querySelector("a-gui-label") != null){
					confirmObj.querySelector("a-gui-label").object3D.visible = isView;
				}
				var buttonArr = confirmObj.querySelectorAll("a-gui-button");
				for(var i= 0; i < buttonArr.length; i++){
					buttonArr[i].object3D.visible = isView;
				}
				confirmObj.object3D.visible = isView;

			}

			// 처리후 콜백 처리한다.
			if(typeof callBackObj === "object"){
				if(typeof callBackObj.fn === "function"){

					if(typeof callBackObj.param === "undefined"){
						callBackObj.fn();
					}else{
						if(callBackObj.param.length === 3){
							callBackObj.fn(callBackObj.param[0], callBackObj.param[1], callBackObj.param[2]);
							return;
						}else if(callBackObj.param.length === 2){
							callBackObj.fn(callBackObj.param[0], callBackObj.param[1]);
							return;
						}else if(callBackObj.param.length === 1){
							callBackObj.fn(callBackObj.param[0]);
							return;
						}else{
							callBackObj.fn();
							return;
						}
					}

				}else if(typeof callBackObj.fn === "string"){
					if(callBackObj.param.length === 3){
						new Function(callBackObj.fn)(callBackObj.param[0], callBackObj.param[1], callBackObj.param[2]);
						return;
					}else if(callBackObj.param.length === 2){
						new Function(callBackObj.fn)(callBackObj.param[0], callBackObj.param[1]);
						return;
					}else if(callBackObj.param.length === 1){
						new Function(callBackObj.fn)(callBackObj.param[0]);
						return;
					}else{
						new Function(callBackObj.fn)();
						return;
					}
				}
			}

		},
		/**
		 * 게임 순서를 다음사람에게 넘김
		 */
		turnOver : function(){
			gameStatus = "08";
		},
		/**
		 * 오브젝트의 정보를 selector
		 * @param string : 오브젝트 ID
		 */
		obj : function(arg){
			return document.querySelector(arg);
		},
		/**
		 * 엘리먼트 또는 같은 테그명의 오브젝트를 취득
		 * @param string : 엘리먼트명 또는 같은 테그명
		 */
		objAll : function(arg){
			return document.querySelectorAll(arg);
		},
		/**
		 * 텍스트 데이터 취득
		 */
		getText : function(objId){
			return this.obj("#" + objId).getAttribute("text").value;
		},
		/**
		 * 텍스트 입력
		 */
		setText : function(text){
			utils.obj("#alertText").querySelector("a-entity").setAttribute("text-geometry", "value", text);
		},
		/**
		 * 텍스트 보여주기
		 */
		textView : function(isText){
			if(isText ==  false){
				utils.obj("#alertText").querySelector("a-entity").setAttribute("text-geometry", "value", " ");
			}
			utils.obj("#alertText").setAttribute("visible", isText);
		},
		/**
		 * 오브젝트 닫기/열기
		 * @param string : objectId - 오브젝트ID
		 * @param isView :
		 */
		objView : function(objId, isView){
			utils.obj("#" + objId).setAttribute("visible", isView);
		}

}
