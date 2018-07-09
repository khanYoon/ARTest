Kdom = function(componentId){

	this.gameComponent = function(objectId){

		let gameComponent = document.querySelector(objectId);

		return gameComponent;
	}

	this.gameComponentAll = function(objectId){

		let gameComponentAll = document.querySelectorAll(objectId);

		return gameComponentAll;
	}

	// this.gameObject = function(objectId){

	// 	let gameObject = document.querySelector("#" + objectId);

	// 	return gameObject;
	// }

	// this.gameComponentList = function(objectId){

	// 	let gameObjectList = [];

	// 	// try{

	// 	// 	gameObjectList = document.querySelectorAll(objectId);

	// 	// 	if(gameObjectList.length == 0){
	// 	// 		console.error(objectId " : [gameObject No List Data]");
	// 	// 	}

	// 	// }catch(ex){
	// 	// 	console.log(ex);
	// 	// }

	// 	return gameObjectList;
	// }

	/**
	 * element 추가
	 **/
	this.add = function(name, value){

		let gameComponent = document.querySelector(componentId);

		let createEl = document.createElement("a-entity");
		createEl.setAttribute(name, value);
		gameComponent.appendChild(createEl);

	}

	/**
	 * element 추가
	 **/
	this.addAll = function(object){
		
		let gameComponent = document.querySelector(componentId);

		// for(var i=0; i < object.length; i++){

		// }

		// let createEl = document.createElement("a-entity");
		// createEl.setAttribute(name, value);
		// gameComponent.appendChild(createEl);
		
	}

}

GameInfo = function(){

	this.init = function(componentId){

		let kdom = new Kdom(componentId);
		let getData = kdom.gameComponent(objectId);

	}

	/**
	 * 데이터 객체를 취득
	 **/
	this.getData = function(objectId){

		let kdom = new Kdom();
		let getData = kdom.gameComponent(objectId);

		return getData;

	}

	/**
	 * 데이터 리스트를 취득
	 **/
	// new Function(callBackObj.fn)();
	this.getDataList = function(objectId){

		let kdom = new Kdom();

		let getDataList = kdom.gameComponentAll(objectId);

		return getDataList;

	}

}