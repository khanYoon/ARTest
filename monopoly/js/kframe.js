var Debug = {log : function(msg) {console.log(msg);}};
var Color = {
		red : new THREE.Color("red"),
		yellow : new THREE.Color("yellow")
}
var Time = {deltaTime : null};
var WaitForSeconds = function(second) {
	this.second = second * 1000;
};
var KVECTOR3 = {
	back 	: new THREE.Vector3( 0,  0, -1),
	down 	: new THREE.Vector3( 0, -1,  0),
	forward : new THREE.Vector3( 0,  0,  1),
	left 	: new THREE.Vector3(-1,  0,  0),
	one 	: new THREE.Vector3( 1,  1,  1),
	right 	: new THREE.Vector3( 1,  0,  0),
	up 		: new THREE.Vector3( 0,  1,  0),
	zero 	: new THREE.Vector3( 0,  0,  0)
};
var KEntity = {
	find : function(name) {
		return document.getElementById(name);
	}	
};

/**
 * 키코드 상수
 */
var KeyCode = {
	Space : 32,			//스페이스키
	UpArrow : 38, 		//위쪽 화살표키
	DownArrow : 40,		//아래쪽 화살표키
	LeftArrow : 37,		//왼쪽 화살표키
	RightArrow : 39		//오른쪽 화살표키
};
/**
 * 키다운 이벤트리스너 등록
 */
document.addEventListener('keydown', function(evt) {	
	Input.keydown(evt.keyCode);	//입력받은 키코드를 DOWN 상태로 저장
});
/**
 * 키업 이벤트리스너 등록
 */
document.addEventListener('keyup', function(evt) {
	Input.keyup(evt.keyCode);	//입력받은 키코드를 UP 상태로 저장
});

/**
 * Input 전역변수 
 */
var Input = {
	/**
	 * 입력의 상태를 저장하는 변수
	 */
	inputs : {},
	/**
	 * 입력받은 키코드를 DOWN 상태로 저장한다.
	 * @param keyCode 입력코드
	 */
	keydown : function(keyCode) {
		if (!this.getKey(keyCode)) {
			this.inputs[keyCode] = "D";
		}
	},
	/**
	 * 입력받은 키코드를 UP 상태로 저장한다.
	 * @param keyCode 입력코드
	 */
	keyup : function(keyCode) {	
		this.inputs[keyCode] = "U";
	},
	/**
	 * 해당 keyCode가 현재 PRESS 상태인지 여부를 반환한다.
	 * @param keyCode 입력코드
	 * @return boolean
	 */
	getKey : function(keyCode) {
		return this.inputs[keyCode] != undefined && this.inputs[keyCode] == "P";
	},
	/**
	 * 해당 keyCode가 현재 UP 상태인지 여부를 반환한다.
	 * @param keyCode 입력코드
	 * @return boolean
	 */
	getKeyUp : function(keyCode) {
		return this.inputs[keyCode] != undefined && this.inputs[keyCode] == "U";
	},
	/**
	 * 해당 keyCode가 현재 DOWN 상태인지 여부를 반환한다.
	 * @param keyCode 입력코드
	 * @return boolean
	 */
	getKeyDown : function(keyCode) {
		return this.inputs[keyCode] != undefined && this.inputs[keyCode] == "D";
	},
	/**
	 * 키 상태를 갱신한다.(1프레임이 지난후 이 함수가 호출)
	 * DOWN 상태는 PRESS상태로 갱신
	 * UP 상태는 NONE상태로 갱신
	 */
	next : function() {
		for (var key in this.inputs) {
			if (this.inputs[key] == "D") {
				this.inputs[key] = "P";
			} else if (this.inputs[key] == "U") {
				this.inputs[key] = "";
			}
		}
	}
};

