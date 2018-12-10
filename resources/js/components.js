KFRAME.registerComponent('broadcast', {
    onStart: function () {
        KEvent.addEventListener('broadcast', function (event) {
            var eventName = event.detail.eventName;
            var targetId = event.detail.targetId;
            // KEvent.call(eventName);
           // console.log('listener 호출 : ' + eventName);
            KEvent.componentCall(eventName, targetId);
        });

    }
});

KFRAME.registerComponent('max-button', {
    // 마우스이벤트는 컴포넌트로 정의한다.
    schema: {
        panelSize: {default: {width: 0.3, height: 0.1, depth: 0.005}},
        content: {default: ''}, // 버튼에 넣어줄 텍스트 값
        contentColor: {type: 'color', default: 'black'},// 텍스트 색상 값
        contentSize: {default: 1.0},// 텍스트 크기
        transparent: {default: false},// 투명여부
        opacity: {default: 1},// 투명 세기
        boxColor: {type: 'color', default: 'white'}
    },
    onInit: function () {
        maxUtils.createOrUpdateButton(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.boxColor);
    },
    update: function () {
        maxUtils.createOrUpdateButton(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.boxColor);
    }
    , onMouseDown: function () {
        console.log('클릭');
    }
});

KFRAME.registerComponent('max-alert', {
    schema: {
        panelSize: {default: {width: 0.6, height: 0.3, depth: 0.005}},
        content: {default: ''}, // alert 창에 들어갈 text
        contentColor: {type: 'color', default: 'black'},// alert 창 텍스트 색상
        contentSize: {default: 1.0},// 텍스트 크기
        transparent: {default: false},// 투명여부
        opacity: {default: 1},// 투명 세기
        color: {type: 'color', default: 'white'},// 패널 색상
        buttonText: {default: '확인'} // 버튼 text 값
    },
    onInit: function () {
        var data = maxUtils.createOrUpdateAlert(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.color, this.data.buttonText);
        this.el.appendChild(data[0]);
        this.el.appendChild(data[1]);
    },
    update: function () {
        maxUtils.createOrUpdateAlert(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.color, this.data.buttonText);
    }
});

KFRAME.registerComponent('max-confirm', {
    schema: {
        panelSize: {default: {width: 0.6, height: 0.3, depth: 0.005}},
        content: {default: ''}, // alert 창에 들어갈 text
        contentColor: {type: 'color', default: 'black'},// alert 창 텍스트 색상
        contentSize: {default: 1.0},// 텍스트 크기
        transparent: {default: false},// 투명여부
        opacity: {default: 1},// 투명 세기
        color: {type: 'color', default: 'white'},// 패널 색상
        button1Text: {default: 'YES'}, // 버튼 text 값
        button2Text: {default: 'NO'} // 버튼 text 값
    },
    onInit: function () {
        var data = maxUtils.createOrUpdateConfirm(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.color, this.data.button1Text, this.data.button2Text);
        this.el.appendChild(data[0]);
        this.el.appendChild(data[1]);
        this.el.appendChild(data[2]);
    },
    update: function () {
        maxUtils.createOrUpdateConfirm(this.el, this.data.panelSize, this.data.content, this.data.contentColor, this.data.contentSize, this.data.transparent, this.data.opacity, this.data.color, this.data.button1Text, this.data.button2Text);
    },
});


KFRAME.registerComponent('sensitive', {
    schema: {
        targetId: {default: ''},
        enterEventName: {default: ''},
        exitEventName: {default: ''}
    }
    , onUpdate: function (deltaTime) {
        var radius = maxUtils.getProperty(this.el.id, 'geometry', 'radius', this.el, "");
        var result = maxUtils.sensitive(this.el.id, radius, this.data.targetId);
        if (result) {
            var enterEventName = this.data.enterEventName;
            if (null != enterEventName && enterEventName != undefined) {
                // console.log("호출됨");
                KEvent.broadcast(enterEventName);
            }
        } else {
            var exitEventName = this.data.exitEventName;
            if (null != exitEventName && exitEventName != undefined) {

                KEvent.broadcast(exitEventName);
            }
        }
    }
});


KFRAME.registerComponent('look-at', {
    schema: {
        targetId: {default: ''},
        heading: {default: 1}
    }
    , onUpdate: function () {
        maxUtils.lookAt(this.el.id, this.data.targetId, this.data.heading);
    }
});

KFRAME.registerComponent('synchro-rotation', {
    schema: {
        targetId: {default: ''}
    }
    , onAwake: function () {
        var rotation = this.el.getAttribute("rotation");
        var yAxis = rotation.y;
        this.correction = yAxis; // 초기 rotation 이 따라갈 object 의 방향과 맞는 방향이라고
        // 가정하여 보정한다.
        // console.log("correction : " + this.correction);
    }
    , onUpdate: function () {
        maxUtils.synchroRotation(this.el.id, this.data.targetId, this.correction);
    }
})


KFRAME.registerComponent('location-point', {
    schema: {default: ''}
    , onMouseDown: function () {
        // console.log("id : " + this.el.id);
        var entities = document.querySelectorAll('a-entity[location-move]');

        var main = null;
        entities.forEach(function (value, index, array1) {
            if (value.getAttribute('location-move').active) {
                main = value;
                // console.log("main : " + main.id);
            }
        });

        if (!(main === null)) {
            maxUtils.setProperty(main.id, 'location-move', 'active', true, this.el, "");
            maxUtils.setProperty(main.id, 'location-move', 'targetId', this.el.id, this.el, "");
            maxUtils.setProperty(main.id, 'location-move', 'isTick', true, this.el, "");
        }
    }
});

