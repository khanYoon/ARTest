//var Sequential = ["bord1_1", "bord1_2"]
var scene;
var startTimeoutId;
//var positionArr = ["bord1-1", "bord4-4", "bord4-3", "bord4-2", "bord4-1", "bord3-5", "bord3-4", "bord3-3", "bord3-2", "bord3-1", "bord2-5", "bord2-4", "bord2-3", "bord2-2", "bord2-1", "bord1-6", "bord1-5", "bord1-4", "bord1-3", "bord1-2"];
var positionArr = ["bord1-1", "bord1-2", "bord1-3", "bord1-4", "bord1-5", "bord2-1", "bord2-2", "bord2-3", "bord2-4", "bord2-5", "bord3-1", "bord3-2", "bord3-3", "bord3-4", "bord3-5", "bord4-1", "bord4-2", "bord4-3", "bord4-4", "bord4-5"];
var turnArr = ["bord1-1", "bord2-1", "bord3-1", "bord4-1"];
var testIndex = 0;
var startNo = 0;
var totalUser = 2;
var testObj;
utils = {
		/**
		 * 현재 게임중인 유저
		 */
		activeUser : function(){
			
			return 
		},
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
 			var userInfoArr = [];
			userInfoArr.push({userId:"user1", userColor:"yellow", startNo:0, positionId:"bord1-1", own:[]});
			userInfoArr.push({userId:"user2", userColor:"black", startNo:1, positionId:"bord1-1", own:[]});
			
			scene.userInfo = new Array();
			scene.ownerInfo = new Array();
			for(var i in userInfoArr){
				scene.userInfo[i] = userInfoArr[i];
			}
			
			// 건물을 지을수 있는 샘플소스
//			for(var m in positionArr){
//				scene.ownerInfo[positionArr[m]] = {userId:"user1", isHouse:false};
//				this.obj("#" + positionArr[m]).setAttribute("material", "color", "yellow");
//			}
			
			// 파산할수 있는 샘플소스
//			for(var m in positionArr){
//				scene.ownerInfo[positionArr[m]] = {userId:"user2", isHouse:false};
//				this.obj("#" + positionArr[m]).setAttribute("material", "color", "block");
//			}
			
		},
		/**
		 * 소유자 확인
		 */
		ownerCheck : function(stopUserInfo, callback){
			
			var ownerInfo = scene.ownerInfo[stopUserInfo.positionId];
			var money = Number(this.obj("#score" + stopUserInfo.userId).getAttribute("text").value);
			
			if(typeof ownerInfo === "undefined" && money > 1000){ 
				
				if(confirm("현재 소유주가 없습니다.\n$1000에 구매하시겠습니까?")){
					
					scene.ownerInfo[stopUserInfo.positionId] = {userId:stopUserInfo.userId, isHouse:false};
					this.obj("#" + stopUserInfo.positionId).setAttribute("material", "color", stopUserInfo.userColor);
					this.obj("#score" + stopUserInfo.userId).setAttribute("text", {value: money - 1000});
					alert("구매 하였습니다.");
					
				}
				
			}else{
				
				if(ownerInfo.userId == stopUserInfo.userId){
					
					if(ownerInfo.isHouse == false && money > 1000){
						
						if(confirm("하우스가 없습니다.\n하우스를 $1000에 건설하시겠습니까?")){
							var houseObj = this.obj("#" + stopUserInfo.positionId);
							houseObj.querySelector("[house]").setAttribute("visible", true);
							this.obj("#score" + stopUserInfo.userId).setAttribute("text", {value: money - 1000});
							alert("하우스를 건설 하였습니다.");
						}
					}
					
				}else{
					
					var pamentMoney = 10000 + (ownerInfo.isHouse)?10000:0;
					alert(ownerInfo.userId + "님의 소유지 입니다.\n 통행료를 지불해야 합니다.\n통행료는 $" + pamentMoney + "입니다.");
					
					var ownerMoney = Number(this.obj("#score" + stopUserInfo.userId).getAttribute("text").value);
					this.obj("#score" + ownerInfo.userId).setAttribute("text", {value: ownerMoney + pamentMoney});
					this.obj("#score" + stopUserInfo.userId).setAttribute("text", {value: 0});
					if(pamentMoney >= money){
						alert("앗~ 파산하였습니다.ㅜ.ㅜ");
					}
					
				}
				
			}
		},
		/**
		 * 소유자 등록
		 */
		setOwner : function(ownerArr){
			scene.ownerInfo[ownerArr.positionId] = {userId:ownerArr.userId, isHouse:ownerArr.isHouse};
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
		 * 좌우로 턴을 하는 위치를 체크한다.
		 * @param : 시작하는 말판의 ID
		 * @param : 도착하는 말판의 ID
		 */
		turnCheck : function(startId, endId){
			
			var startIndex = 0;
			var endIndex = 0;
			var moveArr = [];
			moveArr.push(startId);
			for(var i in positionArr){
				
				if(positionArr[i] == startId){
					startIndex = i;
				}
				if(positionArr[i] == endId){
					endIndex = i;
				}
			}
			
			// 시작위치가 도착 위치보다 작을경우(정상이동)
			if(Number(startIndex) < Number(endIndex)){
				for(var i = Number(startIndex) + 1; i < Number(endIndex) + 1; i++){
					for(var m in turnArr){
						if(positionArr[i] == turnArr[m]){
							moveArr.push(turnArr[m]);
						}
					}
				}
				
			// 시작위치가 도착 위치보다 클경우(시작점을 다시 돌아갈경우)
			}else{
				for(var i = Number(startIndex) + 1; i < Number(positionArr.length) + 1; i++){
					for(var m in turnArr){
						if(positionArr[i] == turnArr[m]){
							moveArr.push(turnArr[m]);
						}
					}
				}
				
				for(var i = 0; i < Number(endIndex) + 1; i++){
					for(var m in turnArr){
						if(positionArr[i] == turnArr[m]){
							moveArr.push(turnArr[m]);
						}
					}
				}
				
			}
			
			if(moveArr[moveArr.length - 1] != endId){
				moveArr.push(endId);
			}
			
			return moveArr;
			
		},
		/**
		 * 캐릭터 이동
		 * @param moveId : 움직이는 object ID
		 * @param startId : 시작하는 말판의 ID
		 * @param endId : 도착하는 말판의 ID
		 * @param callBack : 콜백함수
		 */
		move : function(moveId, startId, endId, callBackFn){
			
			var sPosition = this.obj("#" + startId).object3D.position;
			var ePosition = this.obj("#" + endId).object3D.position;
			
			var position = this.positionCompare(sPosition, ePosition);
			
			var moveIndex = 0.2;
			var sPositionX = sPosition.x;
			var totalMoveIndex = 0;
			
			// y 방향으로 움직일때
			if(typeof position.x === "number"){
				
				if(sPosition.x > ePosition.x){
					moveIndex = -1;
				}else{
					moveIndex = 1;
				}
				
				var interval = setInterval(function(){
					
					var obj = utils.obj("#" + moveId);
					if(parseFloat(totalMoveIndex).toFixed(2) >= position.x){
						clearInterval(interval);
						callBackFn();
					}else{
						obj.object3D.position.x += moveIndex;
					}
					
					totalMoveIndex += Math.abs(moveIndex);
					
					}, 60);
			}
			
			// z 방향으로 움직일때
			if(typeof position.z === "number"){
				
				if(sPosition.z > ePosition.z){
					moveIndex = -1;
				}else{
					moveIndex = 1;
				}
				
				var interval = setInterval(function(){
					
					var obj = utils.obj("#" + moveId);
					if(parseFloat(totalMoveIndex).toFixed(2) >= position.z){
						clearInterval(interval);
						callBackFn();
					}else{
						obj.object3D.position.z += moveIndex;
					}
					
					totalMoveIndex += Math.abs(moveIndex);
					
					}, 60);
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
			startTimeoutId = setTimeout("utils.rouletteStart()",60);
		},
		getText : function(objId){
			this.obj("#" + objId).getAttribute("text").value
		},
		/**
		 * 슬롯머신 정지
		 */
		rouletteEnd : function(){
			var moveCount = this.getText("roulette1") + this.getText("roulette2");
			if(moveCount == 0){
				alert("start 버튼을 눌러 주세요");
				return false;
			}
			utils.objView("rouletteBoard", false);
			clearTimeout(startTimeoutId);
			alert(moveCount + "칸 이동합니다.\n가즈아~~!!");
			this.luckSevenInit();
			
			var startIndex = 0;
			var startPositionId = scene.userInfo[startNo].positionId;
			
			for(var i in positionArr){
				if(positionArr[i] == startPositionId){
					startIndex = i;
				}
			}
			
			var endPositionId = positionArr[(Number(startIndex) + Number(moveCount)) % 20];
			scene.userInfo[startNo].positionId = endPositionId;
			var moveArr = this.turnCheck(startPositionId, endPositionId);
			
			// 캐릭터 이동(callback 함수는 ) 말판의 소유자가 있는지 체크한후 없으면 구매 할수 있으며 있으면 통행료를 부과, 소유자가 없을경우 말판만 구매 두번째에 건물을 올릴수 있음
			this.move("user1", moveArr[0], moveArr[1], function(){
				if(moveArr[2] != undefined){
					
					var yLotation = Number(utils.obj("#user1").getAttribute("rotation").y) -90 ;
					if(yLotation <= -360){
						yLotation = 0;
					}
					utils.obj("#user1").setAttribute("rotation", {x:0, y:yLotation, z:0})
					utils.move("user1", moveArr[1], moveArr[2], function(){
						if(moveArr[3] != undefined){
							
							var yLotation = Number(utils.obj("#user1").getAttribute("rotation").y) -90 ;
							if(yLotation <= -360){
								yLotation = 0;
							}
							utils.obj("#user1").setAttribute("rotation", {x:0, y:yLotation, z:0})
							utils.move("user1", moveArr[2], moveArr[3], function(){
								if(moveArr[4] != undefined){
									
									var yLotation = Number(utils.obj("#user1").getAttribute("rotation").y) -90 ;
									if(yLotation <= -360){
										yLotation = 0;
									}
									utils.obj("#user1").setAttribute("rotation", {x:0, y:yLotation, z:0})
									utils.move("user1", moveArr[3], moveArr[4], function(){
										
									});
								}else{
									var stopUserInfo = new Object();
									stopUserInfo.positionId = moveArr[3];
									stopUserInfo.userId = scene.userInfo[startNo].userId;
									stopUserInfo.userColor = scene.userInfo[startNo].userColor;
									utils.ownerCheck(stopUserInfo);
									utils.obj("#rouletteBoard").setAttribute("visible", true);
								}
							});
						}else{
							var stopUserInfo = new Object();
							stopUserInfo.positionId = moveArr[2];
							stopUserInfo.userId = scene.userInfo[startNo].userId;
							stopUserInfo.userColor = scene.userInfo[startNo].userColor;
							utils.ownerCheck(stopUserInfo);
							utils.obj("#rouletteBoard").setAttribute("visible", true);
						}
						
					});
				}else{
					var stopUserInfo = new Object();
					stopUserInfo.positionId = moveArr[1];
					stopUserInfo.userId = scene.userInfo[startNo].userId;
					stopUserInfo.userColor = scene.userInfo[startNo].userColor;
					utils.ownerCheck(stopUserInfo);
					utils.obj("#rouletteBoard").setAttribute("visible", true);
				}
			});
			
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
				
				confirmObj.querySelector("a-gui-label").object3D.visible = isView;
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
		}
		
}