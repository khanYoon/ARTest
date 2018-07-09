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
				this.obj("#" + positionArr[i]).object3D.wonId = "user1";
			}

		},
		zoomInOut : function(startObjId, endObjId){

			this.confirm("allViewDialog", false);
			let scene = this.obj("a-scene").object3D;
			let startCamera = this.obj("#" + startObjId).object3D;
			let renderer = new THREE.WebGLRenderer();

			let endCamera = this.obj("#" + endObjId).object3D;

			Window.startCamera = startCamera;
			Window.endCamera = endCamera;

			console.log(startCamera, endCamera);

			// let scene1 = document.querySelector("a-scene");
			// let camera1 = this.obj("#allViewCamera").querySelector("[camera]");

			// console.log(scene1, camera1);
			// let isMove = true;
			// function render(){
			// 	if(isMove){
			// 		requestAnimationFrame(render);
			// 		camin();
			// 		renderer.render(scene, camera);
			// 	}
			// }

			// // render();
			// var i = 0;
			// function camin(){
				
			// 	if(parseFloat(Math.abs(focusObj.position.x)).toFixed(1) != parseFloat(Math.abs(camera.position.x)).toFixed(1)){

			// 		console.log("===================================================");
			// 		console.log("===================================================");
			// 		console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			// 		console.log(focusObj.position.x, camera.position.x);
			// 		console.log("===================================================");
			// 		console.log("===================================================");

			// 		if(focusObj.position.x > camera.position.x){
			// 			camera.position.x += .2;
			// 		}else{
			// 			camera.position.x -= .2;
			// 		}

			// 	}else{
			// 		if(i <= 16){

			// 			// console.log("===================================================");
			// 			// console.log("===================================================");
			// 			// console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy");
			// 			// console.log(focusObj.position.y, camera.position.y);
			// 			// console.log(camera.rotation.x);
			// 			// console.log(i);
			// 			// console.log("===================================================");
			// 			// console.log("===================================================");

			// 			if(focusObj.position.y > camera.position.y){
			// 				// camera.setAttribute("rotation", {x: camera.getAttribute("rotation").x + .1, y: 30, z: 90});
			// 				// camera.rotation.x += .05;
			// 				// camera.position.y += .01;
			// 				console.log("+++++++++++++++++++++");
			// 			}else{
			// 				// camera.setAttribute("rotation", {x: camera.getAttribute("rotation").x - .1, y: 30, z: 90});
			// 				// camera.rotation.x -= .05;
			// 				// camera.position.y -= .01;
			// 				console.log("----------------------");
			// 			}

			// 			// i++;
			// 			console.log("===================================================");
			// 			console.log("===================================================");
			// 			console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy");
			// 			console.log(i, focusObj.position.y, camera.position.y);
			// 			camera.position.y += .5;

			// 			i++;

			// 		}else{
			// 			isMove = false;
			// 			console.log("===================================================");
			// 			console.log("===================================================");
			// 			console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
			// 			console.log(focusObj.position.z, camera.position.z);
			// 			console.log("===================================================");
			// 			console.log("===================================================");
						
			// 			if(parseFloat(Math.abs(focusObj.position.z)).toFixed(1) != parseFloat(Math.abs(camera.position.z)).toFixed(1)){
			// 				if(focusObj.position.z > camera.position.z){
			// 					camera.position.z += .1;
			// 				}else{
			// 					camera.position.z -= .1;
			// 				}

			// 			}else{
			// 				isMove = false;
			// 			}

			// 		}

			// 	}


			// 	// isMove = false;
			// 	// camera.object3D.y -=.02;
			// 	// camera.position.y-=.09;
			// 	// console.log(camera.position.z);
			// }

			// // alert(startObjId, endObjId);

			// // this.cameraOn("gameViewCamera");

		},
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
		ownerCheck : function(){

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
					// utils.confirm("ownerDialog1", true);
				}else{
					gameStatus = "06";
					// // 본인소유일경우
					// if(ownObj.ownerId == gameInfo.gameUser[nowGameUserIndex].id){
					// 	alert("1");
					// 	utils.confirm("ownerDialog2", true);
					// // 타인 소유일경우
					// }else{

					// }
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
		setOwnerBuild : function(code){
			var isBuilding = ownObj.el.querySelector("[building]").getAttribute("visible");
			var isHouse = ownObj.el.querySelector("[house]").getAttribute("visible");
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log(isBuilding);

			if(isBuilding){
				alert("2");
				this.obj("#buildingBtn").object3D.visible = false;
			}

			if(isHouse){
				this.obj("#houseBtn").object3D.visible = false;
			}
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
		 * 캐릭터 이동
		 * @param moveId : 움직이는 object ID
		 * @param startId : 시작하는 말판의 ID
		 * @param endId : 도착하는 말판의 ID
		 */
		move : function(moveId, startId, endId){
			if(isMoving){
				isMoving = false;

				var _this = gameInfo.gameUser[nowGameUserIndex]._this;

				// 한칸씩 이동
				var obj = utils.obj("#" + moveId);
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				console.log(startId, endId);

				var sPosition = this.obj("#" + startId).object3D.position;
				var ePosition = this.obj("#" + endId).object3D.position;

				var movePosition = {};
				// x축으로 움직일경우
				if(sPosition.x != ePosition.x){
					index = Math.abs(sPosition.x + ePosition.x * -1);
					movePosition = {x: index};
				}
				
				// z축으로 움직일경우
				if(sPosition.z != ePosition.z){
					index = Math.abs(sPosition.z + ePosition.z * -1);
					movePosition = {z: index};
				}

				// x축으로 움직일때
				if(typeof movePosition.x === "number"){
					if(sPosition.x > ePosition.x){
						obj.object3D.position.x += movePosition.x * -1;
					}else{
						obj.object3D.position.x += movePosition.x;
					}

				}
				
				// z축으로 움직일때
				if(typeof movePosition.z === "number"){
					if(sPosition.z > ePosition.z){
						obj.object3D.position.z += movePosition.z * -1;
					}else{
						obj.object3D.position.z += movePosition.z;
					}
				}

				isMoving = true;

			}
			
		},
		/**
		 * 엘리먼트 생성
		 */
		createElement : function(options){
			
			var $elem = [];
			$elem.push("<a-entity");
			if(options){
				for(var i in options){
					var attr = options[i];
					if(typeof attr == "object"){
						var attrString = [];
						for(var m in attr){
							if(m.toLowerCase() == "x" || m.toLowerCase() == "y" || m.toLowerCase() == "z"){
								if(m.toLowerCase() == "y"){
									attrString.push(" " + (Number(attr[m]) + 1));
								}else{
									attrString.push(" " + attr[m]);
								}
							}
						}
						$elem.push(" " + i + "=\"" + attrString.join("") + "\"");
					}else{
						$elem.push(" " + i + "=\"" + attr + "\"");
					}
				}
			}
			$elem.push(options.id + "></a-entity>");
			return $elem.join("");
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
		 * 슬롯머신 시작버튼(랜덤으로 번호들이 돌아감)
		 */
		rouletteStart : function(){
			var num1 = Math.floor(Math.random() * 6);
			var num2 = Math.floor(Math.random() * 6);
			
			this.obj("#roulette1").setAttribute("text", {value: (num1 % 6) + 1});
			this.obj("#roulette2").setAttribute("text", {value: (num2 % 6) + 1});
			rouletteTimeoutId = setTimeout("utils.rouletteStart()",60);
		},
		getText : function(objId){
			return this.obj("#" + objId).getAttribute("text").value;
		},
		setText : function(text){
			utils.obj("#text").querySelector("a-entity").setAttribute("text-geometry", "value", text);
		},
		textView : function(isText){
			var targetText = this.obj("#" + gameInfo.gameUser[nowGameUserIndex].id);
			targetText.querySelector("#text").setAttribute("visible", isText);
		},
		/**
		 * 슬롯머신 정지
		 */
		rouletteEnd : function(){
			clearTimeout(rouletteTimeoutId);
			moveCount = this.getText("roulette1") + this.getText("roulette2");
			console.log(this.getText("roulette1"), this.getText("roulette2"))
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
		 * 오브젝트 닫기/열기
		 * @param string : objectId - 오브젝트ID
		 * @param isView : 
		 */
		objView : function(objId, isView){
			utils.obj("#" + objId).setAttribute("visible", isView);
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
		 * 슬롯머신 초기화
		 */
		luckSevenInit : function(){
			this.obj("#roulette1").setAttribute("text", {value: 0});
			this.obj("#roulette2").setAttribute("text", {value: 0});
		},
		/**
		 * 카메라 on
		 * @param string: cameraId - 카메라 ID
		 */
		cameraOn : function(cameraId){
			var allCamera = this.objAll("[camera]");
			for(var i=0; i < allCamera.length -1; i++){
				allCamera[i].setAttribute("camera", "active", false);
				console.log(allCamera[i].getAttribute("id"));
				if(allCamera[i].getAttribute("id") == cameraId){
					allCamera[i].setAttribute("camera", "active", true);
					break;
				}
			}
		},
		/**
		 * Inspect Scene 버튼 클릭시 실행
		 */
		fullSceneBtn : function(_this){
			if(_this.state.inspectorEnabled){
				utils.confirm("startConfirm", true);
			}else{
				utils.confirm("startConfirm", false);
			}
		},
		turnOver : function(){
			gameStatus = "08";
		}
		
}