// 수정
KFRAME.registerComponent('location-move', {
    schema: {
        speed: {default: 1},
        targetId: {default: ''}, // 이동할 대상
        isTick: {default: true}// active
    },
    onAwake: function () {
        this.heading = maxUtils.getWorldPosition(this.el).y;
        this.startPosition = maxUtils.getWorldPosition(this.el);
    },
    play: function () {
        this.data.isTick = true;
        this.startPosition = maxUtils.getWorldPosition(this.el);
    }
    , pause: function () {
        this.data.isTick = false;
    }
    , onUpdate: function (deltaTime) {
        // console.log("id : " + this.el.id + " / active : " +
        // this.data.active);

        if (this.data.isTick) {
            if (this.el.hasAttribute('animation-mixer')) {
                this.el.setAttribute('animation-mixer', 'clip', 'animation_0');
            }
            // event.detail.target -> 에러난다.
            // target 못찾음
            // console.log("targetId : " + this.data.targetId);
            var target = maxUtils.findObject(this.data.targetId, "", "");
            // var target = document.querySelector("#"+ this.data.targetId);
            // console.log("target : " + target);
            var endPosition = maxUtils.getWorldPosition(target);
            maxUtils.locationMove(this.el, this.startPosition, endPosition, this.heading, this.data.speed, deltaTime);
        } else {
            this.el.removeAttribute('location-move');
            // this.heading = maxUtils.getWorldPosition(this.el).y;
            // this.startPosition = maxUtils.getWorldPosition(this.el);
        }
    }
});


// 수정
KFRAME.registerComponent('camera-change', {
    schema: {
        speed: {default: 1},
        targetId: {default: ''}, // 이동할 대상
        isTick: {default: false}// active
    },
    onAwake: function () {
        this.startPosition = maxUtils.getWorldPosition(this.el);
    },
    play: function () {
        this.data.isTick = true;
        this.startPosition = maxUtils.getWorldPosition(this.el);
    }
    , pause: function () {
        this.data.isTick = false;
    }
    , onUpdate: function (deltaTime) {
        // console.log("id : " + this.el.id + " / active : " +
        // this.data.active);

        if (this.data.isTick) {
            var target = maxUtils.findObject(this.data.targetId, "", "");
            maxUtils.cameraChange(this.el, this.startPosition, target, this.data.speed, deltaTime);
        }
    }
});

// 20181008 추가
KFRAME.registerComponent('text-animation', {
    schema: {
        time: {default: 0},
        timer: {default: 0},
        originalSize: {default: 20},
        textSize: {default: ''}
    }
    , onUpdate: function (deltaTime) {
        if (this.data.time < this.data.timer) {
            this.el.setAttribute("text", "width", this.data.originalSize);
            this.el.setAttribute("visible", false);
            this.el.removeAttribute("text-animation");
        } else {
            var width = this.el.getAttribute("text").width;
            var result = width + this.data.textSize;
            this.el.setAttribute("text", "width", result);
            var time = this.data.timer + deltaTime;
            this.data.timer = time;
        }
    }

});
//
// KFRAME.registerComponent('mxt-transform-cp', {
//     schema: {
//         objectName : {default : ""}
//         // , direction : {type : "vec3"} // z: forward const
//         , start : {type : "vec3"}
//         , end :  {type : "vec3"}
//         , sec : {default : 0.0}
//         , scale : {type : "vec3"}
//         , rotation : {type : "vec3"}
//         , alpha : {default : -1.0}
//         , color : {type : "color"}
//         , isSync : {default : true}
//         , listenerName : {type:"string"}
//         , isPosition : {default:true}
//         , isRotation : {default:true}
//         , isScale : {default:true}
//     }
//     , endCall : 0
//     , onInit : function() {
//         console.log("user position:::::::::::::::::::", this.el.getAttribute("position"), "::::::::::::: this.data.start::::", this.data.start);
//         let data = this.data;
//         let self = this;
//         this.el.addEventListener("animationend", function() {
//             if(self.endCall == 0) {
//                 console.log("-- complete animation --");
//                 self.endCall ++;
//
//                 if (data.listenerName) {
//                     var ids = data.listenerName.split("|");
//                     if(ids != null && ids != undefined && ids.length != undefined) {
//                         console.log("transform sync callback");
//                         // var myNode = self.el;
//                         // while (myNode.firstChild) {
//                         //     myNode.removeChild(myNode.firstChild);
//                         // }
//                         self.el.removeEventListener("animationend", function() {});
//                         self.el.removeAttribute('mxt-transform-cp');
//                         console.log("user position:::::::::::::::::::", self.el.getAttribute("position"));
//                         document.querySelector("#" + ids[0]).emit(ids[1], {target: data.listenerName});
//                     }
//                 }
//             }
//         });
//     }
//     , onStart : function() {
//         this.el.setAttribute("visible", "true");
//         // console.log("this.data.start :::::::::::::::::::", this.data.start, "::::::::::::: this.data.end::::", this.data.end, ":::::::: this.data.rotation :::::::", this.data.rotation, "::::::::::::::this.data.scale ::::::::::::::", this.data.scale);
//         // console.log("user position:::::::::::::::::::", this.el.getAttribute("position"), "::::::::::::: this.data.start::::", this.data.start);
//         console.log("isPosition:::::::::", this.data.isPosition, ":::::::::::: isRotation :::::::::::::", this.data.isRotation, "::::::::::::::::: isScale ::::::::::::::::::", this.data.isScale);
//
//         let dur = this.data.sec * 1000;
//         let x = 0;
//
//         var txt = "";
//         if(this.data.isPosition) {
//             if (!(this.data.end === this.el.getAttribute("position"))) {
//                 let start = this.el.getAttribute("position");
//                 txt += '<a-animation attribute="position" from="' + start.x + ' ' + start.y + ' ' + start.z + '" to="' + this.data.end.x + ' ' + (this.data.end.y + 100) + ' ' + this.data.end.z + '" dur="' + dur + '"></a-animation>';
//             }
//         }
//
//         if(this.data.isScale) {
//             if (!(this.data.scale === this.el.getAttribute("scale"))) {
//                 let scale = this.el.getAttribute("scale");
//                 txt += '<a-animation attribute="scale" from="' + scale.x + ' ' + scale.y + ' ' + scale.z + '" to="' + this.data.scale.x + ' ' + this.data.scale.y + ' ' + this.data.scale.z + '" dur="' + dur + '"></a-animation>';
//             }
//         }
//
//         if(this.data.isRotation) {
//             console.log("this.data.rotation::::::", this.data.rotation, "this.el.getAttribute(\"rotation\")::::::::::", this.el.getAttribute("rotation"));
//             if (!(this.data.rotation === this.el.getAttribute("rotation"))) {
//                 let rotation = this.el.getAttribute("rotation")
//                 // txt += '<a-animation attribute="rotation" direction="reverse" from="' + rotation.x + ' ' + rotation.y + ' ' + rotation.z + '" to="' + this.data.rotation.x + ' ' + this.data.rotation.y + ' ' + this.data.rotation.z + '" dur="' + dur + '"></a-animation>';
//                 txt += '<a-animation attribute="rotation" direction="reverse" from="' + rotation.x + ' ' + rotation.y + ' ' + rotation.z + '" to="' + (rotation.x + this.data.rotation.x) + ' ' + (rotation.y + this.data.rotation.y) + ' ' + (rotation.z + this.data.rotation.z) + '" dur="' + dur + '"></a-animation>';
//             }
//         }
//
//         try {
//             let material = this.el.getAttribute("material");
//             if(null != material.color) {
//                 let color = this.el.getAttribute("material").color;
//                 console.log("current : ", color, "to : ", this.data.color);
//                 if (!(color === this.data.color)) {
//                     txt += '<a-animation attribute="material.color" from="' + color + '" to="' + this.data.color + '" dur="' + dur + '"></a-animation>';
//                 }
//             }
//         } catch(e) { }
//
//         // if(this.data.alpha != 1) {
//         //     let opacity = this.el.getAttribute("material").opacity;
//         //     console.log("opacity:::::", opacity);
//         //     txt += '<a-animation attribute="material.opacity" begin="' + opacity + '" to="' + this.data.alpha + '" dur="' + dur + '"></a-animation>';
//         //     txt += '<a-animation attribute="material.opacity" begin="fade" to="' + this.data.alpha + '" dur="' + dur + '"></a-animation>';
//         //     txt += '<a-animation attribute="material.opacity" begin="fade" to="0"  dur="' + dur + '"></a-animation>';
//         // }
//         this.el.innerHTML = txt;
//     }
// });


