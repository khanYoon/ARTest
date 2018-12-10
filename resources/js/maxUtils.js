String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}

maxUtils = {


    // 20181001 확인 후 미수정
    // branch: function (source, compare, target) {
    branch: function (isBranch) {

        // var t1 = this.getType(source);
        // var t2 = this.getType(target);
        //
        // console.log(source + " " + compare + " " + target);
        //
        // var result = false;
        // if(t1 == t2 && t1 == "Number") {
        //     if(compare == ">") {
        //         if(source*1 > target*1) result = true; else result = false;
        //     } else if(compare == "<") {
        //         if(source*1 < target*1) result = true; else result = false;
        //     } else if(compare == "==") {
        //         if(source*1 == target*1) result = true; else result = false;
        //     } else if(compare == "!=") {
        //         if(source*1 != target*1) result = true; else result = false;
        //     }
        // }
        //
        // console.log(result);
        // return result;
        return isBranch;
    },
    // 20181001 확인 후 미수정
    contain: function (source, target) {
        var result = false;
        var target = target.split(";");

        for (var i = 0; i < target.length; i++) {
            // console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if (target[i].trim() == source) {
                result = true;
            }
        }
        // console.log("khan result : " + result);
        return result;
    },
    /**
     * number type의 변수를 string 형으로 반환
     *
     * @param1 : number
     * @return: string
     */
    intToString: function (num) {
        return num.toString();
    },
    // 20181001 수정
    /**
     * 해당하는 object를 찾아 반환
     *
     * @param1 : id
     * @param2 : sourceEl (html element)
     * @param3 : eventId (listener Event id)
     * @return: string
     */
    findObject: function (id, sourceEl, eventId) {
        var obj;
        try {
            // ("마지막 멈추는 : " + id + " / " + eventId);
            if (id == "this") {
                if (sourceEl != null && sourceEl != '' && sourceEl != 'undefined') {
                    // console.log("마지막 멈추는 : " + sourceEl,id + " / ");
                    obj = sourceEl;
                } else if (eventId != null && eventId != '' && eventId != 'undefined') {
                    obj = document.querySelector("#" + eventId);
                }
            } else {
                // console.log("board : " + id);
                obj = document.querySelector("#" + id);
            }
        } catch (e) {
            console.log(e);
        }
        return obj
    },

    // 20181001 수정
    /**
     * 해당하는 object visible 값 setting
     *
     * @param1 : id
     * @param2 : value
     * @param3 : sourceEl (html element)
     * @param4 : eventId (listener Event id)
     */
    setVisible: function (id, value, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute("visible", value);
    },
    // 20181123 추가
    /**
     * 해당하는 object visible 값 setting
     *
     * @param1 : id
     * @param2 : sourceEl (html element)
     * @param3 : eventId (listener Event id)
     */
    getVisible: function (id, value, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var result = obj.getAttribute("visible");
        return result;
    },
    // 20181004 수정
    /**
     * 해당하는 object component의 property를 가져온다
     *
     * @param1 : id
     * @param2 : componentName
     * @param3 : property
     * @param4 :sourceEl (html element)
     * @param5 : eventId (listener Event id)
     */
    getProperty: function (id, componentName, property, sourceEl, eventId) {
        // console.log("getProperty id : " + id + ", componentName : " + componentName);
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        // console.log("getProperty :::::: ", obj);
        var result = "";
        if (property != "") {
            // result = eval("document.getElementById('" + obj.id + "').getAttribute('" + componentName + "')." + property + ";");
            result = eval("document.querySelector('#" + obj.id + "').getAttribute('" + componentName + "')." + property + ";");
        } else {
            // result = eval("document.getElementById('" + obj.id + "').getAttribute('" + componentName + "');");
            result = eval("document.querySelector('#" + obj.id + "').getAttribute('" + componentName + "');");
            // result = document.querySelector('#user').getAttribute("position");
        }

        // console.log("position ::::::::::::", result);
        return result;
    },
    // 20181001 수정
    /**
     * 해당하는 object component의 property 값을 세팅한다.
     *
     * @param1 : id
     * @param2 : componentName
     * @param3 : property
     * @param4 : value
     * @param5 :sourceEl (html element)
     * @param6 : eventId (listener Event id)
     */
    setProperty: function (id, componentName, property, value, sourceEl, eventId) {
        // var obj = maxUtils.findObject(id, sourceEl, eventId);
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (typeof value === "string") {
            eval(obj.id + ".setAttribute(\"" + componentName + "\",{" + property + ": \"" + value + "\"});");
        } else {
            eval(obj.id + ".setAttribute(\"" + componentName + "\",{" + property + ": " + value + "});");
        }
    },
    // 20181001 수정
    /**
     * 해당하는 object text component의 value 값을 가져온다.
     *
     * @param1 : id
     * @param2 : sourceEl (html element)
     * @param3 : eventId (listener Event id)
     * @return : text Value
     */
    getText: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var result = obj.getAttribute("text", "value");
        return result;
    },
    // 20181001 수정
    /**
     * 해당하는 object text component의 value 값을 세팅한다.
     *
     * @param1 : id
     * @param2 : value
     * @param3 : sourceEl (html element)
     * @param4 : eventId (listener Event id)
     */
    setText: function (id, value, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute("text", "value", value);
    },

    /**
     * 두개의 값을 비교하여 같은 값이면 true를 리턴한다.
     *
     * @param1 : id
     * @param2 : value
     * @return : bool
     */
    // 20181001 확인 후 미수정
    compare: function (source, target) {
        var result = false;
        if (source === target) {
            result = true;
        }
        return result;
    },

    /**
     * min - max 범위의 랜덤값을 리턴한다.
     *
     * @param1 : min
     * @param2 : max
     * @return : a - b random
     */
    // 20181001 확인 후 미수정
    random: function (a, b) {
        // random: function (a, b, c) {
        var num = Math.floor(Math.random() * b);

        // c = (num % b) + a;
        // console.log(c);
        return (num % b) + a;
    },
    /**
     * 두개의 문자열의 더하여 리턴해준다.
     *
     * @param1 : a
     * @param2 : b
     * @return : a + b
     */
    // 20181001 확인 후 미수정
    concat: function (a, b) {
        // : console.log("khan sum a : " + a + " b : " + b);
        // console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
        return a + b;
    },
    /**
     * 값을 더하여 리턴해준다.
     *
     * @param1 : a
     * @param2 : b
     * @return : a + b
     */
    // 20181001 확인 후 미수정
    sum: function (a, b) {
        // console.log("khan sum a : " + a + " b : " + b);
        // console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
        var parseA = a;
        var parseB = b;
        if (typeof a === "string") {
            parseA = parseInt(a);
        }
        if (typeof a === "string") {
            parseB = parseInt(b);
        }

        return parseInt(parseA + parseB);
    },

    /**
     * float 타입의 값을 더하여 리턴해준다.
     *
     * @param1 : a
     * @param2 : b
     * @return : a + b
     */
    // 20181001 확인 후 미수정
    sumFloat: function (a, b) {
        // console.log("khan sumFloat a : " + a + " b : " + b);
        // console.log("khan sumFloat a : " + parseFloat(a).toFixed(4) + " b : "
        // + parseFloat(b).toFixed(4));
        // console.log("khan sumFloat : " + parseFloat(a+b).toFixed(4));
        // console.log("khan sumFloat : " + parseFloat(parseFloat(a).toFixed(4))
        // + parseFloat(parseFloat(b).toFixed(4)));
        var parseA = a;
        var parseB = b;

        if (typeof a === "string") {
            parseA = parseFloat(a);
        }
        if (typeof a === "string") {
            parseB = parseFloat(b);
        }
        // console.log("parseA : " + parseA + " /parseB : " + parseB +" /
        // parsefloat : " + parseFloat(parseA + parseB).toFixed(2));
        return parseFloat(parseA + parseB).toFixed(2);
    },
    // 20181001 확인 후 미수정
    /**
     * int 타입의 값을 뺼셈하여 리턴해준다.
     *
     * @param1 : a
     * @param2 : b
     * @return : a - b
     */
    minus: function (a, b) {
        var parseA = a;
        var parseB = b;
        if (typeof a === "string") {
            parseA = parseInt(a);
        }
        if (typeof a === "string") {
            parseB = parseInt(b);
        }

        return parseInt(parseA - parseB);
    },
    // 20181001 확인 후 미수정
    /**
     * float 타입의 값을 뺼셈하여 리턴해준다.
     *
     * @param1 : a
     * @param2 : b
     * @return : a - b
     */
    minusFloat: function (a, b) {
        var parseA = a;
        var parseB = b;
        if (typeof a === "string") {
            parseA = parseFloat(a);
        }
        if (typeof a === "string") {
            parseB = parseFloat(b);
        }

        return parseFloat(parseA - parseB).toFixed(2);
    },
    // 20181001 확인 후 미수정
    /**
     * a가 b보다 작으면 true값을 리턴해주는 함수
     *
     * @param1 : a
     * @param2 : b
     * @return : bool
     */
    lessThan: function (a, b) {
        var result = false;
        if (a < b) {
            result = true;
        }
        return result;
    }
    /**
     * a가 b보다 크면 true 값을 리턴해주는 함수
     *
     * @param1 : a
     * @param2 : b
     * @return : bool
     */
    // 20181001 확인 후 미수정
    ,
    greaterThan: function (a, b) {
        var result = false;
        if (a > b) {
            result = true;
        }
        return result;
    },
    // 20181001 확인 후 미수정
    /**
     * 특정 입력값이 ; 구분자 string 형태로 들어왔을때 지정대상과 맞는 값이 있는 지 확인후 bool 값 리턴
     *
     * @param1 : a
     * @param2 : b
     * @return : bool
     */
    isCorner: function (corner, addMoveCount) {
        var result = false;

        var corners = corner.split(";");

        for (var i = 0; i < corners.length; i++) {
            // console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if (parseInt(corners[i].trim()) === addMoveCount) {
                result = true;
            }
        }
        // console.log("khan result : " + result);
        return result;
    }
    // 20181001 확인 후 미수정
    /**
     * 절대값 리턴
     *
     * @param1 : a
     * @return : float
     */
    ,
    abs: function (a) {
        var num = Math.sign(a);
        if (num === -1) {
            return parseFloat(parseFloat(a * -1));
        }
        return a;
    },
    // 20181001 수정
    /**
     * 특정 object position에 vec3 값 설정
     *
     * @param1 : a
     * @param2 : vec3
     * @param3 : sourceEl
     * @param4 : eventId
     */
    setPosition: function (id, vec, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        obj.setAttribute("position", vec);
    },
    // 20181001 수정

    /**
     * 특정 object의 position vec3 값을 가져온다.
     *
     * @param1 : a
     * @param2 : sourceEl
     * @param3 : eventId
     * @return : vec3
     */
    getPosition: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var positionTmp = obj.positionTmp = obj.positionTmp || {x: 0.0, y: 0.0, z: 0.0};
        var position = obj.getAttribute('position');
        positionTmp.x = position.x;
        positionTmp.y = position.y;
        positionTmp.z = position.z;
        return positionTmp;
    },
    // 20181001 수정
    /**
     * 특정 object의 roration vec3 값 설정
     *
     * @param1 : a
     * @param2 : vec3
     * @param3 : sourceEl
     * @param4 : eventId
     */
    setRotation: function (id, vec, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('rotation', vec);
    },
    // 20181001 수정
    /**
     * 특정 object의 rotation vec3 값을 가져온다.
     *
     * @param1 : a
     * @param2 : sourceEl
     * @param3 : eventId
     * @return : vec3
     */
    getRotation: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var rotateTmp = obj.rotateTmp = obj.rotateTmp || {x: 0.0, y: 0.0, z: 0.0};
        var rotation = obj.getAttribute('rotation');
        rotateTmp.x = rotation.x;
        rotateTmp.y = rotation.y;
        rotateTmp.z = rotation.z;
        return rotateTmp;
    },
    // 20181001 확인 후 미수정
    /**
     * 나머지값 리턴
     *
     * @param1 : a
     * @param2 : b
     * @return : a % b
     */
    rest: function (a, b) {
        return a % b
    },
    /**
     * 카메라 이동 위치를 더해주는 함수
     *
     * @param1 : object
     * @param2: Vec3
     */
    translate: function (obj, vec) {
        var positionTmp = this.positionTmp = this.positionTmp || {x: 0.0, y: 0.0, z: 0.0};
        var position = obj.getAttribute('position');
        /*
		 * 소수점 연산 보정 소수점 2자리 까지 보정한다.
		 */
        positionTmp.x = parseFloat((position.x + vec.x).toFixed(2));
        positionTmp.y = parseFloat((position.y + vec.y).toFixed(2));
        positionTmp.z = parseFloat((position.z + vec.z).toFixed(2))
        obj.setAttribute('position', positionTmp);
    },
    /**
     * 카메라 회전 위치를 더해주는 함수
     *
     * @param1 : object
     * @param2: Vec3
     */
    transRotate: function (obj, vec) {
        var rotateTmp = this.rotateTmp = this.rotateTmp || {x: 0.0, y: 0.0, z: 0.0};
        var rotation = obj.getAttribute('rotation');
        /*
		 * 소수점 연산 보정 소수점 2자리 까지 보정한다.
		 */
        rotateTmp.x = parseFloat((rotation.x + vec.x).toFixed(2));
        rotateTmp.y = parseFloat((rotation.y + vec.y).toFixed(2));
        rotateTmp.z = parseFloat((rotation.z + vec.z).toFixed(2));
        obj.setAttribute('rotation', rotateTmp);
    },

    // 20181001 수정
    translateVector: function (id, velocity, delta, sourceEl, eventId) {

        var obj = maxUtils.findObject(id, sourceEl, eventId);

        var directionVector = new THREE.Vector3(0, 0, 0);
        var rotation = obj.getAttribute('rotation');
        directionVector.copy(velocity);
        directionVector.multiplyScalar(delta);
        if (!rotation) {
            return directionVector;
        }
        var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');
        rotationEuler.set(THREE.Math.degToRad(rotation.x), THREE.Math.degToRad(rotation.y), THREE.Math.degToRad(rotation.z));
        directionVector.applyEuler(rotationEuler);
        maxUtils.translate(obj, directionVector);
    },

    // 20181001 수정
    transVector: function (id, velocity, delta, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        var directionVector = new THREE.Vector3(0, 0, 0);// 이동방향 설정
        directionVector.copy(velocity); // 속도 설정
        directionVector.multiplyScalar(delta); // 이동 거리 계산
        maxUtils.translate(obj, directionVector); // 이동
    },
    /**
     * 유니크아이디 생성
     *
     * @param1 : 기본아이디
     * @return return Id
     */
    getUniqueId: function (baseId) {
        if (!document.getElementById(baseId)) {
            return baseId;
        }
        var i = 1;
        // If the baseId ends with _#, it extracts the baseId removing the
        // suffix
        var groups = baseId.match(/(\w+)-(\d+)/);
        if (groups) {
            baseId = groups[1];
            i = groups[2];
        }

        while (document.getElementById(baseId + '-' + i)) {
            i++;
        }

        return baseId + '-' + i;
    },
    /**
     * 버튼 생성
     *
     * @param1 : element (button)
     * @param2 : 사이즈 width, height, depth (크기)
     * @param3 : 텍스트
     * @param4: : 텍스트 색상
     * @param5: : 텍스트 사이즈
     * @param6 : 투명여부
     * @param7 : 투명도
     * @param8 : 박스 컬러
     */
    createOrUpdateButton: function (el, size, content, contentColor, contentSize, transparent, opacity, color) {
        var button = el;
        var id = button.getAttribute('id');
        if (id == '' || id == 'undefind' || id == null) {
            button.setAttribute('id', maxUtils.getUniqueId("btn"));
        }
        button.setAttribute('geometry', {primitive: 'box', width: size.width, height: size.height, depth: size.depth});
        button.setAttribute('material', {color: color, transparent: transparent, opacity: opacity});
        button.setAttribute('text', {
            align: 'center',
            value: content,
            color: contentColor,
            width: contentSize,
            font: '고딕체',
            zOffset: 0.003,
            transparent: transparent,
            opacity: opacity
        });
    },
    /**
     * alert창 생성
     *
     * @param1 : element (button)
     * @param2 : 사이즈 width, height, depth (크기)
     * @param3 : alert 텍스트
     * @param4: : alert 텍스트 색상
     * @param5: : alert 텍스트 사이즈
     * @param6 : 투명여부
     * @param7 : 투명도
     * @param8 : alert 패널 색상
     * @param9 : 버튼 텍스트 값
     * @return : return array
     */
    createOrUpdateAlert: function (el, size, content, contentColor, contentSize, transparent, opacity, color, buttonText) {

        var result = new Array();

        var alert = el;

        var id = alert.getAttribute('id');
        if (id == '' || id == 'undefind' || id == null) {
            alert.setAttribute('id', maxUtils.getUniqueId("alert"));
        }

        alert.setAttribute('geometry', {primitive: 'box', width: size.width, height: size.height, depth: size.depth});
        alert.setAttribute('material', {color: color, transparent: transparent, opacity: opacity});

        var text;
        var button;
// console.log("childNodes : " + alert.childNodes);
// console.log("childLength : " + alert.childNodes.length + " /childLength : " +
// typeof alert.childNodes.length);

        if (alert.childNodes.length <= 0) {
// console.log("11111")
            text = document.createElement('a-entity');
            button = document.createElement('a-entity');
        } else {
// console.log("2222")
            text = alert.childNodes[0];
            button = alert.childNodes[1];
            /*
			 * console.log("alert : " + typeof alert); console.log("text : " +
			 * typeof text); console.log("exit : " + typeof exit);
			 * console.log("button : " + typeof button);
			 */
        }

        text.setAttribute('id', maxUtils.getUniqueId("alert-text"));
        text.setAttribute('position', {x: 0, y: 0.05, z: 0});
        text.setAttribute('text', {
            align: 'center',
            value: content,
            color: contentColor,
            width: contentSize,
            font: '고딕체',
            zOffset: 0.003,
            transparent: transparent,
            opacity: opacity
        });
        result[0] = text;

        button.setAttribute('position', {x: 0, y: -0.1, z: 0.005});
        button.setAttribute('max-button', {content: buttonText, transparent: transparent, opacity: opacity});
        result[1] = button;

        return result;
    },
    /**
     * confirm 생성
     *
     * @param1 : element (button)
     * @param2 : 사이즈 width, height, depth (크기)
     * @param3 : alert 텍스트
     * @param4: : alert 텍스트 색상
     * @param5: : alert 텍스트 사이즈
     * @param6 : 투명여부
     * @param7 : 투명도
     * @param8 : alert 패널 색상
     * @param9 : 버튼1 텍스트 값
     * @param10 : 버튼2 텍스트 값
     * @return : return array
     */
    createOrUpdateConfirm: function (el, size, content, contentColor, contentSize, transparent, opacity, color, button1Text, button2Text) {
        var result = new Array();

        var confirm = el;

        var id = confirm.getAttribute('id');
        if (id == '' || id == 'undefind' || id == null) {
            confirm.setAttribute('id', maxUtils.getUniqueId("alert"));
        }

        confirm.setAttribute('geometry', {primitive: 'box', width: size.width, height: size.height, depth: size.depth});
        confirm.setAttribute('material', {color: color, transparent: transparent, opacity: opacity});

        var text;
        var button1;
        var button2;

        if (confirm.childNodes.length <= 0) {
            text = document.createElement('a-entity');
            button1 = document.createElement('a-entity');
            button2 = document.createElement('a-entity');
        } else {
            text = confirm.childNodes[0];
            button1 = confirm.childNodes[1];
            button2 = confirm.childNodes[2];
        }

        text.setAttribute('id', maxUtils.getUniqueId("confirm-text"));
        text.setAttribute('position', {x: 0, y: 0.05, z: 0});
        text.setAttribute('text', {
            align: 'center',
            value: content,
            color: contentColor,
            width: contentSize,
            font: '고딕체',
            zOffset: 0.003,
            transparent: transparent,
            opacity: opacity
        });
        result[0] = text;

        button1.setAttribute('position', {x: -0.15, y: -0.1, z: 0.005});
        button1.setAttribute('max-button', {content: button1Text, transparent: transparent, opacity: opacity});
        result[1] = button1;

        button2.setAttribute('position', {x: 0.15, y: -0.1, z: 0.005});
        button2.setAttribute('max-button', {content: button2Text, transparent: transparent, opacity: opacity});
        result[2] = button2;

        return result;
    },
    /**
     * 월드 포지션 리턴
     *
     * @param1 : obj
     * @return : vec3
     */
    getWorldPosition: function (obj) {
        var position = obj.object3D.getWorldPosition();
        return position;
    },
    /**
     * 월드 포지션 세팅
     *
     * @param1 : obj
     * @param :
     *            vec3
     */
    setWorldPosition: function (obj, position) {
        obj.object3D.position.set(position.x, position.y, position.z);
    },
    /**
     * 해당 범위내에 카메라 있는 지 확인 하여 있으면 true 리턴
     *
     * @param1 : 자기자신 id
     * @param2 : 반지름
     * @param3 : 감지할 대상 id
     * @return : bool
     */
    // 20181001 수정
    sensitive: function (id, radius, targetId) {
        var result = false;

        var obj = maxUtils.findObject(id, "", "");

        var position = maxUtils.getWorldPosition(obj);
        var sensitiveMin = {
            x: maxUtils.minusFloat(position.x, radius),
            y: maxUtils.minusFloat(position.y, radius),
            z: maxUtils.minusFloat(position.z, radius)
        };

        var sensitiveMax = {
            x: maxUtils.sumFloat(position.x, radius),
            y: maxUtils.sumFloat(position.y, radius),
            z: maxUtils.sumFloat(position.z, radius)
        };

        var targetObj = document.querySelector("#" + targetId);

        var target = maxUtils.getWorldPosition(targetObj);

        if ((sensitiveMin.x <= target.x && sensitiveMax.x >= target.x) && (sensitiveMin.z <= target.z && sensitiveMax.z >= target.z) && (sensitiveMin.y <= target.y && sensitiveMax.y >= target.y)) {
            result = true;
        }

        return result
    },
    // 호출시 component 연결
    // 20181001 수정

    sensitiveObject: function (sourceObjectName, targetObjectName, enterEventName, exitEventName, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('sensitive', {
            targetId: targetObjectName,
            enterEventName: enterEventName,
            exitEventName: exitEventName
        });
    },
    /**
     * 멀티미디어 플레이
     *
     * @param1 : id
     */
    // 20181001수정
    playMultiMedia: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (obj.hasAttribute("sound")) {
            obj.components.sound.playSound();
        } else {
            // console.log("obj.id : " : obj.id);
            var src = maxUtils.getProperty(obj.id, "material", "src", "", "");

            var video_el = null;

            if (typeof src == 'string') {
                video_el = document.createElement('video');
                video_el.setAttribute('src', src);
                var videoId = maxUtils.getUniqueId('video');
                video_el.setAttribute('id', videoId);

                var assets = null;
                if (document.querySelector('a-assets')) {
                    assets = document.querySelector('a-assets');
                    assets.appendChild(video_el);
                } else {
                    var scene = document.querySelector('a-scene');
                    assets = document.createElement('a-assets');
                    assets.appendChild(video_el);
                    scene.appendChild(assets);
                }

                obj.setAttribute('material', 'src', '#' + videoId);
            } else {
                video_el = maxUtils.getProperty(obj.id, "material", "src", "", "");
            }

            if (video_el.paused || video_el.ended) {
                video_el.play();
            }
        }
    },
    // 추가
    /**
     * 멀티미디어 정지
     *
     * @param1 : id
     */
    // 20181001 수정
    pauseMultiMedia: function (id, sourceEl, eventId) {

        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (obj.hasAttribute("sound")) {
            obj.components.sound.pauseSound();
        } else {
            // console.log("obj.id : " : obj.id);
            var src = maxUtils.getProperty(obj.id, "material", "src", "", "");


            var video_el = null;

            if (typeof src == 'string') {
                video_el = document.createElement('video');
                video_el.setAttribute('src', src);
                var videoId = maxUtils.getUniqueId('video');
                video_el.setAttribute('id', videoId);

                var assets = null;
                if (document.querySelector('a-assets')) {
                    assets = document.querySelector('a-assets');
                    assets.appendChild(video_el);
                } else {
                    var scene = document.querySelector('a-scene');
                    assets = document.createElement('a-assets');
                    assets.appendChild(video_el);
                    scene.appendChild(assets);
                }

                obj.setAttribute('material', 'src', '#' + videoId);
            } else {
                video_el = maxUtils.getProperty(obj.id, "material", "src", "", "");
            }

            if (!video_el.paused) {
                video_el.pause();
            }
        }
    },
    /*
	 * createEventListener: function (sourceObjectName, eventName, event) { var
	 * obj = maxUtils.findObject(sourceObjectName); var listener =
	 * 'KEvent.addEventListener(\"' + eventName + '\", function(){'; //이벤트 추가시
	 * 아래 항목에 추가하면 된다. switch (event) { case 'playVideo' : listener = listener +
	 * 'maxUtils.playVideo(\"' + obj.id + '\")'; break; case 'pauseVideo' :
	 * listener = listener + 'maxUtils.pauseVideo(\"' + obj.id + '\")'; break;
	 * case 'playSound' : listener = listener + 'maxUtils.playSound(\"' + obj.id +
	 * '\")'; break; case 'pauseSound' : listener = listener +
	 * 'maxUtils.pauseSound(\"' + obj.id + '\")'; break; case 'visible' :
	 * listener = listener + 'maxUtils.visible(\"' + obj.id + '\")'; break; case
	 * 'invisible' : listener = listener + 'maxUtils.invisible(\"' + obj.id +
	 * '\")'; break; case 'moveLocation' : listener = listener +
	 * 'maxUtils.moveLocation(\"' + obj.id + '\")'; break; case 'changeCamera' :
	 * listener = listener + 'maxUtils.changeCamera(\"' + obj.id + '\")'; break;
	 * default : break; }
	 * 
	 * listener = listener + '})';
	 * 
	 * return listener; },
	 */

    /**
     * 대상을 따라 다니게 한다.
     *
     * @param1 : 자기자신 object
     * @param2 : 타겟 아이디
     */
    // 20181001 수정
    lookAt: function (id, targetId, heading) {
        var obj = maxUtils.findObject(id, "", "");
        var target = maxUtils.findObject(targetId, "", "");
        var targetRotation = maxUtils.getRotation(target);
        var targetPosition = maxUtils.getWorldPosition(target);
        var yAxis = targetRotation.y;

        // 90이 왼쪽 180 뒤쪽 우측이 270 나머지 0
        // 일단 z 축 앞에 만 나오게 하였음.
        targetRotation.y = heading; // 보정
        targetPosition.z = targetPosition.z - 10;
        maxUtils.setPosition(obj, targetPosition);
        obj.setAttribute("rotation", {x: 0, y: 0, z: 0});

        /*
		 * if (targetRotation.y > 0) {
		 * 
		 * if (yAxis > 360) { yAxis = parseFloat(yAxis % 360).toFixed(2); //
		 * console.log("양수 : "+ yAxis); } //console.log("양수 : "+ yAxis/90); if
		 * (yAxis / 90 >= 1 && yAxis / 90 <= 2) { //console.log("양수1111");
		 * targetPosition.x = targetPosition.x - 10; maxUtils.setPosition(obj,
		 * targetPosition); obj.setAttribute("rotation", {x: 0, y: 90, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:90, z:0}); } else if (yAxis / 90 >=
		 * 2 && yAxis / 90 <= 3) { //console.log("양수2222"); targetPosition.z =
		 * targetPosition.z + 10; maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 180, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:180, z:0}); } else if (yAxis / 90 >=
		 * 3 && yAxis / 90 <= 4) { //console.log("양수3333"); targetPosition.x =
		 * targetPosition.x + 10; maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 270, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:270, z:0}); } else { //
		 * console.log("양수4444"); targetPosition.z = targetPosition.z - 10;
		 * maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 0, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:0, z:0}); } } else {
		 * //console.log("음수음수"); yAxis = (targetRotation.y * -1) //양수화
		 * 
		 * if (yAxis < 360) { yAxis = parseFloat(yAxis % 360).toFixed(2);
		 * //console.log("음수 : "+ yAxis); } //console.log("음수1111 : "+
		 * yAxis/90); if (yAxis / 90 >= 1 && yAxis / 90 <= 2) {
		 * //console.log("음수1111"); targetPosition.x = targetPosition.x + 10;
		 * maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 270, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:270, z:0}); } else if (yAxis / 90 >=
		 * 2 && yAxis / 90 <= 3) { //console.log("음수2222"); targetPosition.z =
		 * targetPosition.z + 10; maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 180, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:180, z:0}); } else if (yAxis / 90 >=
		 * 3 && yAxis / 90 <= 4) { //console.log("음수3333"); targetPosition.x =
		 * targetPosition.x - 10; maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 90, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:90, z:0}); } else {
		 * //console.log("음수4444"); targetPosition.z = targetPosition.z - 10;
		 * maxUtils.setPosition(obj, targetPosition);
		 * obj.setAttribute("rotation", {x: 0, y: 0, z: 0});
		 * //maxUtils.setRotation(obj, {x:0, y:0, z:0}); } }
		 */
    },
    // 20181001 수정
    lookAtSet: function (sourceObjectName, targetObjectName, heading, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('look-at', {targetId: targetObjectName, heading: heading});
    }
    /**
     * 카메라 보는 방향에 맞추어 회전변경
     *
     * @param1 : 자기자신 object
     * @param2 : 타겟 아이디
     */
    // 20181001 수정
    ,
    synchroRotation(id, targetId, correction) {
        var obj = maxUtils.findObject(id, "", "");
        var target = maxUtils.findObject(targetId, "", "");
        var targetRotation = maxUtils.getRotation(target);
        var yAxis = targetRotation.y + correction;

        obj.setAttribute("rotation", {x: 0, y: yAxis, z: 0});
    },
    // 20181001 수정
    synchroRotationSet: function (sourceObjectName, targetObjectName, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('synchro-rotation', {targetId: targetObjectName});
    },
    /**
     * 방향 스피드로 이동한다.
     *
     * @param2 : 해당 object
     * @param2 : direction 방향
     * @param3 : speed 속도
     * @param4 : deltaTime 델타타임
     */
    // 20181001 수정
    directionMove: function (id, direction, speed, deltaTime, sourceEl, eventId) {

        var vec3 = null;

        switch (direction) {
            case 'forward'  :
                vec3 = new THREE.Vector3(0, 0, -speed);
                break;
            case 'backward' :
                vec3 = new THREE.Vector3(0, 0, speed);
                break;
            case 'left' :
                vec3 = new THREE.Vector3(-speed, 0, 0);
                break;
            case 'right' :
                vec3 = new THREE.Vector3(speed, 0, 0);
                break;
            case 'up' :
                vec3 = new THREE.Vector3(0, speed, 0);
                break;
            case 'down' :
                vec3 = new THREE.Vector3(0, -speed, 0);
                break;
        }

        maxUtils.translateVector(id, vec3, deltaTime, sourceEl, eventId);
    },
    /**
     * @param1 : origin(object)
     * @param2 : startPosition(vec3)
     * @param3 : endPosition(vec3)
     * @param4 : heading(카메라 머리 위치)
     * @param5 : deltaTime
     * @param6 : speed
     * @param7 : dialogId
     */
    // 20181001 수정
    locationMove: function (origin, startPosition, endPosition, heading, speed, deltaTime) {

        var originPosition = maxUtils.getWorldPosition(origin);
        var position = new Vector3(maxUtils.minusFloat(endPosition.x, startPosition.x) / speed, 0, maxUtils.minusFloat(endPosition.z, startPosition.z) / speed);

        maxUtils.transVector(origin.id, position, deltaTime, "", "");

        if (originPosition.distanceTo(endPosition) < maxUtils.sumFloat(heading, 1) && originPosition.distanceTo(endPosition) > maxUtils.minusFloat(heading, 1)) {
            if (origin.hasAttribute('animation-mixer')) {
                origin.setAttribute('animation-mixer', 'clip', 'idle');
            }
            // 보정
            origin.setAttribute('position', endPosition);
            origin.setAttribute('location-move', 'isTick', false);
        }
    },
    // 20181001 수정
    locationMoveSet: function (sourceObjectName, targetObjectName, speed, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        // console.log("들어왔다! : " + typeof obj + " / target : " +
        // targetObjectName);
        obj.setAttribute('location-move', {targetId: targetObjectName, speed: speed});
        // console.log("location-move : " +
        // obj.getAttribute('location-move').targetId);
    },
    // 20181001 수정
    locationPointSet: function (sourceObjectName, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('location-point', ' ');
    }
    // 20181001 추가
    ,
    setAnimation: function (id, animation, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('animation-mixer', 'clip', animation);
    },

    // 20181002 추가
    cameraChange: function (origin, startPosition, target, speed, deltaTime) {

        var originPosition = maxUtils.getWorldPosition(origin);
        var endPosition = maxUtils.getWorldPosition(target);

        var position = new Vector3(maxUtils.minusFloat(endPosition.x, startPosition.x) / speed, 0, maxUtils.minusFloat(endPosition.z, startPosition.z) / speed);

        maxUtils.transVector(origin.id, position, deltaTime, "", "");

        if (originPosition.distanceTo(endPosition) < maxUtils.sumFloat(1) && originPosition.distanceTo(endPosition) > maxUtils.minusFloat(1)) {

            origin.object3D.worldToLocal(startPosition);// 원래 위치로 원복
            // origin.setAttribute('position', startPosition); //원래 위치로 원복
            origin.setAttribute('camera-change', 'isTick', false);
            // target.
        }
    },
    // 20181002 추가
    cameraChangeSet: function (sourceObjectName, targetObjectName, speed, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        // console.log("들어왔다! : " + typeof obj + " / target : " +
        // targetObjectName);
        obj.setAttribute('camera-change', {targetId: targetObjectName, speed: speed});
        // console.log("camera-change : " +
        // obj.getAttribute('camera-change').targetId);
    },
    // 아래부터 20181008 추가

    textAnimation: function (sourceObjectName, textSize, time, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('text-animation', {textSize: textSize, time: time});
    },

    /*
	 * positionAnimationSet: function (sourceObjectName, targetId, speed,
	 * heading, sourceEl, eventId) { var obj =
	 * maxUtils.findObject(sourceObjectName, sourceEl, eventId); var target =
	 * maxUtils.findObject(targetId, "", ""); var targetPosition =
	 * maxUtils.getWorldPosition(target); var targets = targetPosition.x + " " +
	 * (targetPosition.y + heading) + " " + targetPosition.z; var dur = speed *
	 * 1000 + "";
	 * 
	 * var animation = document.createElement("a-animation"); var moveName =
	 * maxUtils.getUniqueId("animation"); animation.setAttribute("id",
	 * moveName); animation.setAttribute("attribute", "position");
	 * animation.setAttribute("to", targets); animation.setAttribute("dur",
	 * dur); animation.setAttribute("easing", "linear");
	 * obj.appendChild(animation); return moveName },
	 */

    positionAnimationSet: function (sourceObjectName, targetId, speed, heading, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        var targetPosition = maxUtils.getPosition(targetId, "", "");
        var targets = targetPosition.x + " " + (targetPosition.y + heading) + " " + targetPosition.z;
        var dur = speed * 1000 + "";
        obj.setAttribute("animation__position", {property: "position", to: targets, dur: dur, easing: "linear"});
    },

    positionDistanceTo: function (sourceObjectName, targetId, heading, sourceEl, eventId) {
        var source = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        var sourcePosition = maxUtils.getWorldPosition(source);
        var target = maxUtils.findObject(targetId, sourceEl, eventId);
        var targetPosition = maxUtils.getWorldPosition(target);
        targetPosition.y = targetPosition.y + heading;
        var distance = sourcePosition.distanceTo(targetPosition);
        return distance;
    },

    getArrayCountData: function (id, componentName, propertyName, count, sourceEl, eventId) {
        // 해당 컴포넌트의 property에서 가져온다. 값을
        var before = maxUtils.getProperty(id, componentName, propertyName, sourceEl, eventId);
        var sliceData = before.split(";");
        var result = sliceData[count];
        return result;
    },
    // 수정해서 사용해야함.
    rotationAnimationSet: function (sourceObjectName, degree, time, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        var before = maxUtils.getRotation(sourceObjectName, sourceEl, eventId);
        var test = degree.split(" ");
        var positions = {x: before.x + test[0], y: before + test[1], z: before + test[2]}
        var dur = time * 1000 + "";
        obj.setAttribute("animation__rotation", {property: "rotation", dur: dur, easing: "linear", to: positions});
    },
    rotationTranslate: function (sourceObjectName, degree, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        var rotation = degree.split(" ");
        maxUtils.transRotate(obj, {x: parseFloat(rotation[0]), y: parseFloat(rotation[1]), z: parseFloat(rotation[2])});
    },
    getNextValue: function (currentValue, array) {
        // 현재 값의 인덱스 구하기
        var valueArray = array.split(";");
        var currentIndex = 0;
        for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] == currentValue) {
                currentIndex = i;
                break;
            }
        }

        var nextIndex = 0;
        // 다음 값 찾기
        if (valueArray.length > (currentIndex + 1)) {
            nextIndex++;
        }
        return valueArray[nextIndex];
    }
    ,
    attachBuilding: function (boardId, targetId, vec3) {
        var board = maxUtils.findObject(boardId, "", "");
        var target = maxUtils.findObject(targetId, "", "");
        var pos = vec3.split(" ");

        var result = target.cloneNode(true);
        result.setAttribute('id', maxUtils.getUniqueId(targetId));
        result.setAttribute('visible', true);
        result.setAttribute('position', {x: pos[0], y: pos[1], z: pos[2]});
        board.appendChild(result);
    }

    ,
    getThreeVector3ByArray: function (vec) {
        if (vec instanceof Array) {
            switch (vec.length) {
                case 0 :
                    return null;
                case 1 :
                    return new THREE.Vector3(vec[0].toString() * 1, 0, 0);
                case 2 :
                    return new THREE.Vector3(vec[0].toString() * 1, vec[1].toString() * 1, 0);
                // case 3 : return new THREE.Vector3(vec[0], vec[1], vec[2]);
                default :
                    return new THREE.Vector3(vec[0].toString() * 1, vec[1].toString() * 1, vec[2].toString() * 1);
            }
        }
        return null;
    }


    ,
    getThreeVector3: function (vec) {
        if (vec instanceof THREE.Vector3) {
            return vec;
        } else {
            var type = this.getType(vec);
            // console.log(type);
            if (type == "String") {

                if (vec.indexOf(",") > -1) {
                    var a1 = vec.split(",");
                    // console.log(a1);
                    if (a1.length != undefined && a1.length > 0) {
                        return this.getThreeVector3ByArray(a1);
                    }
                    return null;
                } else {
                    var a2 = vec.split(" ");
                    // console.log(a2);
                    if (a2.length != undefined && a2.length > 0) {
                        return this.getThreeVector3ByArray(a2);
                    }
                    return null;
                }

            } else {

                if (vec instanceof Map || vec instanceof Object) {
                    if (vec.x instanceof Number) {
                        return new THREE.Vector3(vec.x, vec.y, vec.z);
                    } else {
                        try {
                            return new THREE.Vector3(vec.x.toString().trim() * 1, vec.y.toString().trim() * 1, vec.z.toString().trim() * 1);
                        } catch (e) {
                            return null;
                        }
                    }
                } else if (vec instanceof Array) {
                    return this.getThreeVector3ByArray(vec);
                }
            }
        }
        return null;
    }

    ,
    getType: function (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }
    // Entity 생성
    ,
    CreateEnitity: function (id, visible, position, scale, rotation) {
        if (id == "") id = "creates";
        var uid = maxUtils.getUniqueId(id);
        var el = document.createElement('a-entity');
        el.setAttribute("visible", "false");
        el.setAttribute("id", uid);
        el.setAttribute("position", position);
        el.setAttribute("scale", scale);
        el.setAttribute("rotation", rotation);
        el.setAttribute("material", {color: "#ff8000"});
        //
        // //geometry="primitive:cylinder"
        // el.setAttribute('geometry', {primitive: 'cylinder', width:
        // size.width, height: size.height, depth: size.depth});
        el.setAttribute('geometry', {primitive: 'cylinder'});
        // el.setAttribute("geometry", {primitive:"cylinder"});
        //
        el.setAttribute("visible", visible);


        // el.parentNode.appendChild(el);
        // document.querySelector("#plane").appendChild(el);
        document.querySelector("#uiarea").appendChild(el);

        return el.getAttribute("id");
    }
    //변환
    // , Transform : function(objectName, direction, startPosition, endPosition, duration, scale, rotation, alpha, color, isSync, sourceEl, eventId, listenerName) {
    ,
    Transform: function (objectName, endPosition, duration, scale, rotation, alpha, color, sourceEl, eventId, listenerName) {

        var el = maxUtils.findObject(objectName, sourceEl, eventId);

        console.log("들어오는 id : " + el.id);

        if(endPosition == "" || endPosition == null || endPosition == undefined) {
            endPosition = el.getAttribute("position");
        }

        if(rotation == "" || rotation == null || rotation == undefined) {
            rotation = el.getAttribute("rotation");
        }

        if(scale == "" || scale == null || scale == undefined) {
            scale = el.getAttribute("scale");
        }

        if(color == "" || color == null || color == undefined) {
            if(el.hasAttribute('material')){
                color = el.getAttribute("material", "color").color;
            }else if(el.hasAttribute('light')){
                color = el.getAttribute("light", "color").color;
            }else{
                color = "#ffffff";
            }
        }
        //20181112 수정
        if (listenerName != "") {
            el.setAttribute("transform-cp", {
                objectName: el.id,
                endPosition: endPosition,
                sec: duration,
                endScale: scale,
                endRotation: rotation,
                endAlpha: alpha,
                endColor: color,
                isSync: true,
                listenerName: listenerName
            });
        } else {
            el.setAttribute("transform-cp", {
                objectName: el.id,
                endPosition: endPosition,
                sec: duration,
                endScale: scale,
                endRotation: rotation,
                endAlpha: alpha,
                endColor: color,
                isSync: true
            });
        }
    }
    // 특정 clip 찾기
    ,
    FindComplexObjectSrc: function (id, clip) {
        var src = "";
        try {
            var _tmp;
            for (var i = 0; i < _ComplexObjectList.length; i++) {
                var obj = _ComplexObjectList[i];
                if (obj.id == id) {
                    _tmp = obj;
                    break;
                }
            }

            if (_tmp) {
                if (_tmp.clip != undefined && _tmp.clip.length != undefined) {
                    for (var i = 0; i < _tmp.clip.length; i++) {
                        var arr = _tmp.clip[i];
                        if (arr.clip == clip) {
                            src = arr.src;
                            break;
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        return src;
    }
    // animation 실행
    ,
    animationPlay: function (target, position, clip, isSync, el, targetId) {

        // target 값이 없으면 this 설정
        if ((target == "" || target == undefined || target == null)) {
            target = "this";
            console.log("target : " + target);
        }
        el = maxUtils.findObject(target, el, targetId);
        let isRemove = false;
        if (el.hasAttribute('complex-object')) {
            isRemove = true;
        }

        KEvent.addEventListener("animation-finished", function (event) {
            if (isRemove) {
                el.setAttribute('visible', false);
                el.removeAttribute('animation-mixer');
            }
        });

        // console.log("my Id ~! : " + el.id);
        // localPosition 가져와서
        // console.log("position : " + position + " type : " + typeof position);

        // position 값이 잇으면 element에 position 설정
        let x = 0;
        let y = 0;
        let z = 0;
        if (position == "" || position == null || position == undefined) {
            position = el.getAttribute('position');
            x = position.x;
            y = position.y;
            z = position.z;
        } else {
            let tmp = position.split(" ");
            if (tmp != null && tmp != undefined && tmp.length != undefined) {
                x = tmp[0];
                y = tmp[1];
                z = tmp[2];
            }
        }

        console.log("position x : " + x + " position y : " + y + " position z : " + z);
        el.setAttribute('position', {x: x, y: y, z: z});
        console.log("clip : " + clip);

        if (el.hasAttribute('animation-mixer')) {
            el.removeAttribute('animation-mixer');
        }

        if (el.hasAttribute('complex-object')) {
            var id = el.getAttribute('complex-object').id;
            var src = maxUtils.FindComplexObjectSrc(id, clip);
            console.log("src : " + src);
            el.setAttribute('gltf-model', src);
            el.setAttribute('visible', true);
            el.setAttribute('animation-mixer', {clip: '*', loop: 'once'});
        } else {
            el.setAttribute('visible', true);
            el.setAttribute('animation-mixer', {clip: clip, loop: 'repeat'});
        }
    }

    ,
    getObjectList() {
        var entityList = document.querySelectorAll('a-entity');
        var arr = [];
        var id = [];

        for (var i = 0, n; n = entityList[i]; ++i) {
            arr.push(n)
        }
        ;

        for (var i = 0; i < arr.length; i++) {
            id.push(arr[i].id);
        }
        return id;
    }

    ,
    getComponenList(id) {
        var el = document.querySelector("#" + id);
        var componentList = [];
        for (var key in el.components) {
            for (var i = 0; i < CustomComponentList.length; i++) {
                var cmp = CustomComponentList[i];
                if (key == cmp.componentName) {
                    componentList.push(key);
                }
            }
        }
        return componentList;
    }

    ,
    getSchemaList(componentName) {
        var component;
        var exist = false;
        for (var i = 0; i < CustomComponentList.length; i++) {
            var cp = CustomComponentList[i];
            if (cp.componentName == componentName) {
                component = CustomComponentList[i];
                exist = true;
                break;
            }
        }


        if (exist) {
            // console.log("schema ::::::::::::::::: ",
            // component.dataJs.schema);
            return component.dataJs.schema;
        } else {
            return null;
        }
    }

    ,
    SetValueInt: function (id, componentName, property, value, sourceEl, eventId) {
        // var obj = maxUtils.findObject(id, sourceEl, eventId);
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (typeof value === "string") {
            eval(obj.id + ".setAttribute(\"" + componentName + "\",{" + property + ": \"" + value + "\"});");
        } else {
            eval(obj.id + ".setAttribute(\"" + componentName + "\",{" + property + ": " + value + "});");
        }
    }

    ,
    showToastMessage: function (message, color) {
        console.log(":::::::::::::::::::::");
        //text 커지는 현상..
        //system-ui가 미리 있을때 안되는 이유?
        var id = "toast";
        var uid = maxUtils.getUniqueId(id);
        var el = document.createElement('a-entity');
        //el.setAttribute("visible", "false");
        el.setAttribute("id", uid);
        el.setAttribute("position", "0 0 1");
        el.setAttribute("scale", "5 5 5");
        el.setAttribute("text", {align: "center", value: message, color: color, zOffset: 0.1});
        el.setAttribute("material", "");
        el.setAttribute("mxt-toast-message-cp", {message: message, color: color});
        el.setAttribute("visible", "true");

        // 시스템 ui는 항상 fix 된 값을 가지고 있어서 사용자가 수정, 삭제 가 안된다.
        // 시스템 ui가 있으면 appendChild, 아니면 생성 해준다.

        var system = document.querySelector("#system-ui-test");
        //console.log("system dfsdfds : " + system.id);
        if ((system == null || system == undefined)) {

            // system-ui 가 없을 경우
            // active 한 값을 가진 카메라 자식으로 붙인다.
            var entities = document.querySelectorAll('a-entity[camera]');

            var main = null;
            console.log("entities : " + entities);
            entities.forEach(function (value, index, array1) {
                console.log("value : " + value);
                if (value.getAttribute('camera').active) {
                    main = value;
                    // console.log("main : " + main.id);
                }
            });
            console.log("main : " + main.id);
            var sys = document.createElement('a-entity');
            //sys.setAttribute("visible", "false");
            sys.setAttribute("id", "system-ui-test");
            sys.setAttribute("geometry", {primitive: "box", depth: 0.01});
            sys.setAttribute("material", {opacity: 0});
            sys.setAttribute("scale", "50 50 50");
            sys.setAttribute("position", "0 1 -5");
            sys.setAttribute("visible", "true");
            main.appendChild(sys);
            sys.appendChild(el);
            console.log("없을때: ");
        } else {
            console.log("있을때 : ");
            console.log("111 : " + system.id);
            console.log("toast message show2222::::::", el);
            el.setAttribute("position", "0 1 -5");
            system.appendChild(el);
            //생성 되는데 보이질 않는다.
            //위치조정하니 보인다.
        }
        //console.log("toast message show::::::", el);
    }

    ,
    Sleep: function (time, sourceEl, eventId, listenerName) {
        var el = maxUtils.findObject("this", sourceEl, eventId);
        if (listenerName != "") {
            el.setAttribute("mxt-sleep-cp", {time: time, listenerName: listenerName});
            // } else {
            //     el.setAttribute("transform-cp", {objectName:objectName, direction:direction, start:startPosition, end:endPosition, sec:duration, scale:scale, rotation:rotation, alpha:alpha, color:color ,isSync:isSync });
        }
    }
    ,
    _selectedEntity: null
    ,
    setSelectedEntity: function (entity) {
        this._selectedEntity = entity;
    }
    ,
    getSelectedEntity: function (entity) {
        return this._selectedEntity;
    }

    ,
    replaceAll: function (str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    ,
    getCurrentSceneData: function () {
        var str = _AssetObject_.getSceneTag(document.querySelector("a-scene"));
        var str1 = str.substring(0, str.indexOf("<canvas"));
        var str2 = str.substring(str.indexOf("</canvas>") + 9, str.length);
        str = str1 + str2;
        str = str.replace("active:false", "active:true");
        return str;
    }
    ,
    rgb2hex: function (red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
    }
    ,
    hex2rgb: function (hex) {
        var r;
        r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (r) {
            return r.slice(1, 4).map(function (x) {
                return parseInt(x, 16);
            });
        }
        //console.log("r1 : " + r );
        // short version
        r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (r) {
            return r.slice(1, 4).map(function (x) {
                return 0x11 * parseInt(x, 16);
            });
        }
        //console.log("r2 : " + r );
        return null;
    }

    ,
    ExpressionIntToBool: function (source, target, expression) {
        if (expression == ">") {
            if (source > target) return true; else return false;
        } else if (expression == "<") {
            if (source < target) return true; else return false;
        } else if (expression == "==") {
            if (source == target) return true; else return false;
        } else if (expression == "!=") {
            if (source != target) return true; else return false;
        }
        return false;
    }
    ,
    ExpressionIntToInt: function (source, target, expression) {
        if (expression == "+") {
            return parseInt(source * 1 + target * 1);
        } else if (expression == "-") {
            return parseInt(source * 1 - target * 1);
        } else if (expression == "*") {
            return parseInt(source * 1 * target * 1);
        } else if (expression == "/") {
            return parseInt(source * 1 / target * 1);
        } else if (expression =="%"){
            return parseInt(source *1 % target *1);
        }
        return 0;
    }

    ,
    ExpressionStringToString: function (source, target, expression) {
        if (expression == "+>") {
            return parseInt(source + target);
        } else if (expression == "-") {
            return parseInt(source - target);
        } else if (expression == "*") {
            return parseInt(source * target);
        } else if (expression == "/") {
            return parseInt(source / target);
        }
        return 0;
    }

    ,
    ExpressionStringToBool: function (source, target, expression) {

        if (expression == "==") {
            if (source == target) return true; else return false;
        } else if (expression == "!=") {
            if (source != target) return true; else return false;
        }
        return false;
    }
    ,
    Contains: function (source, target) {
        console.log("contains source :::::::::::", source);
        console.log("contains target :::::::::::", target);
        var exist = false;
        try {
            var arr = source.split(",");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == target) {
                    exist = true;
                    break;
                }
            }
        } catch (e) {
        }

        console.log("contains : ", exist);

        return exist;
    }

    ,
    FindArray: function (source, target) {
        try {
            // for(var i = 0; i < source.length; i++) {
            //     if(source[i] == target) {
            //         exist = true;
            //         break;
            //     }
            // }
            var arr = source.split(",");
            return arr[target];

        } catch (e) {
        }

        return "";
    }
    ,
    FindPosition: function (id, sourceEl, targetId) {
        var el = maxUtils.findObject(id, sourceEl, targetId);
        try {
            return el.getAttribute("position");
        } catch (e) {
        }
        return "0 0 0";
    }
    ,
    FindRotation: function (id, sourceEl, targetId) {
        var el = maxUtils.findObject(id, sourceEl, targetId);
        try {
            return el.getAttribute("rotation");
        } catch (e) {
        }
        return "0 0 0";
    }
    ,
    SetString: function (val) {
        return val;
    }

    ,
    ExpressionVectorReturnString: function (source, target, expression) {

        if (source == "") {
            return "0 0 0";
        }

        if (target == "") {
            return "0 0 0";
        }

        console.log(source);
        console.log(typeof source);
        this.getType(source);
        console.log(target);


        var sources = "";
        if (this.getType(source) == "Object") {
            sources = new Array();
            sources[0] = source.x;
            sources[1] = source.y;
            sources[2] = source.z;
        } else {
            sources = source.split(" ");
        }

        var targets = target.split(" ");

        try {
            if (sources.length == 3 && targets.length == 3) {
                if (expression == "+") {
                    var x = sources[0] * 1 + targets[0] * 1;
                    var y = sources[1] * 1 + targets[1] * 1;
                    var z = sources[2] * 1 + targets[2] * 1;
                    return x + " " + y + " " + z;
                } else if (expression == "-") {
                    var x = sources[0] * 1 - targets[0] * 1;
                    var y = sources[1] * 1 - targets[1] * 1;
                    var z = sources[2] * 1 - targets[2] * 1;
                    return x + " " + y + " " + z;
                } else if (expression == "/") {
                    var x = sources[0] * 1 / targets[0] * 1;
                    var y = sources[1] * 1 / targets[1] * 1;
                    var z = sources[2] * 1 / targets[2] * 1;
                    return x + " " + y + " " + z;
                } else if (expression == "*") {
                    var x = sources[0] * 1 * targets[0] * 1;
                    var y = sources[1] * 1 * targets[1] * 1;
                    var z = sources[2] * 1 * targets[2] * 1;
                    return x + " " + y + " " + z;
                }
            }
        } catch (e) {
        }
        return "";
    }
    ,
    Set3DText: function (id, text, color, sourceEl, targetId) {
        try {
            // console.log(":::: Set3DText ::::: ", id, " ::::: text ::::", text);
            var el = this.findObject(id, sourceEl, targetId);

            // console.log("el.getAttribute(\"text-geometry\").value", el.getAttribute("text-geometry").value);
            el.setAttribute("text-geometry", {value: text});
            if (color != "") {
                el.setAttribute("material", {color: color});
            }
            // console.log("el.getAttribute(\"text-geometry\").value", el.getAttribute("text-geometry").value);

        } catch (e) {
            console.log(e);
        }
    }

    ,
    Get3DText: function (id, sourceEl, targetId) {

        try {
            var el = this.findObject(id, sourceEl, targetId);
            var txt = el.getAttribute("text-geometry").value;

            console.log(":::: Get3DText ::::: ", id, " ::::: text ::::", txt);

            return txt;
        } catch (e) {
        }
        return "";

    }
    ,
    StringToInteger: function (val) {
        try {
            val = val.trim();
            if (val.indexOf(",")) {
                var t = val.split(",");
                var tt = "";
                for (var x = 0; x < t.length; x++) {
                    tt += t[x].trim();
                }
                return tt * 1;
            }
        } catch (e) {
        }
        return 0;
    }

    ,
    EffectMoney: function (id, end, sourceEl, tagetId) {

        if (id == "") id = "creates";
        var uid = maxUtils.getUniqueId(id);
        var el = document.createElement('a-entity');
        el.setAttribute("visible", "false");
        el.setAttribute("id", uid);
        el.setAttribute("position", "0 0 0");
        el.setAttribute("scale", "10 1 10");
        el.setAttribute("material", {color: "#FFD700"});
        el.setAttribute('geometry', {primitive: 'cylinder'});
        el.setAttribute("mxt-effect-cp", {
            objectName: el.id,
            start: "0 0 0",
            scale: "10 1 10",
            end: end,
            rotation: "1500 1500 1500",
            sec: 1.0,
            alpha: 0,
            isPosition: true,
            isScale: false,
            isRotation: true,
            isColor: false
        });
        // el.setAttribute("visible", "true");
        document.querySelector("#uiarea").appendChild(el);


    }

    /**
     * parameter1 : vec3
     * parameter2 : vec3
     * parameter3 : totalTime (sec)
     * parameter4 : currentTime(sec)
     * return : vec3
     * */
    ,
    constant: function (start, end, currentTime, totalTime) {

        if (totalTime - currentTime <= 0.020) {
            return end;
        }

        var result = 0;
        if (start === end) {
            result = end - start;
        } else {
            result = (end - start) * currentTime / totalTime;
            if (maxUtils.abs(result) > maxUtils.abs(start - end)) {
                result = end - start;
            }
        }
        result = result + start;

        return result;
    },
    /**
     * parameter1 : vec3
     * parameter2 : vec3
     * parameter3 : totalTime (sec)
     * parameter4 : currentTime(sec)
     * return : vec3
     * */
    vectorConstant: function (start, end, currentTime, totalTime) {

        if (totalTime - currentTime <= 0.020) {
            return end;
        }

        var result = new Vector3();
        var x;
        if (start.x === end.x) {
            x = end.x - start.x;
            //x = end.x;
        } else {
            x = (end.x - start.x) * currentTime / totalTime;
            if (maxUtils.abs(x) > maxUtils.abs(start.x - end.x)) {
                x = end.x - start.x;
            }
        }

        var y;
        if (start.y === end.y) {
            y = end.y - start.y;
        } else {
            y = (end.y - start.y) * currentTime / totalTime;
            if (maxUtils.abs(y) > maxUtils.abs(start.y - end.y)) {
                y = end.y - start.y;
            }
        }

        var z;
        if (start.z === end.z) {
            z = end.z - start.z;
            //z = end.z;
        } else {
            z = (end.z - start.z) * currentTime / totalTime;
            if (maxUtils.abs(z) > maxUtils.abs(start.z - end.z)) {
                z = end.z - start.z;
            }
        }

        result.x = x + start.x;
        result.y = y + start.y;
        result.z = z + start.z;

        return result;
    },
    /**
     * parameter1 : vec3
     * parameter2 : vec3
     * parameter3 : totalTime (sec)
     * parameter4 : currentTime(sec)
     * return : vec3
     * */
    colorConstant: function (startColor, endColor, currentTime, totalTime) {

        var startRgb;
        if(startColor != null) {
            // inspector 버그로 컬러값 7자리 나올때도 있습니다.
            var colorLength = String(startColor).length;
            if(colorLength > 7){
                startColor = startColor.substr( 0, 7 );
            }
            startRgb = maxUtils.hex2rgb(startColor);
            //console.log("this color :" + this.data.color);
        }else{
            startRgb = maxUtils.hex2rgb("#FFFFFF");
        }

        var endRgb;

        if(endColor != null) {
            // inspector 버그로 컬러값 7자리 나올때도 있습니다.
            var colorLength = String(endColor).length;
            if(colorLength > 7){
                endColor = endColor.substr( 0, 7 );
            }
            endRgb = maxUtils.hex2rgb(endColor);
            //console.log("this color :" + this.data.color);
        }else{
            endRgb = maxUtils.hex2rgb("#FFFFFF");
        }


        var start = new Vector3();
        start.x = startRgb[0];
        start.y = startRgb[1];
        start.z = startRgb[2];

        var end = new Vector3();
        end.x = endRgb[0];
        end.y = endRgb[1];
        end.z = endRgb[2];

        if (totalTime - currentTime <= 0.020) {
            var end = maxUtils.rgb2hex(endRgb[0] , endRgb[1], endRgb[2]);
            return end;
        }


        var result = new Vector3();
        var x;
        if (start.x === end.x) {
            x = end.x - start.x;
            //x = end.x;
        } else {
            x = (end.x - start.x) * currentTime / totalTime;
            if (maxUtils.abs(x) > maxUtils.abs(start.x - end.x)) {
                x = end.x - start.x;
            }
        }

        var y;
        if (start.y === end.y) {
            y = end.y - start.y;
        } else {
            y = (end.y - start.y) * currentTime / totalTime;
            if (maxUtils.abs(y) > maxUtils.abs(start.y - end.y)) {
                y = end.y - start.y;
            }
        }

        var z;
        if (start.z === end.z) {
            z = end.z - start.z;
        } else {
            z = (end.z - start.z) * currentTime / totalTime;
            if (maxUtils.abs(z) > maxUtils.abs(start.z - end.z)) {
                z = end.z - start.z;
            }
        }

        result.x = x + start.x;
        result.y = y + start.y;
        result.z = z + start.z;

        var resultHex = maxUtils.rgb2hex(result.x , result.y, result.z);

        return resultHex;
    },
    getMyId : function(str , el, target){
        var obj = maxUtils.findObject(str, el, target);
        return obj.id;
    }
    ,
    consoleLog : function(title, value){
        console.log(title + " : " + value);
    }
    ,
    ExpressionIntegerToVector: function (source, target, expression) {

        if((source =="" || source == undefined || source == null)){
            if (expression == "+") {
                source = 0;
            } else if (expression == "-") {
                source = 0;
            } else if (expression == "*") {
                source = 1;
            } else if (expression == "/") {
                source = 1;
            } else if (expression =="%"){
                source = 1;
            }
        }


        var targets = "";
        if (this.getType(target) == "Object") {
            targets = new Array();
            targets[0] = target.x;
            targets[1] = target.y;
            targets[2] = target.z;
        } else {
            targets = target.split(" ");
        }

        try {
            if (targets.length == 3) {
                if (expression == "+") {
                    var x = (source * 1) + (targets[0] * 1);
                    var y = (source * 1) + (targets[1] * 1);
                    var z = (source * 1) + (targets[2] * 1);
                    return x + " " + y + " " + z;
                } else if (expression == "-") {
                    var x = (targets[0] * 1) - (source * 1);
                    var y = (targets[1] * 1) - (source * 1);
                    var z = (targets[2] * 1) - (source * 1);
                    return x + " " + y + " " + z;
                } else if (expression == "/") {
                    var x = (targets[0] * 1) / (source * 1);
                    var y = (targets[1] * 1) / (source * 1);
                    var z = (targets[2] * 1) / (source * 1);
                    return x + " " + y + " " + z;
                } else if (expression == "*") {
                    var x = (source * 1) * (targets[0] * 1);
                    var y = (source * 1) * (targets[1] * 1);
                    var z = (source * 1) * (targets[2] * 1);
                    return x + " " + y + " " + z;
                } else if (expression == "%"){
                    var x = (targets[0] * 1) % (source * 1);
                    var y = (targets[1] * 1) % (source * 1);
                    var z = (targets[2] * 1) % (source * 1);
                    return x + " " + y + " " + z;
                }
            }
        } catch (e) {
        }
        return "0 0 0";
    }
    , getSplitLength(targetValue, splitValue){
        var result = 0;
        if((splitValue =="" || splitValue == splitValue || splitValue == null)){
            splitValue =",";
        }
        try {
            var array = targetValue.split(splitValue);
            result = array.length;
            //result = result.trim();
        }catch (e){
            console.log("getSplitLength error : " + e);
        }
        return result;
    }
    , getSplitValue(targetValue, splitValue, index){
        var result = "";
        if((index =="" || index == undefined || index == null)){
            index = 0;
        }else{
            index = index-1;
        }
        if((splitValue =="" || splitValue == splitValue || splitValue == null)){
            splitValue =",";
        }
        try {
            var array = targetValue.split(splitValue);
            result = array[index];
        }catch (e){
            console.log("getSplitValue error : " + e);
        }
        return result;
    }
    , setSplitValue(targetValue, splitValue, index, setValue){
        var result = "";
        if((index =="" || index == undefined || index == null)){
            index = 0;
        }else{
            index = index-1;
        }
        if((splitValue =="" || splitValue == splitValue || splitValue == null)){
            splitValue =",";
        }
        try {
            var array = targetValue.split(splitValue);
            array[index] = setValue;
            console.log("index : " + array[index]);
            for(var i = 0; i < array.length; i++){
                console.log(" index : " + i);
                if(i == (array.length-1)){
                    result = result + array[i];
                }else{
                    result = result + array[i] +",";
                }
            }
            console.log("result : " + result);
        }catch (e){
            console.log("setSplitValue error : " + e);
        }
        return result;
    }
    , vectorToString(vector){

        try {
            if (this.getType(vector) == "Object") {
                return vector.x + " " + vector.y + " " + vector.z;
            } else {
                var target = vector.split(" ");
                return target[0]+" "+target[1]+" "+target[2];
            }
        }catch(e){
            console.log("vectorToString error : " + e);
        }
        return "0 0 0"
    }
};