var routine_id = 0;
var KFRAME = {
	registerComponent : function(name, component) {
		
		component.setEnabled = function(enabled) {
			if (!enabled) {
				this.el.pause();
			} else {
				this.el.play();
			}
		};
		
		component.isEnabled = function() {
			return this.el.isPlaying;
		};
	
		component.startCoroutine = function(iterator) {
			var rid = "r_" + (routine_id++);
			var routine = {id: rid, it:iterator};
			this.routines[rid] = routine;
			return routine;
		};
		
		component.stopAllCoroutines = function() {
			this.routines = {};
		};

		component.stopCoroutine = function(iterator) {
			delete this.routines[iterator.id];
		};
		
		component.toString = function() {
			return this.getName();
		};
		
		component.print = function(msg) {
			return console.log(msg);
		};
		
		component.setAnimationClip = function(clip) {
  			var el = this.el;
			var ani = el.getAttribute("animation-mixer");
			if (ani.clip != clip) {
				ani.clip = clip;
				el.setAttribute('animation-mixer', ani);
			}
  		},
  		
  		component.setAnimationDuration = function(duration) {
  			/* this.stopAction();

  		    if (this.data.clip) {
  		      this.playAction();
  		    }*/
			this.getComponent("animation-mixer").data.duration = duration;
			
  		},
  		
  		

		
		component.init = function () {
			
			this.el.addEventListener('collisions', (evt) => {
				if (this.onTriggerEnter) {
					for (var i = 0; i < evt.detail.els.length; i++) {
						if (evt.detail.els[i].components["body"]) {
							this.onTriggerEnter(evt.detail.els[i].components["body"]);
						}
					}
				}
				if (this.onTriggerExit) {
					for (var i = 0; i < evt.detail.clearedEls.length; i++) {
						if (evt.detail.clearedEls[i].components["body"]) {
							this.onTriggerExit(evt.detail.clearedEls[i].components["body"]);
						}
					}
				}
			});
			
			
			
			
			
			
			/*if (this.onCollisionEnter) {
				this.el.addEventListener('collide', (evt) => {
					this.onTriggerEnter(evt.detail.);
				});
			}*/
			if (this.onCollisionExit) 	this.el.addEventListener('hitend', 		this.onCollisionExit.bind(this));
			if (this.onMouseDown) 		this.el.addEventListener('mousedown', 	this.onMouseDown.bind(this));
			if (this.onMouseEnter) 		this.el.addEventListener('mouseenter', 	this.onMouseEnter.bind(this));
			if (this.onMouseExit) 		this.el.addEventListener('mouseleave', 	this.onMouseExit.bind(this));
			if (this.onMouseUp) 		this.el.addEventListener('mouseup', 	this.onMouseUp.bind(this));
			
		      	
			this.routines = {};
			if (this.onInit) this.onInit();
			if (this.onAwake) this.onAwake();
			if (this.onStart) this.onStart();
						
		};

		component.tick = function(time, deltaTime) {
			Time.deltaTime = deltaTime / 1000.0;
			var removes = new Array();
			for (var key in this.routines) {
				var runable = true;
				if (this.routines[key].second) {
					this.routines[key].second -= deltaTime;
					if (this.routines[key].second >= 0) {
						runable = false;
					}
				}
				if (runable) {
					var result = this.routines[key].it.next();
					if (result.done) {
						removes.push(this.routines[key]);
					} else {
						if (result.value != null) {
							this.routines[key].second = result.value.second;
						} else {
							this.routines[key].second = null;
						}
					}
				}
			}
			for (var i = 0; i < removes.length; i++) {
				this.stopCoroutine(removes[i]);
			}
			
			if (this.onUpdate) this.onUpdate(Time.deltaTime);
			Input.next();
		};
		AFRAME.registerComponent(name, component);
	}
};


/**/