KFRAME.registerComponent('mxt-transform-cp', {
    schema: {
        objectName: {default: ""}
        , direction: {type: "vec3"} // z: forward const
        , start: {type: "vec3"}
        , end: {type: "vec3"}
        , sec: {default: 0.0}
        , scale: {type: "vec3"}
        , rotation: {type: "vec3"}
        , alpha: {default: -1.0}
        , color: {type: "color"}
        , isSync: {default: true}
        , listenerName: {type: "string"}
        , isPosition: {default: true}
        , isRotation: {default: true}
        , isScale: {default: true}
        , isColor: {default: true}
    }
    // , id : null
    // , listenerName : null
    // , isPlay : 0

    , scalePerSecX: 0.0 //new THREE.Vector3()
    , scalePerSecY: 0.0 //new THREE.Vector3()
    , scalePerSecZ: 0.0 //new THREE.Vector3()
    , rotationPerSecX: 0.0//new THREE.Vector3()
    , rotationPerSecY: 0.0//new THREE.Vector3()
    , rotationPerSecZ: 0.0//new THREE.Vector3()
    , positionPerSecX: 0.0//new THREE.Vector3()
    , positionPerSecY: 0.0//new THREE.Vector3()
    , positionPerSecZ: 0.0//new THREE.Vector3()
    , acceleration: 0.0
    , runningTime: 0.0
    , distance: 0.0
    , alphaPerSec: 0.0
    , colorPerSecR: 0.0
    , colorPerSecG: 0.0
    , colorPerSecB: 0.0
    , enableScale: true

    , onStart: function () {
        //컬러연산 안되고,회전, 크기는 왜?
        var position = this.el.getAttribute("position");
        this.data.start = {x: position.x, y: position.y, z: position.z};
        console.log("position x : " + position.x + " / position y : " + position.y + " / position z : " + position.z);
        this.onPrepare();
    }
    , onPrepare: function () {
        // console.log("start:::::::::::::::::", this.data.start, " ::::: end ::::::::::::", this.data.end);
        this.el.setAttribute("visible", "true");


        this.el.setAttribute("position", this.data.start);
        //var position = this.el.getAttribute("position");
        //this.data.start = position;
        //주어진 시간동안 변경되어야하는 크기 값
        var sc = this.el.getAttribute("scale");
        if (!(this.data.scale.x === sc.x)) {
            this.scalePerSecX = (this.data.scale.x - sc.x) / this.data.sec;
        }
        if (!(this.data.scale.y === sc.y)) {
            this.scalePerSecY = (this.data.scale.y - sc.y) / this.data.sec;
        }
        if (!(this.data.scale.z === sc.z)) {
            this.scalePerSecZ = (this.data.scale.z - sc.z) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 회전 값
        var rt = this.el.getAttribute("rotation");
        if (!(this.data.rotation.x === rt.x)) {
            this.rotationPerSecX = (this.data.rotation.x - rt.x) / this.data.sec;
        }
        if (!(this.data.rotation.y === rt.y)) {
            this.rotationPerSecY = (this.data.rotation.y - rt.y) / this.data.sec;
        }
        if (!(this.data.rotation.z === rt.z)) {
            this.rotationPerSecZ = (this.data.rotation.z - rt.z) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 거리 값
        var startVec = new THREE.Vector3(this.data.start.x, this.data.start.y, this.data.start.z);
        var endVec = new THREE.Vector3(this.data.end.x, this.data.end.y, this.data.end.z);
        console.log("" + this.data.start.x + " / " + this.data.start.y + " / " + this.data.start.z);
        console.log("" + this.data.end.x + " / " + this.data.end.y + " / " + this.data.end.z);
        this.distance = startVec.distanceTo(endVec);

        if (!(this.data.start.x === this.data.end.x)) {
            this.positionPerSecX = (this.data.end.x - this.data.start.x);
        }
        if (!(this.data.start.y === this.data.end.y)) {
            this.positionPerSecY = (this.data.end.y - this.data.start.y);
        }
        if (!(this.data.start.z === this.data.end.z)) {
            this.positionPerSecZ = (this.data.end.z - this.data.start.z);
        }

        // 주어진 시간동안 이동해야하는 속력 및 가속도
        this.velocity = 2 * this.distance / this.data.sec;
        this.acceleration = this.velocity / this.data.sec;

        console.log("velocity : " + this.velocity);
        console.log("acceleration : " + this.acceleration);

        // 주어진 시간동안 변경되어야하는 투명 값
        if (this.el.hasAttribute('material')) {
            var ap = this.el.getAttribute("material").opacity;
            this.alphaPerSec = (this.data.alpha - ap) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 색상 값
        //this.el.setAttribute("material", "color", 'rgb(10, 30, 20)');
        //색상 기본값 설정
        var rgb1;
        if (this.data.color != null) {
            rgb1 = maxUtils.hex2rgb(this.data.color);
            console.log("this color :" + this.data.color);
        } else {
            rgb1 = maxUtils.hex2rgb("#FFFFFF");
        }
        var cl1 = new THREE.Color(rgb1[0], rgb1[1], rgb1[2]);
        // console.log("색상 : " + cl1);
        var color;

        if (this.el.hasAttribute('material')) {
            color = this.el.getAttribute("material", "color").color;
        } else if (this.el.hasAttribute('light')) {
            color = this.el.getAttribute("light", "color").color;
        } else {
            color = "#FFFFFF";
        }

        var rgb2 = maxUtils.hex2rgb(color);
        //console.log("rgb2 : " + rgb2[0] + "rgb2 : " + rgb2[1] + "rgb2 : " + rgb2[2]);


        //console.log("rgb2:::::::::::::", rgb2);
        if (null != rgb2 && rgb2 != undefined) {
            var cl2 = new THREE.Color(rgb2[0], rgb2[1], rgb2[2]);
            // color 방어로직
            if (!(rgb1[0] === rgb2[0])) {
                this.colorPerSecR = (cl1.r * 255 - (cl2.r * 255)) / this.data.sec;
            }
            if (!(rgb2[1] === rgb2[1])) {
                this.colorPerSecG = (cl1.g * 255 - (cl2.g * 255)) / this.data.sec;
            }
            if (!(rgb2[2] === rgb2[2])) {
                this.colorPerSecB = (cl1.b * 255 - (cl2.b * 255)) / this.data.sec;
            }
        }

        console.log("colorPerSecR : " + this.colorPerSecR + " / " + this.colorPerSecG + " / " + this.colorPerSecB);
    }

    , onUpdate: function (deltaTime) {

        // if(this.isPlay == 1) {
        if (this.runningTime < this.data.sec) {
            var fps = new THREE.Vector3(this.scalePerSecX, this.scalePerSecY, this.scalePerSecZ);//this.scalePerSec.multiplyScalar(deltaTime);
            //방어로직  rotationPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.scalePerSecX === 0 && this.scalePerSecY === 0 && this.scalePerSecZ === 0)) {
                fps.multiplyScalar(deltaTime);
            }

            var fpr = new THREE.Vector3(this.rotationPerSecX, this.rotationPerSecY, this.rotationPerSecZ);//this.scalePerSec.multiplyScalar(deltaTime);
            //방어로직  rotationPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.rotationPerSecX === 0 && this.rotationPerSecY === 0 && this.rotationPerSecZ === 0)) {
                fpr.multiplyScalar(deltaTime);
            }

            var dt = new THREE.Vector3(this.positionPerSecX, this.positionPerSecY, this.positionPerSecZ);

            var fpd = this.acceleration * this.runningTime * this.runningTime * 0.5 / this.distance;

            //방어로직  positionPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.positionPerSecX === 0 && this.positionPerSecY === 0 && this.positionPerSecZ === 0)) {
                ///console.log("여기탄다.");
                dt.multiplyScalar(fpd);
            }

            var fpa = this.alphaPerSec * deltaTime;
            //material 회피
            if (this.el.hasAttribute('material')) {
                var opacity = this.el.getAttribute("material").opacity;
                this.el.setAttribute("material", "opacity", opacity + fpa);
            }

            //color 회피
            if ((this.el.hasAttribute('material') || this.el.hasAttribute('light'))) {
                var fpc = new THREE.Color(this.colorPerSecR, this.colorPerSecG, this.colorPerSecB);
                if (!(this.colorPerSecR === 0 && this.colorPerSecG === 0 && this.colorPerSecB === 0)) {
                    fpc.multiplyScalar(deltaTime);
                }

                if (this.data.isColor) {
                    objectColor(this.el, fpc);
                }
            }

            if (this.data.isScale) {
                objectScale(this.el, fps);
            }

            if (this.data.isRotation) {
                objectRotate(this.el, fpr);
            }

            if (this.data.isPosition) {
                objectEquivalent(this.el, this.data.start, dt);
            }
            // console.log("user position:::::::::::::::::::", this.el.getAttribute("position"));

            this.runningTime += deltaTime
        } else {
            //this.el.parentNode.removeChild(this.el);
            // this.isPlay = 2;
            console.log("------- transform end ------------ ");
            // if(this.data.isSync) {

            if (this.data.listenerName) {
                var ids = this.data.listenerName.split("|");
                console.log("transform sync callback");
                //2018-11-11
                //this.el.setAttribute("position",{x: this.data.end.x,y: this.data.end.y,z: this.data.end.z});
                //this.el.setAttribute("scale",{x: this.data.scale.x,y: this.data.scale.y,z: this.data.scale.z});
                //this.el.setAttribute("rotation",{x: this.data.rotation.x,y: this.data.rotation.y,z: this.data.rotation.z});
                //보정값.
                this.el.removeAttribute('mxt-transform-cp');
                // console.log("user position:::::::::::::::::::", this.el.getAttribute("position"));
                document.querySelector("#" + ids[0]).emit(ids[1], {target: this.data.listenerName});
            }

        }
        // }
    }
    , update: function () {
        //console.log("transform-cp updateSchema");
        // this.onPrepare();
    }
    , play: function () {
        this.onPrepare();
        // this.isPlay = 1;
    }

    , pause: function () {
        // this.isPlay = 0;
    }
});

