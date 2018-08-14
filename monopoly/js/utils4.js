var scene;
var rouletteTimeoutId;
// 말판의 포지션
var positionArr = ["board1","board1-1", "board1-2", "board1-3", "board1-4", "board1-5", "board2", "board2-1", "board2-2", "board2-3", "board2-4", "board2-5", "board3", "board3-1", "board3-2", "board3-3", "board3-4", "board3-5", "board4", "board4-1", "board4-2", "board4-3", "board4-4", "board4-5"];
// 꺽어지는 위치
var turnArr = ["board1", "board2", "board3", "board4"];
// 게임 유저
var gameInfo = {
	  gameUser : [{id:"user1", name:"홍길동", color:"yellow", active:"on", model:"B", _this:{}}, {id:"user2", name:"AI 유져", color:"black", active:"off", model:"C"}]
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

var testCheck = false;

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

			//시작점에 서 false 로 바뀐뒤  turnOver되면 isOwnerCheck 값이 항상 false 이므로 매번 호출 될때 마다 초기화
			isOwnerCheck = true;
			// 시작점은 제외
            // 추가적으로 코너 추가
			if(gameInfo.gameUser[nowGameUserIndex]._this.positionIndex == 0 || gameInfo.gameUser[nowGameUserIndex]._this.positionIndex == 6
                || gameInfo.gameUser[nowGameUserIndex]._this.positionIndex == 12 || gameInfo.gameUser[nowGameUserIndex]._this.positionIndex == 18){

				//20180702 khan 추가
				utils.turnOver();
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
                        var flateId =  positionArr[gameInfo.gameUser[nowGameUserIndex]._this.positionIndex];
                        var flate = document.getElementById(flateId);

                        var small = flate.childNodes.item(1);
                        var large = flate.childNodes.item(3);

                        var isSmall = small.getAttribute("visible");
                        var isLarge = large.getAttribute("visible");

						var toll = 200;
						var smallUse = 0;
						var largeUse = 0;

						var text = "Toll : 200";
						if(isSmall){
                            smallUse = 300;
							text += "Small Use : 300 ";
						}

						if(isLarge){
                            largeUse = 500;

							text += "Large Use : 500 ";
						}

						text += "Minus";
						utils.setText(text);
						utils.textView(true);
						utils.turnOver();
						setTimeout("utils.textView(false);", 1000);


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
			//user가 위치한 flate의 id를 찾아 가져온다.
            var flateId =  positionArr[gameInfo.gameUser[nowGameUserIndex]._this.positionIndex];
            //flate 정보 가져오기.
            var flate = document.getElementById(flateId);
            //이전 모델 정보 가져오기
            var models = flate.getAttribute("gltf-model");

            var split = models.split("_");
            var splitNo = (split[4]).split(".")
            var changeModel = "#SM_"+ split[1] +"_"+ split[2]+"_"+gameInfo.gameUser[nowGameUserIndex].model+"_"+ splitNo[0];
            flate.setAttribute("gltf-model", changeModel);
			gameStatus = "06";
		},
		/*
		 * 건물 체크
		 */
		buildCheck : function(moveId){
		    //현재 캐릭터가 있는 위치의 플레이트 판을 찾고 자식인 building 들을 찾아세팅 해준다.
            var flateId =  positionArr[gameInfo.gameUser[nowGameUserIndex]._this.positionIndex];
            var flate = document.getElementById(flateId);

            var small = flate.childNodes.item(1);
            var large = flate.childNodes.item(3);

			var isSmall = small.getAttribute("visible");
			var isLarge = large.getAttribute("visible");

			if(isSmall == false && isLarge == false){
				utils.confirm("buildDialog1", true);
			}else if(isSmall == false && isLarge == true){
				utils.confirm("buildDialog2", true);
			}else if(isSmall == true && isLarge == false){
				utils.confirm("buildDialog3", true);
			}else if(isSmall == true && isLarge == true){
				utils.confirm("buildDialog4", true);
			}

		},
		/**
		 * 건설하기
		 **/
		setOwnerBuild : function(code){
            var flateId =  positionArr[gameInfo.gameUser[nowGameUserIndex]._this.positionIndex];
            var flate = document.getElementById(flateId);
            var small = flate.childNodes.item(1);
            var large = flate.childNodes.item(3);

			if(code == "01"){
				small.setAttribute("visible", true);
			}else if(code == "02"){
				large.setAttribute("visible", true);
			}else if(code == "03"){
                small.setAttribute("visible", true);
                large.setAttribute("visible", true);
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
					if(movingIndex == 0 && (endId == "board1" || endId == "board2" || endId == "board3" || endId == "board4")){
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
                    //
					// // x축으로 움직일경우
					// if(sPosition.x != ePosition.x){
					// 	index = Math.abs(sPosition.x + ePosition.x * -1);
					// 	movePosition = {x: index};
					// 	// x축으로 움직일때
                     //    //플레이트 내에서는 x축 차이가 world 내에서는 z축 차이 이므로  플레이트 값이 x축 값이 차이날때 obj를 z 축 값 변경으로 이동한다.
					// 	if(typeof movePosition.x === "number"){
					// 		if(sPosition.x > ePosition.x){
					// 			obj.object3D.position.z += movePosition.x / 4;
					// 		}else{
					// 			obj.object3D.position.z += (movePosition.x  * -1) / 4;
					// 		}
					// 	}
					// }
					//
					// // z축으로 움직일경우
					// if(sPosition.z != ePosition.z){
					// 	index = Math.abs(sPosition.z + ePosition.z * -1);
					// 	movePosition = {z: index};
					// 	// z축으로 움직일때
                     //    //플레이트 내에서는 z축 차이가 world 내에서는 x축 차이 이므로  플레이트 값이 z축 값이 차이날때 obj를 x 축 값 변경으로 이동한다.
					// 	if(typeof movePosition.z === "number"){
					// 		if(sPosition.z > ePosition.z){
					// 			obj.object3D.position.x += (movePosition.z * -1) / 4;
					// 		}else{
					// 			obj.object3D.position.x += movePosition.z / 4;
					// 		}
					// 	}
					// }
                    //
					// if(movingIndex == 3){
					// 	_moveCount++;
					// 	movingIndex = 0;
					// }else{
					// 	movingIndex++;
					// }

                    // x축으로 움직일경우
                    if(sPosition.x != ePosition.x){
                        index = Math.abs(sPosition.x + ePosition.x * -1);
                        movePosition = {x: index};
                        // x축으로 움직일때
                        if(typeof movePosition.x === "number"){
                            if(sPosition.x > ePosition.x){
                                obj.object3D.position.z = parseFloat(parseFloat(obj.object3D.position.z) + parseFloat(parseFloat((movePosition.x / 4) / 4).toFixed(3))).toFixed(3);
                            }else{
                                obj.object3D.position.z = parseFloat(parseFloat(obj.object3D.position.z) + parseFloat(parseFloat(((movePosition.x * -1) / 4) / 4).toFixed(3))).toFixed(3);
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
                                obj.object3D.position.x = parseFloat(parseFloat(obj.object3D.position.x) + parseFloat(parseFloat(((movePosition.z * -1) / 4) / 4).toFixed(3))).toFixed(3);
                            }else{
                                obj.object3D.position.x = parseFloat(parseFloat(obj.object3D.position.x) + parseFloat(parseFloat((movePosition.z / 4) / 4).toFixed(3))).toFixed(3);
                            }
                        }
                    }

                    if(movingIndex == 15){
                        _moveCount++;
                        movingIndex = 0;
                    }else{
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
