maxUtils = {
    //20181001 확인 후 미수정
    branch: function (boolean) {
        return boolean;
    },
    //20181001 확인 후 미수정
    contain: function (source, target) {
        var result = false;
        var target = target.split(";");

        for (var i = 0; i < target.length; i++) {
            //console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if (target[i].trim() == source) {
                result = true;
            }
        }
        //console.log("khan result : " + result);
        return result;
    },
    //20181001 확인 후 미수정
    intToString: function (num) {
        return num.toString();
    },
    //20181001 수정
    findObject: function (id , sourceEl, eventId) {
        var obj;
        if (id == "this") {
            if (sourceEl != null && sourceEl != '' && sourceEl != 'undefined') {
                obj = sourceEl;
            } else if (eventId != null && eventId != '' && eventId != 'undefined') {
                obj = document.querySelector("#" + eventId);
            }
        } else {
            //console.log("dfdfdfdf : " + id +" / type : " + typeof id);
            obj = document.querySelector("#"+id);
        }
        return obj
    },

    //20181001 수정
    setVisible: function (id, value, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute("visible", value);
    },
    //20181001 수정
    getProperty: function (id, componentName, property, sourceEl, eventId) {
        //콘솔창 루프 도는 것처럼 보이는 것은 다른 곳에서 사용하고 있는게 있기 때문이다.
        //console.log(obj + ".getAttribute(" + componentName + ")." + property + ";");

        //var obj = maxUtils.findObject(id, sourceEl, eventId);

        var result = eval(id + ".getAttribute(\"" + componentName + "\")." + property + ";");

        //console.log("khan getProperty : " + result +" type : " + typeof result +" componentName : "+ componentName );
        return result;
    },
    //20181001 수정
    setProperty: function (id, componentName, property, value, sourceEl, eventId) {
        //var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (typeof value === "string") {
            eval(id + ".setAttribute(\"" + componentName + "\",{" + property + ": \"" + value + "\"});");
        } else {
            eval(id + ".setAttribute(\"" + componentName + "\",{" + property + ": " + value + "});");
        }
    },
    //20181001 수정
    getText: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var result = obj.getAttribute("text", "value");
        return result;
    },
    //20181001 수정
    setText: function (id, value, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute("text", "value", value);
    },
    //20181001 확인 후 미수정
    compare: function (source, target) {
        var result = false;
        if (source === target) {
            result = true;
        }
        return result;
    },
    //20181001 확인 후 미수정
    random: function (a, b) {
        var num = Math.floor(Math.random() * b);
        return (num % b) + a;
    },
    //20181001 확인 후 미수정
    concat: function (a, b) {
        // : console.log("khan sum  a : " + a + " b : " + b);
        //console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
        return a + b;
    },
    //20181001 확인 후 미수정
    sum: function (a, b) {
        //console.log("khan sum  a : " + a + " b : " + b);
        //console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
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
    //20181001 확인 후 미수정
    sumFloat: function (a, b) {
        //console.log("khan sumFloat  a : " + a + " b : " + b);
        //console.log("khan sumFloat  a : " + parseFloat(a).toFixed(4) + " b : " + parseFloat(b).toFixed(4));
        //console.log("khan sumFloat  : " + parseFloat(a+b).toFixed(4));
        //console.log("khan sumFloat  : " + parseFloat(parseFloat(a).toFixed(4)) + parseFloat(parseFloat(b).toFixed(4)));
        var parseA = a;
        var parseB = b;

        if (typeof a === "string") {
            parseA = parseFloat(a);
        }
        if (typeof a === "string") {
            parseB = parseFloat(b);
        }
        //console.log("parseA : " + parseA + " /parseB : " + parseB +" / parsefloat : " + parseFloat(parseA + parseB).toFixed(2));
        return parseFloat(parseA + parseB).toFixed(2);
    },
    //20181001 확인 후 미수정
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
    //20181001 확인 후 미수정
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
    //20181001 확인 후 미수정
    lessThan: function (a, b) {
        var result = false;
        if (a < b) {
            result = true;
        }
        return result;
    }
    //20181001 확인 후 미수정
    ,greaterThan: function (a, b) {
        var result = false;
        if (a > b) {
            result = true;
        }
        return result;
    },
    //20181001 확인 후 미수정
    isCorner: function (corner, addMoveCount) {
        var result = false;

        var corners = corner.split(";");

        for (var i = 0; i < corners.length; i++) {
            //console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if (parseInt(corners[i].trim()) === addMoveCount) {
                result = true;
            }
        }
        //console.log("khan result : " + result);
        return result;
    }
    //20181001 확인 후 미수정
    ,abs: function (a) {
        var num = Math.sign(a);
        if (num === -1) {
            return parseFloat(parseFloat(a * -1).toFixed(2));
        }
        return a;
    },
    //20181001 수정
    setPosition: function (id, vec, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        obj.setAttribute("position",vec);
    },
    //20181001 수정
    getPosition: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var positionTmp = obj.positionTmp = obj.positionTmp || {x: 0.0, y: 0.0, z: 0.0};
        var position = obj.getAttribute('position');
        positionTmp.x = position.x;
        positionTmp.y = position.y;
        positionTmp.z = position.z;
        return positionTmp;
    },
    //20181001 수정
    setRotation: function (id, vec, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('rotation', vec);
    },
    //20181001 수정
    getRotation: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        var rotateTmp = obj.rotateTmp = obj.rotateTmp || {x: 0.0, y: 0.0, z: 0.0};
        var rotation = obj.getAttribute('rotation');
        rotateTmp.x = rotation.x;
        rotateTmp.y = rotation.y;
        rotateTmp.z = rotation.z;
        return rotateTmp;
    },
    //20181001 확인 후 미수정
    rest: function (a, b) {
        return a % b
    },
    /**
     * 카메라 이동 위치를 더해주는 함수
     * @param1 : object
     * @param2: Vec3
     */
    translate: function (obj, vec) {
        var positionTmp = this.positionTmp = this.positionTmp || {x: 0.0, y: 0.0, z: 0.0};
        var position = obj.getAttribute('position');
        /*
         소수점 연산 보정 소수점 2자리 까지 보정한다.
         */
        positionTmp.x = parseFloat((position.x + vec.x).toFixed(2));
        positionTmp.y = parseFloat((position.y + vec.y).toFixed(2));
        positionTmp.z = parseFloat((position.z + vec.z).toFixed(2))
        obj.setAttribute('position', positionTmp);
    },
    /**
     * 카메라 회전 위치를 더해주는 함수
     * @param1 : object
     * @param2: Vec3
     */
    transRotate: function (obj, vec) {
        var rotateTmp = this.rotateTmp = this.rotateTmp || {x: 0.0, y: 0.0, z: 0.0};
        var rotation = obj.getAttribute('rotation');
        /*
         소수점 연산 보정 소수점 2자리 까지 보정한다.
         */
        rotateTmp.x = parseFloat((rotation.x + vec.x).toFixed(2));
        rotateTmp.y = parseFloat((rotation.y + vec.y).toFixed(2));
        rotateTmp.z = parseFloat((rotation.z + vec.z).toFixed(2));
        obj.setAttribute('rotation', rotateTmp);
    },

    //20181001 수정
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

    //20181001 수정
    transVector: function (id, velocity, delta, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        var directionVector = new THREE.Vector3(0, 0, 0);//이동방향 설정
        directionVector.copy(velocity); //속도 설정
        directionVector.multiplyScalar(delta); //이동 거리 계산
        maxUtils.translate(obj, directionVector); //이동
    },
    /**
     * 유니크아이디 생성
     * @param1 : 기본아이디
     * @return return Id
     */
    getUniqueId: function (baseId) {
        if (!document.getElementById(baseId)) {
            return baseId;
        }
        var i = 1;
        // If the baseId ends with _#, it extracts the baseId removing the suffix
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
     * @param1 : element (button)
     * @param2 : 사이즈  width, height, depth (크기)
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
     * @param1 : element (button)
     * @param2 : 사이즈  width, height, depth (크기)
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
//        console.log("childNodes : " + alert.childNodes);
//        console.log("childLength : " + alert.childNodes.length + " /childLength : " + typeof alert.childNodes.length);

        if (alert.childNodes.length <= 0) {
//            console.log("11111")
            text = document.createElement('a-entity');
            button = document.createElement('a-entity');
        } else {
//            console.log("2222")
            text = alert.childNodes[0];
            button = alert.childNodes[1];
            /*            console.log("alert : " + typeof alert);
                        console.log("text : " + typeof text);
                        console.log("exit : " + typeof exit);
                        console.log("button : " + typeof button);*/
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
     * @param1 : element (button)
     * @param2 : 사이즈  width, height, depth (크기)
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
     * @param1 : obj
     * @return : vec3
     */
    getWorldPosition: function (obj) {
        var position = obj.object3D.getWorldPosition();
        return position;
    },
    /**
     * 월드 포지션 세팅
     * @param1 : obj
     * @param : vec3
     */
    setWorldPosition: function (obj, position) {
        obj.object3D.position.set(position.x, position.y, position.z);
    },
    /**
     * 해당 범위내에 카메라 있는 지 확인 하여 있으면 true 리턴
     * @param1 : 자기자신 id
     * @param2 : 반지름
     * @param3 : 감지할 대상 id
     * @return : bool
     */
    //20181001 수정
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
    //호출시 component 연결
    //20181001 수정
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
     * @param1 : id
     */
    //20181001수정
    playMultiMedia: function (id, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (obj.hasAttribute("sound")) {
            obj.components.sound.playSound();
        } else {
            //console.log("obj.id : " : obj.id);
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
    //추가
    /**
     * 멀티미디어 정지
     * @param1 : id
     */
    //20181001 수정
    pauseMultiMedia: function (id, sourceEl, eventId) {

        var obj = maxUtils.findObject(id, sourceEl, eventId);

        if (obj.hasAttribute("sound")) {
            obj.components.sound.pauseSound();
        } else {
            //console.log("obj.id : " : obj.id);
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
        createEventListener: function (sourceObjectName, eventName, event) {
            var obj = maxUtils.findObject(sourceObjectName);
            var listener = 'KEvent.addEventListener(\"' + eventName + '\", function(){';
            //이벤트 추가시 아래 항목에 추가하면 된다.
            switch (event) {
                case 'playVideo' :
                    listener = listener + 'maxUtils.playVideo(\"' + obj.id + '\")';
                    break;
                case 'pauseVideo' :
                    listener = listener + 'maxUtils.pauseVideo(\"' + obj.id + '\")';
                    break;
                case 'playSound' :
                    listener = listener + 'maxUtils.playSound(\"' + obj.id + '\")';
                    break;
                case 'pauseSound' :
                    listener = listener + 'maxUtils.pauseSound(\"' + obj.id + '\")';
                    break;
                case 'visible' :
                    listener = listener + 'maxUtils.visible(\"' + obj.id + '\")';
                    break;
                case 'invisible' :
                    listener = listener + 'maxUtils.invisible(\"' + obj.id + '\")';
                    break;
                case 'moveLocation' :
                    listener = listener + 'maxUtils.moveLocation(\"' + obj.id + '\")';
                    break;
                case 'changeCamera' :
                    listener = listener + 'maxUtils.changeCamera(\"' + obj.id + '\")';
                    break;
                default :
                    break;
            }

            listener = listener + '})';

            return listener;
        },*/

    /**
     * 대상을 따라 다니게 한다.
     * @param1 :  자기자신 object
     * @param2 : 타겟 아이디
     */
    //20181001 수정
    lookAt: function (id, targetId, heading) {
        var obj = maxUtils.findObject(id, "", "");
        var target = maxUtils.findObject(targetId, "", "");
        var targetRotation = maxUtils.getRotation(target);
        var targetPosition = maxUtils.getWorldPosition(target);
        var yAxis = targetRotation.y;

        //90이 왼쪽 180 뒤쪽 우측이 270 나머지 0
        //일단 z 축 앞에 만 나오게 하였음.
        targetRotation.y = heading; //보정
        targetPosition.z = targetPosition.z - 10;
        maxUtils.setPosition(obj, targetPosition);
        obj.setAttribute("rotation", {x: 0, y: 0, z: 0});

        /*        if (targetRotation.y > 0) {

                    if (yAxis > 360) {
                        yAxis = parseFloat(yAxis % 360).toFixed(2);
                        // console.log("양수 : "+ yAxis);
                    }
                    //console.log("양수 : "+ yAxis/90);
                    if (yAxis / 90 >= 1 && yAxis / 90 <= 2) {
                        //console.log("양수1111");
                        targetPosition.x = targetPosition.x - 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 90, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:90, z:0});
                    } else if (yAxis / 90 >= 2 && yAxis / 90 <= 3) {
                        //console.log("양수2222");
                        targetPosition.z = targetPosition.z + 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 180, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:180, z:0});
                    } else if (yAxis / 90 >= 3 && yAxis / 90 <= 4) {
                        //console.log("양수3333");
                        targetPosition.x = targetPosition.x + 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 270, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:270, z:0});
                    } else {
                        // console.log("양수4444");
                        targetPosition.z = targetPosition.z - 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 0, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:0, z:0});
                    }
                } else {
                    //console.log("음수음수");
                    yAxis = (targetRotation.y * -1) //양수화

                    if (yAxis < 360) {
                        yAxis = parseFloat(yAxis % 360).toFixed(2);
                        //console.log("음수 : "+ yAxis);
                    }
                    //console.log("음수1111 : "+ yAxis/90);
                    if (yAxis / 90 >= 1 && yAxis / 90 <= 2) {
                        //console.log("음수1111");
                        targetPosition.x = targetPosition.x + 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 270, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:270, z:0});
                    } else if (yAxis / 90 >= 2 && yAxis / 90 <= 3) {
                        //console.log("음수2222");
                        targetPosition.z = targetPosition.z + 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 180, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:180, z:0});
                    } else if (yAxis / 90 >= 3 && yAxis / 90 <= 4) {
                        //console.log("음수3333");
                        targetPosition.x = targetPosition.x - 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 90, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:90, z:0});
                    } else {
                        //console.log("음수4444");
                        targetPosition.z = targetPosition.z - 10;
                        maxUtils.setPosition(obj, targetPosition);
                        obj.setAttribute("rotation", {x: 0, y: 0, z: 0});
                        //maxUtils.setRotation(obj, {x:0, y:0, z:0});
                    }
                }*/
    },
    //20181001 수정
    lookAtSet: function (sourceObjectName, targetObjectName, heading, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('look-at', {targetId: targetObjectName, heading: heading});
    }
    /**
     *  카메라 보는 방향에 맞추어 회전변경
     * @param1 :  자기자신 object
     * @param2 : 타겟 아이디
     */
    //20181001 수정
    , synchroRotation(id, targetId, correction) {
        var obj = maxUtils.findObject(id, "", "");
        var target = maxUtils.findObject(targetId, "", "");
        var targetRotation = maxUtils.getRotation(target);
        var yAxis = targetRotation.y + correction;

        obj.setAttribute("rotation", {x: 0, y: yAxis, z: 0});
    },
    //20181001 수정
    synchroRotationSet: function (sourceObjectName, targetObjectName, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('synchro-rotation', {targetId: targetObjectName});
    },
    /**
     * 방향 스피드로 이동한다.
     * @param2 : 해당 object
     * @param2 : direction 방향
     * @param3 : speed 속도
     * @param4 : deltaTime 델타타임
     */
    //20181001 수정
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
    //20181001 수정
    locationMove: function (origin, startPosition, endPosition, heading, speed, deltaTime) {

        var originPosition = maxUtils.getWorldPosition(origin);
        var position = new Vector3(maxUtils.minusFloat(endPosition.x, startPosition.x) / speed, 0, maxUtils.minusFloat(endPosition.z, startPosition.z) / speed);

        maxUtils.transVector(origin.id, position, deltaTime, "", "");

        if (originPosition.distanceTo(endPosition) < maxUtils.sumFloat(heading, 1) && originPosition.distanceTo(endPosition) > maxUtils.minusFloat(heading, 1)) {
            if (origin.hasAttribute('animation-mixer')) {
                origin.setAttribute('animation-mixer', 'clip', 'idle');
            }
            //보정
            origin.setAttribute('position', endPosition);
            origin.setAttribute('location-move', 'isTick', false);
        }
    },
    //20181001 수정
    locationMoveSet: function (sourceObjectName, targetObjectName, speed, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        //console.log("들어왔다! : " + typeof obj + " / target : " + targetObjectName);
        obj.setAttribute('location-move', {targetId: targetObjectName, speed: speed});
        //console.log("location-move : " + obj.getAttribute('location-move').targetId);
    },
    //20181001 수정
    locationPointSet: function (sourceObjectName, sourceEl, eventId) {
        var obj = maxUtils.findObject(sourceObjectName, sourceEl, eventId);
        obj.setAttribute('location-point', ' ');
    }
    //20181001 추가
    ,setAnimation: function (id, animation, sourceEl, eventId) {
        var obj = maxUtils.findObject(id, sourceEl, eventId);
        obj.setAttribute('animation-mixer', animation);
    }
}