function objectColor(obj, col) {
    var colorTmp = this.colorTmp = this.colorTmp || {r: 0.0, g: 0.0, b: 0.0};
    var color;
    //color 회피 추가
    if (obj.hasAttribute('material')) {
        color = obj.getAttribute("material", "color").color;
    } else if (obj.hasAttribute('light')) {
        color = obj.getAttribute("light", "color").color;
    } else {
        color = "#FFF";
    }

    var rgb = maxUtils.hex2rgb(color);

    if (rgb != null && rgb != undefined) {
        console.log("rgb : " + rgb[0] + "rgb : " + rgb[1] + "rgb : " + rgb[2]);
        var cv = new THREE.Color(rgb[0], rgb[1], rgb[2]);

        console.log("cv.r : " + cv.r + " / cv.g : " + cv.g + " / cv.b : " + cv.b);
        console.log("col.r : " + col.r + " / col.g : " + col.g + " / col.b : " + col.b);

        colorTmp.r = parseFloat(cv.r * 255 + col.r);//.toFixed(2));
        colorTmp.g = parseFloat(cv.g * 255 + col.g);//.toFixed(2));
        colorTmp.b = parseFloat(cv.b * 255 + col.b);//.toFixed(2));

        console.log("colorTmp.r : " + colorTmp.r + " / colorTmp.g : " + colorTmp.g + " / colorTmp.b : " + colorTmp.b);

        //var rgbCode = new THREE.Color(colorTmp.r, colorTmp.g, colorTmp.b).getHex();

        var result = maxUtils.rgb2hex(colorTmp.r, colorTmp.g, colorTmp.b);

        console.log("result : " + result);
        if (obj.hasAttribute('material')) {
            obj.setAttribute("material", "color", result);
        } else if (obj.hasAttribute('light')) {
            obj.setAttribute("light", "color", result);
        }
    }
}

