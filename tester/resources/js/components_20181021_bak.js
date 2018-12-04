KFRAME.registerComponent('broadcast', {
    onStart: function () {
        KEvent.addEventListener('broadcast', function (event) {
            var eventName = event.detail.eventName;
            //console.log('호출됨 : ' + eventName +" / type : " + typeof eventName);
            //KEvent.call(eventName);
            KEvent.componentCall(eventName);
            //test
        });

    }
});

KFRAME.registerComponent('max-button', {
    //마우스이벤트는 컴포넌트로 정의한다.
    schema: {
        panelSize: {default: {width: 0.3, height: 0.1, depth: 0.005}},
        content: {default: ''}, //버튼에 넣어줄 텍스트 값
        contentColor: {type: 'color', default: 'black'},//텍스트 색상 값
        contentSize: {default: 1.0},//텍스트 크기
        transparent: {default: false},//투명여부
        opacity: {default: 1},//투명 세기
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
        contentColor: {type: 'color', default: 'black'},//alert 창 텍스트 색상
        contentSize: {default: 1.0},//텍스트 크기
        transparent: {default: false},//투명여부
        opacity: {default: 1},//투명 세기
        color: {type: 'color', default: 'white'},//패널 색상
        buttonText: {default: '확인'} //버튼 text 값
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
        contentColor: {type: 'color', default: 'black'},//alert 창 텍스트 색상
        contentSize: {default: 1.0},//텍스트 크기
        transparent: {default: false},//투명여부
        opacity: {default: 1},//투명 세기
        color: {type: 'color', default: 'white'},//패널 색상
        button1Text: {default: 'YES'}, //버튼 text 값
        button2Text: {default: 'NO'} //버튼 text 값
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
        var radius = maxUtils.getProperty(this.el.id, 'geometry', 'radius' , this.el, "");
        var result = maxUtils.sensitive(this.el.id, radius, this.data.targetId);
        if (result) {
            var enterEventName = this.data.enterEventName;
            if (null != enterEventName && enterEventName != undefined) {
                //console.log("호출됨");
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
        this.correction = yAxis; //초기 rotation 이 따라갈  object 의 방향과 맞는 방향이라고 가정하여 보정한다.
        //console.log("correction : " + this.correction);
    }
    , onUpdate: function () {
        maxUtils.synchroRotation(this.el.id, this.data.targetId, this.correction);
    }
})


KFRAME.registerComponent('location-point', {
    schema: {default: ''}
    , onMouseDown: function () {
        //console.log("id : " + this.el.id);
        var entities = document.querySelectorAll('a-entity[location-move]');

        var main = null;
        entities.forEach(function (value, index, array1) {
            if (value.getAttribute('location-move').active) {
                main = value;
                //console.log("main : " + main.id);
            }
        });

        if (!(main === null)) {
            maxUtils.setProperty(main.id, 'location-move', 'active', true, this.el, "");
            maxUtils.setProperty(main.id, 'location-move', 'targetId', this.el.id, this.el, "");
            maxUtils.setProperty(main.id, 'location-move', 'isTick', true, this.el, "");
        }
    }
});

//수정
KFRAME.registerComponent('location-move', {
    schema: {
        speed: {default: 1},
        targetId: {default: ''}, //이동할 대상
        isTick: {default: true}//active
    },
    onAwake: function () {
        this.heading = maxUtils.getWorldPosition(this.el).y;
        this.startPosition = maxUtils.getWorldPosition(this.el);
    },
    play : function(){
        this.data.isTick = true;
        this.startPosition = maxUtils.getWorldPosition(this.el);
    }
    ,pause : function(){
        this.data.isTick = false;
    }
    ,onUpdate: function (deltaTime) {
        //console.log("id : " + this.el.id + " / active : " + this.data.active);

        if (this.data.isTick) {
            if (this.el.hasAttribute('animation-mixer')) {
                this.el.setAttribute('animation-mixer', 'clip', 'animation_0');
            }
            //event.detail.target -> 에러난다.
            //target 못찾음
            //console.log("targetId : " + this.data.targetId);
            var target = maxUtils.findObject(this.data.targetId, "", "");
            //var target = document.querySelector("#"+ this.data.targetId);
            //console.log("target : " + target);
            var endPosition = maxUtils.getWorldPosition(target);
            maxUtils.locationMove(this.el, this.startPosition, endPosition, this.heading, this.data.speed, deltaTime);
        } else {
            this.el.removeAttribute('location-move');
            //this.heading = maxUtils.getWorldPosition(this.el).y;
            //this.startPosition = maxUtils.getWorldPosition(this.el);
        }
    }
});