var SteamVR_Controller = {
		controllers : [],
		input : function(index){
			if (index == null) return null;
			if (!this.controllers[index]) {
				this.controllers[index] = {
						inputs : {},
						setPressDown : function(button) {
							this.inputs[button] = "D1";
						},
						setPressUp : function(button) {
							this.inputs[button] = "U1";
						},
						getHairTriggerDown : function() {
							return this.getPressDown("trigger");
						},
						getHairTriggerUp : function() {
							return this.getPressUp("trigger");
						},
						getPress : function(button) {
							return this.inputs[button] != undefined && this.inputs[button] == "P";
						},
						getPressDown : function(button) {
							return this.inputs[button] != undefined && this.inputs[button] == "D";
						},
						getPressUp : function(button) {
							return this.inputs[button] != undefined && this.inputs[button] == "U";
						},
						getVelocity : function() {
							return this.velocity;
						},
						getAngularVelocity : function() {
							return this.angularVelocity;
						},
						next : function() {
							for (var key in this.inputs) {
								if (this.inputs[key] == "D1") {
									this.inputs[key] = "D";
								} else if (this.inputs[key] == "U1") {
									this.inputs[key] = "U";
								} else if (this.inputs[key] == "D") {
									this.inputs[key] = "P";
								} else if (this.inputs[key] == "U") {
									this.inputs[key] = "";
								}
							}
						}
					};
					
			}
			return this.controllers[index];
		},
		set : function(index, obj) {
			this.controllers[index] = obj;
		}
}

KFRAME.registerComponent('kframe-vive-controls', {
	//dependencies: ['tracked-controls'],
	schema: {
		    hand: {default: 'right'}
	},
	awake : function () {
		console.log(this.data.hand);
		this.el.setAttribute('vive-controls', {hand: this.data.hand});
		this.el.setAttribute('tracked-controls', {
		      idPrefix: 'OpenVR ',
		      controller: this.data.hand === 'right' ? 0 : this.data.hand === 'left' ? 1 : 2,
		      rotationOffset: 0.0
		});
		
		this.trackedObj = this.el.components["tracked-controls"];
	    var el = this.el;
	    
	    el.addEventListener('triggerdown', function(evt) {
	    	var controller = SteamVR_Controller.input(parseInt(this.trackedObj.controller.index));
	    	controller.setPressDown("trigger");
	    }.bind(this));
	    
	    el.addEventListener('triggerup', function(evt) {

	    	var controller = SteamVR_Controller.input(parseInt(this.trackedObj.controller.index));
	    	controller.setPressUp("trigger");
	    }.bind(this));	    
	},
	tickupdate : function() {
		
		
    	if (this.trackedObj && this.trackedObj.controller) {
	    	var controller = SteamVR_Controller.input(parseInt(this.trackedObj.controller.index));
	    	
	    	controller.velocity = new CANNON.Vec3(this.trackedObj.controller.pose.linearVelocity[0], this.trackedObj.controller.pose.linearVelocity[1], this.trackedObj.controller.pose.linearVelocity[2]); 
	    	controller.angularVelocity = new CANNON.Vec3(this.trackedObj.controller.pose.angularVelocity[0], this.trackedObj.controller.pose.angularVelocity[1], this.trackedObj.controller.pose.angularVelocity[2]);
	    	controller.next();
    	}
	}
});


document.addEventListener("DOMContentLoaded", function(event) {
	AFRAME.scenes[0].addEventListener("loaded", function(event) {
		setTimeout(function(){ AFRAME.scenes[0].components["inspector"].injectInspector(); }, 1000);
	});
});
var KEvent = {
		emit : function(name, obj) {
			document.querySelector('a-scene').emit(name, obj);
		},
		addEventListener : function(name, f) {
			document.querySelector('a-scene').addEventListener(name, f);
		}
		
};

var Vector3 = THREE.Vector3;
Vector3.back 	= new THREE.Vector3( 0,  0, -1);
Vector3.down 	= new THREE.Vector3( 0, -1,  0);
Vector3.forward = new THREE.Vector3( 0,  0,  1);
Vector3.left 	= new THREE.Vector3(-1,  0,  0);
Vector3.one 	= new THREE.Vector3( 1,  1,  1);
Vector3.right 	= new THREE.Vector3( 1,  0,  0);
Vector3.up 		= new THREE.Vector3( 0,  1,  0);
Vector3.zero 	= new THREE.Vector3( 0,  0,  0);

/*Vector3.prototype.multiplyByScalar = function(scalar) {
		var directionVector = new THREE.Vector3(0, 0, 0);
		directionVector.copy(this);
		directionVector.multiplyScalar(scalar);
		return directionVector;
};*/