function objectEquivalent(obj, vec1, vec2) {
    var positionTmp = this.positionTmp = this.positionTmp || {x: 0.0, y: 0.0, z: 0.0};

    positionTmp.x = parseFloat((vec1.x + vec2.x));//.toFixed(2));
    positionTmp.y = parseFloat((vec1.y + vec2.y));//.toFixed(2));
    positionTmp.z = parseFloat((vec1.z + vec2.z));//.toFixed(2));
    //20181112 수정
    //console.log("update x : " + positionTmp.x , " position.y : " + positionTmp.y + " position.z : " + positionTmp.z);
    obj.setAttribute('position', positionTmp);
}


function objectRotate(obj, vec) {
    var rotationTmp = this.rotationTmp = this.rotationTmp || {x: 0.0, y: 0.0, z: 0.0};
    var rotation = obj.getAttribute('rotation');
    //rotationTmp 가 아니라 positionTmp로 되어있어 같이 position값으로 같이 적용된 것 처럼 보인다.
    rotationTmp.x = parseFloat((rotation.x + vec.x));//.toFixed(2));
    rotationTmp.y = parseFloat((rotation.y + vec.y));//.toFixed(2));
    rotationTmp.z = parseFloat((rotation.z + vec.z));//.toFixed(2));
    obj.setAttribute('rotation', rotationTmp);
}

function objectScale(obj, vec) {
    var scaleTmp = this.scaleTmp = this.scaleTmp || {x: 0.0, y: 0.0, z: 0.0};
    var scale = obj.getAttribute('scale');
    //scaleTmp 가 아니라 positionTmp로 되어있어 같이 position값으로 같이 적용된 것 처럼 보인다.
    scaleTmp.x = parseFloat((scale.x + vec.x));//.toFixed(2));
    scaleTmp.y = parseFloat((scale.y + vec.y));//.toFixed(2));
    scaleTmp.z = parseFloat((scale.z + vec.z));//.toFixed(2));
    obj.setAttribute('scale', scaleTmp);

}


/**
 * ComplexObject를 정의하는 컴포넌트
 */
KFRAME.registerComponent("complex-object", {
    schema: {
        id: {type: "string"}
    }
});

KFRAME.registerComponent("mxt-toast-message-cp", {
    schema: {
        message: {type: "string"}
        , color: {type: "string"}
    }
    , delay: 2.0 // 2초 딜레이
    , duration: 2.0 // y 축 이동 및 opacity - 되는 시간
    , delayTimer: 0.0 // 타이머
    , durationTimer: 0.0 //
    , onInit: function () {

    }

    , onUpdate: function (deltaTime) {
        this.delayTimer = this.delayTimer + deltaTime;
        if (this.delayTimer > this.delay) {
            this.durationTimer = this.durationTimer + deltaTime;
            var opacity = this.el.getAttribute("text").opacity;
            this.el.setAttribute("text", "opacity", opacity - 0.1);
            //y축 이동하는 것 때문에 크기가 커지는 것 처럼 보였다.. position 변경시 전체 변경 해줘야 한다.
            var XAxis = this.el.getAttribute("position").x;
            var YAxis = this.el.getAttribute("position").y;
            var ZAxis = this.el.getAttribute("position").z;
            this.el.setAttribute("position", {x: XAxis, y: YAxis + 0.01, z: ZAxis});
            if (this.durationTimer > this.duration) {
                var child = document.getElementById(this.el.id);
                var parent = document.querySelector("#system-ui-test");
                parent.removeChild(child);
            }
        }
    }
});


KFRAME.registerComponent("mxt-sleep-cp", {
    schema: {
        time: {default: 0.0}
        , listenerName: {type: "string"}
    }

    , timer: 0.0
    , onUpdate: function (deltaTime) {
        this.timer += deltaTime;
        if (this.timer >= this.data.time) {
            if (this.data.listenerName) {
                var ids = this.data.listenerName.split("|");
                this.el.removeAttribute('mxt-sleep-cp');
                document.querySelector("#" + ids[0]).emit(ids[1], {target: this.data.listenerName});
            }
        }
    }

    , pause: function () {
        this.isPlay++;
    }


});


KFRAME.registerComponent('mxt-effect-cp', {
    schema: {
        objectName: {default: ""}
        , direction: {type: "vec3"} // z: forward const
        , start: {type: "vec3"}
        , end: {type: "vec3"}
        , sec: {default: 0.0}
        , scale: {type: "vec3"}
        , rotation: {type: "vec3"}
        , alpha: {default: -1.0}
        , color: {type: "color"}
        , isSync: {default: true}
        , listenerName: {type: "string"}
        , isPosition: {default: true}
        , isRotation: {default: true}
        , isScale: {default: true}
        , isColor: {default: true}
    }

    , scalePerSecX: 0.0 //new THREE.Vector3()
    , scalePerSecY: 0.0 //new THREE.Vector3()
    , scalePerSecZ: 0.0 //new THREE.Vector3()
    , rotationPerSecX: 0.0//new THREE.Vector3()
    , rotationPerSecY: 0.0//new THREE.Vector3()
    , rotationPerSecZ: 0.0//new THREE.Vector3()
    , positionPerSecX: 0.0//new THREE.Vector3()
    , positionPerSecY: 0.0//new THREE.Vector3()
    , positionPerSecZ: 0.0//new THREE.Vector3()
    , acceleration: 0.0
    , runningTime: 0.0
    , distance: 0.0
    , alphaPerSec: 0.0
    , colorPerSecR: 0.0
    , colorPerSecG: 0.0
    , colorPerSecB: 0.0
    , enableScale: true

    , onStart: function () {
        //컬러연산 안되고,회전, 크기는 왜?
        var position = this.el.getAttribute("position");
        this.data.start = {x: position.x, y: position.y, z: position.z};
        console.log("position x : " + position.x + " / position y : " + position.y + " / position z : " + position.z);
        this.onPrepare();
    }
    , onPrepare: function () {
        // console.log("start:::::::::::::::::", this.data.start, " ::::: end ::::::::::::", this.data.end);
        this.el.setAttribute("visible", "true");


        this.el.setAttribute("position", this.data.start);
        //var position = this.el.getAttribute("position");
        //this.data.start = position;
        //주어진 시간동안 변경되어야하는 크기 값
        var sc = this.el.getAttribute("scale");
        if (!(this.data.scale.x === sc.x)) {
            this.scalePerSecX = (this.data.scale.x - sc.x) / this.data.sec;
        }
        if (!(this.data.scale.y === sc.y)) {
            this.scalePerSecY = (this.data.scale.y - sc.y) / this.data.sec;
        }
        if (!(this.data.scale.z === sc.z)) {
            this.scalePerSecZ = (this.data.scale.z - sc.z) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 회전 값
        var rt = this.el.getAttribute("rotation");
        if (!(this.data.rotation.x === rt.x)) {
            this.rotationPerSecX = (this.data.rotation.x - rt.x) / this.data.sec;
        }
        if (!(this.data.rotation.y === rt.y)) {
            this.rotationPerSecY = (this.data.rotation.y - rt.y) / this.data.sec;
        }
        if (!(this.data.rotation.z === rt.z)) {
            this.rotationPerSecZ = (this.data.rotation.z - rt.z) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 거리 값
        var startVec = new THREE.Vector3(this.data.start.x, this.data.start.y, this.data.start.z);
        var endVec = new THREE.Vector3(this.data.end.x, this.data.end.y, this.data.end.z);
        this.distance = startVec.distanceTo(endVec);

        if (!(this.data.start.x === this.data.end.x)) {
            this.positionPerSecX = (this.data.end.x - this.data.start.x);
        }
        if (!(this.data.start.y === this.data.end.y)) {
            this.positionPerSecY = (this.data.end.y - this.data.start.y);
        }
        if (!(this.data.start.z === this.data.end.z)) {
            this.positionPerSecZ = (this.data.end.z - this.data.start.z);
        }

        // 주어진 시간동안 이동해야하는 속력 및 가속도
        this.velocity = 2 * this.distance / this.data.sec;
        this.acceleration = this.velocity / this.data.sec;

        // 주어진 시간동안 변경되어야하는 투명 값
        if (this.el.hasAttribute('material')) {
            var ap = this.el.getAttribute("material").opacity;
            this.alphaPerSec = (this.data.alpha - ap) / this.data.sec;
        }

        //주어진 시간동안 변경되어야하는 색상 값
        //this.el.setAttribute("material", "color", 'rgb(10, 30, 20)');
        //색상 기본값 설정
        var rgb1;
        if (this.data.color != null) {
            rgb1 = maxUtils.hex2rgb(this.data.color);
        } else {
            rgb1 = maxUtils.hex2rgb("#FFFFFF");
        }
        var cl1 = new THREE.Color(rgb1[0], rgb1[1], rgb1[2]);
        // console.log("색상 : " + cl1);
        var color;

        if (this.el.hasAttribute('material')) {
            color = this.el.getAttribute("material", "color").color;
        } else if (this.el.hasAttribute('light')) {
            color = this.el.getAttribute("light", "color").color;
        } else {
            color = "#FFFFFF";
        }

        var rgb2 = maxUtils.hex2rgb(color);

        if (null != rgb2 && rgb2 != undefined) {
            var cl2 = new THREE.Color(rgb2[0], rgb2[1], rgb2[2]);
            // color 방어로직
            if (!(rgb1[0] === rgb2[0])) {
                this.colorPerSecR = (cl1.r * 255 - (cl2.r * 255)) / this.data.sec;
            }
            if (!(rgb2[1] === rgb2[1])) {
                this.colorPerSecG = (cl1.g * 255 - (cl2.g * 255)) / this.data.sec;
            }
            if (!(rgb2[2] === rgb2[2])) {
                this.colorPerSecB = (cl1.b * 255 - (cl2.b * 255)) / this.data.sec;
            }
        }
    }

    , onUpdate: function (deltaTime) {

        // if(this.isPlay == 1) {
        if (this.runningTime < this.data.sec) {
            var fps = new THREE.Vector3(this.scalePerSecX, this.scalePerSecY, this.scalePerSecZ);//this.scalePerSec.multiplyScalar(deltaTime);
            //방어로직  rotationPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.scalePerSecX === 0 && this.scalePerSecY === 0 && this.scalePerSecZ === 0)) {
                fps.multiplyScalar(deltaTime);
            }

            var fpr = new THREE.Vector3(this.rotationPerSecX, this.rotationPerSecY, this.rotationPerSecZ);//this.scalePerSec.multiplyScalar(deltaTime);
            //방어로직  rotationPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.rotationPerSecX === 0 && this.rotationPerSecY === 0 && this.rotationPerSecZ === 0)) {
                fpr.multiplyScalar(deltaTime);
            }

            var dt = new THREE.Vector3(this.positionPerSecX, this.positionPerSecY, this.positionPerSecZ);

            var fpd = this.acceleration * this.runningTime * this.runningTime * 0.5 / this.distance;

            //방어로직  positionPerSecX , Y , Z 값이 0 일때 multiplyScalar 연산을 들어가면 null 값이 나온다.
            if (!(this.positionPerSecX === 0 && this.positionPerSecY === 0 && this.positionPerSecZ === 0)) {
                console.log("여기탄다.");
                dt.multiplyScalar(fpd);
            }

            var fpa = this.alphaPerSec * deltaTime;
            //material 회피
            if (this.el.hasAttribute('material')) {
                var opacity = this.el.getAttribute("material").opacity;
                this.el.setAttribute("material", "opacity", opacity + fpa);
            }

            //color 회피
            if ((this.el.hasAttribute('material') || this.el.hasAttribute('light'))) {
                var fpc = new THREE.Color(this.colorPerSecR, this.colorPerSecG, this.colorPerSecB);
                if (!(this.colorPerSecR === 0 && this.colorPerSecG === 0 && this.colorPerSecB === 0)) {
                    fpc.multiplyScalar(deltaTime);
                }

                if (this.data.isColor) {
                    objectColor(this.el, fpc);
                }
            }

            if (this.data.isScale) {
                objectScale(this.el, fps);
            }

            if (this.data.isRotation) {
                objectRotate(this.el, fpr);
            }

            if (this.data.isPosition) {
                objectEquivalent(this.el, this.data.start, dt);
            }

            this.runningTime += deltaTime
        } else {
            if (this.data.listenerName) {
                // var ids = this.data.listenerName.split("|");
                // this.el.removeAttribute('mxt-transform-cp');
                // document.querySelector("#" + ids[0]).emit(ids[1], {target:this.data.listenerName});
                this.el.sceneEl.removeChild(this.el);
            }
        }
        // }
    }
});


KFRAME.registerComponent('transform-cp', {
    schema: {
        objectName: {default: ""}
        , direction: {type: "vec3"} // z: forward const
        , startPosition: {type: "vec3"}
        , endPosition: {type: "vec3"}
        , sec: {default: 0.0}
        , startScale: {type: "vec3"}
        , endScale: {type: "vec3"}
        , startRotation: {type: "vec3"}
        , endRotation: {type: "vec3"}
        , startAlpha: {default: 1}
        , endAlpha: {default: 1}
        , startColor: {type: "color"}
        , endColor: {type: "color"}
        , isSync: {default: true}
        , listenerName: {type: "string"}
    }
    , runningTime: 0
    , onStart: function () {

        var position = this.el.getAttribute("position");
        var scale = this.el.getAttribute("scale");
        var rotation = this.el.getAttribute("rotation");
        //초기 값 설정
        this.data.startPosition = {x: position.x, y: position.y, z: position.z};
        this.data.startScale = {x: scale.x, y: scale.y, z: scale.z};
        this.data.startRotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        var color;
        var obj = this.el;
        if (obj.hasAttribute('material')) {
            color = obj.getAttribute("material", "color").color;
        } else if (obj.hasAttribute('light')) {
            color = obj.getAttribute("light", "color").color;
        } else {
            color = "#ffffff";
        }
        this.data.startColor = color;
        //2018-11-20 수정
        var alpha = 1;
        if (obj.hasAttribute('material')) {
            alpha = this.el.getAttribute("material").opacity;
        }
        this.data.startAlpha = alpha;

    }
    , onUpdate: function (deltaTime) {
        // if(this.isPlay == 1) {
        //2018-11-20 수정
/*        var nowPosition = this.el.getAttribute("position");
        var nowScale = this.el.getAttribute("scale");
        var nowRotation = this.el.getAttribute("rotation");
        var nowColor;
        var nowOpacity;
        var obj = this.el;
        if (obj.hasAttribute('material')) {
            nowColor = this.el.getAttribute("material", "color");
            nowOpacity = this.el.getAttribute("material", "opacity");
        } else if (obj.hasAttribute('light')) {
            nowColor = this.el.getAttribute("light", "color");
        }*/

        if((this.data.sec == 0 && this.runningTime == 0)){
            console.log("여기들어온다 : " + this.el.id);
            this.el.setAttribute("position", this.data.endPosition);
            this.el.setAttribute("scale", this.data.endScale);
            this.el.setAttribute("rotation", this.data.endRotation);

            var obj = this.el;
            if (obj.hasAttribute('material')) {
                this.el.setAttribute("material", "color", this.data.endColor);
                this.el.setAttribute("material", "opacity", this.data.endAlpha);
            } else if (obj.hasAttribute('light')) {
                this.el.setAttribute("light", "color", this.data.endColor);
            }
            this.runningTime += deltaTime
        }else if ((this.runningTime < this.data.sec && this.data.sec > 0)) {
/*            console.log(this.el.id + " / runningTime : " + this.runningTime + " / duration : " + this.data.sec);
            console.log(this.el.id + " / if1 : " + (this.runningTime < this.data.sec && this.data.sec > 0));
            console.log(this.el.id + " / if1-2 : " + (this.data.sec > 0));
            console.log(this.el.id + " / if1-3 : " + (this.runningTime < this.data.sec));*/
            //console.log(this.el.id + " / if2 : " + (nowPosition != this.data.endPosition && nowRotation != this.data.endRotation && nowScale != this.data.endScale));
            //|| (nowPosition != this.data.endPosition && nowRotation != this.data.endRotation && nowScale != this.data.endScale)
            //&& (nowPosition != this.data.endPosition && nowRotation != this.data.endRotation && nowScale != this.data.endScale)
            //console.log("여기입니다.");
            if (this.runningTime > 0) {
                var position = maxUtils.vectorConstant(this.data.startPosition, this.data.endPosition, this.runningTime, this.data.sec);
                this.el.setAttribute("position", position);
                var scale = maxUtils.vectorConstant(this.data.startScale, this.data.endScale, this.runningTime, this.data.sec);
                this.el.setAttribute("scale", scale);
                var rotation = maxUtils.vectorConstant(this.data.startRotation, this.data.endRotation, this.runningTime, this.data.sec);
                this.el.setAttribute("rotation", rotation);

                var obj = this.el;
                if (obj.hasAttribute('material')) {
                    var result = maxUtils.colorConstant(this.data.startColor, this.data.endColor, this.runningTime, this.data.sec);
                    this.el.setAttribute("material", "color", result);
                    var result = maxUtils.constant(this.data.startAlpha, this.data.endAlpha, this.runningTime, this.data.sec);
                    this.el.setAttribute("material", "opacity", result);
                } else if (obj.hasAttribute('light')) {
                    var result = maxUtils.colorConstant(this.data.startColor, this.data.endColor, this.runningTime, this.data.sec);
                    this.el.setAttribute("light", "color", result);
                }

            }
            this.runningTime += deltaTime;
        } else {
            //마지막 보정?
            if (this.runningTime > 0) {
                var position = maxUtils.vectorConstant(this.data.startPosition, this.data.endPosition, this.runningTime, this.data.sec);
                this.el.setAttribute("position", position);
                var scale = maxUtils.vectorConstant(this.data.startScale, this.data.endScale, this.runningTime, this.data.sec);
                this.el.setAttribute("scale", scale);
                var rotation = maxUtils.vectorConstant(this.data.startRotation, this.data.endRotation, this.runningTime, this.data.sec);
                this.el.setAttribute("rotation", rotation);

                var obj = this.el;
                if (obj.hasAttribute('material')) {
                    var result = maxUtils.colorConstant(this.data.startColor, this.data.endColor, this.runningTime, this.data.sec);
                    this.el.setAttribute("material", "color", result);
                    var result = maxUtils.constant(this.data.startAlpha, this.data.endAlpha, this.runningTime, this.data.sec);
                    this.el.setAttribute("material", "opacity", result);
                } else if (obj.hasAttribute('light')) {
                    var result = maxUtils.colorConstant(this.data.startColor, this.data.endColor, this.runningTime, this.data.sec);
                    this.el.setAttribute("light", "color", result);
                }

            }

            console.log("------- transform end ------------ ");
            if (this.data.listenerName) {
                var ids = this.data.listenerName.split("|");
                console.log("transform sync callback");
                this.el.removeAttribute('transform-cp');
                console.log("ids[0] : " + ids[0] +" / ids[1] : " + ids[1] + " / ids[2] : " + ids[2] + " / ids[3]" + ids[3]);
                // console.log("user position:::::::::::::::::::", this.el.getAttribute("position"));
                document.querySelector("#" + ids[0]).emit(ids[1], {target: this.data.listenerName});
                //var transformWorker = new Worker('/resources/webWorker/monopolyWorker.js');
                //transformWorker.postMessage(["transformEnd",this.el.id]);
                //worker.postMessage(["transformEnd",this.el.id]);
            }else{
                this.el.removeAttribute('transform-cp');
                //worker마다 인스턴스를 만들지 않으면. oneThread로 처리하는 것 과 같다.
                /*var transformWorker = new Worker('/resources/webWorker/monopolyWorker.js');
                transformWorker.postMessage(["transformEnd",this.el.id]);
                transformWorker.onmessage = function(e){
                    if(e.data[1] == "endWorker"){
                        console.log("endWorker!");
                        transformWorker.terminate();
                    }
                }*/
                //worker.postMessage(["transformEnd",this.el.id]);
            }
        }
    }
    , play: function () {
        //this.onPrepare();
    }
    , pause: function () {
    }
});

