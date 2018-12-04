monoutil = {
    /**
     * scene이 로드 되면 이벤트를 추가한다.
     */
    /*		init : function(){
                var scene = document.querySelector("a-scene");
                if(scene.hasLoaded) {
                    utils.setUserInfo()
                }else{
                    scene.addEventListener("loaded", utils.setUserInfo());
                }
            },*/

    /**
     * 분기 노드 껍데기
     * param 1 : condition
     * return : boolean
     */
    branch : function(boolean){
        return boolean;
    },



    /**
     *
     * @param source : 검색할 단어
     * @param target : 검색 대상
     * @returns {boolean}
     */
    contain : function(source, target){
        var result = false;
        var target = target.split(";");

        for(var i= 0; i < target.length; i++){
            //console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if(target[i].trim() == source){
                result = true;
            }
        }
        //console.log("khan result : " + result);
        return result;
    },

    /**
     *
     * @param num : 스트링으로 형 변환할 데이터
     * @returns {string}
     */
    intToString : function(num) {
        return num.toString();
    },

    /**
     * object Id로 object접근
     * param 1 : 검색할 object id
     * return : object
     */
    findObject: function (id) {
        var obj = document.querySelector("#"+id);
        return obj;
    },
    /**
     * object visible 값을 변경
     * param 1 : visible 값을 변경할 object
     * param 2 : boolean 값
     */
    setVisible: function (obj, value) {
        obj.setAttribute("visible", value);
    },
    /**
     * 객체에 종속된 스키마(property) 값을 가져온다
     * param 1 : schema 값을 가져올 object
     * param 2 : component 이름
     * param 3 : property 값 (schema 이름)
     * return : schema 값
     */
    getProperty : function(obj, componentName, property) {
        //콘솔창 루프 도는 것처럼 보이는 것은 다른 곳에서 사용하고 있는게 있기 때문이다.
        //console.log(obj + ".getAttribute(" + componentName + ")." + property + ";");
        var result = eval(obj + ".getAttribute(\"" + componentName + "\")." + property + ";");

        //console.log("khan getProperty : " + result +" type : " + typeof result +" componentName : "+ componentName );
        return result;
    },
    /**
     * 객체에 종속된 변수 값을 세팅한다.
     * param 1 : schema 값을 변경할 object
     * param 2 : component 이름
     * param 3 : property 값 (schema 이름)
     * param 4: : 변경할 schema 값
     */
    setProperty : function(obj, componentName, property, value){
        //console.log("khan SetProperty : " + value +" type : " + typeof value );
        //eval("obj.setAttribute(componentName,{"+ property +": "+ value +"});");
        if(typeof value === "string"){
            eval(obj + ".setAttribute(\"" + componentName + "\",{"+ property +": \""+ value +"\"});");
        }else{
            eval(obj + ".setAttribute(\"" + componentName + "\",{"+ property +": "+ value +"});");
        }
/*        var result = eval("obj.getAttribute(componentName)." + property + ";");
        console.log("khan reusult : " + result);*/
    },
    /**
     * 인자값으로 받은 객체의 텍스트 값을 찾아온다.
     * param 1: text 값을 가져올 ojbect
     * return : text Value 값
     */
    getText : function(obj){
        var result = obj.getAttribute("text" ,"value");
        return result;
    },
    /**
     * 인자값으로 받은 객체의 텍스트 값을 설정한다.
     * param 1: text 값을 변경할 ojbect
     * param 2: 변경할 text Value 값
     */
    setText : function(obj, value){
        obj.setAttribute("text" ,"value",value);
    },
    /**
     * 서로 다른 두 값을 비교하여 같으면 true 리턴 아니면 false 리턴
     * param 1 : 비교할 값 1
     * param 2 : 비교할 값 2
     */
    compare : function(source, target){
        var result = false;
        if(source === target){
            result = true;
        }
        return result;
    },
    /**
     * 1부터 6까지의 랜덤값을리턴한다.
     * return : random 리턴값
     */
    random : function(a, b){
        var num = Math.floor(Math.random() * b);
        return (num % b) + a;
    },
    /**
     * 두개의 인자 값을 더해서 리턴해준다. int형
     * param1 : a
     * param2 : b
     * return : a+b
     */
    sum :  function(a, b){
        //console.log("khan sum  a : " + a + " b : " + b);
        //console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
        var parseA = a;
        var parseB = b;
        if(typeof a === "string"){
            parseA = parseInt(a);
        }
        if(typeof a === "string"){
            parseB = parseInt(b);
        }

        return parseInt(parseA+parseB);
    },
    /**
     * 두개의 문자열 값을 더해서 리턴해준다. string
     * param1 : a
     * param2 : b
     * return : a+b
     */
    concat: function(a, b){
        // : console.log("khan sum  a : " + a + " b : " + b);
        //console.log("khan sum : " + ( parseInt(a) + parseInt(b)));
        return a+b;
    },
    /**
     * 두개의 인자 값을 더해서 리턴해준다. float 소수점 4자리수 까지 계산하고 나머지는 반올림한다.
     * param1 : a
     * param2 : b
     * return : a+b
     */
    sumFloat : function(a, b){
        //console.log("khan sumFloat  a : " + a + " b : " + b);
        //console.log("khan sumFloat  a : " + parseFloat(a).toFixed(4) + " b : " + parseFloat(b).toFixed(4));
        //console.log("khan sumFloat  : " + parseFloat(a+b).toFixed(4));
        //console.log("khan sumFloat  : " + parseFloat(parseFloat(a).toFixed(4)) + parseFloat(parseFloat(b).toFixed(4)));
        var parseA = a;
        var parseB = b;
        if(typeof a === "string"){
            parseA = parseFloat(a);
        }
        if(typeof a === "string"){
            parseB = parseFloat(b);
        }

        return parseFloat(parseA+parseB).toFixed(4);
    },
    /**
     * 두개의 인자 값을  뺄셈하여 리턴해준다. fint형
     * param1 : a
     * param2 : b
     * return : a-b
     */
    minus : function(a, b){
        var parseA = a;
        var parseB = b;
        if(typeof a === "string"){
            parseA = parseInt(a);
        }
        if(typeof a === "string"){
            parseB = parseInt(b);
        }

        return parseInt(parseA-parseB);
    },
    /**
     * 두개의 인자 값을  뺄셈하여 리턴해준다. float 소수점 4자리수 까지 계산하고 나머지는 반올림한다.
     * param1 : a
     * param2 : b
     * return : a-b
     */
    minusFloat : function(a, b){
        var parseA = a;
        var parseB = b;
        if(typeof a === "string"){
            parseA = parseFloat(a);
        }
        if(typeof a === "string"){
            parseB = parseFloat(b);
        }

        return parseFloat(parseA-parseB).toFixed(4);
    },
    /**
     * 하나의 인자 값을 받아 절대 값으로 리턴 해준다.
     * param1 : a
     * param2 : b
     * return : a-b
     */
    abs : function(a){
        var num = Math.sign(a);
        if(num === -1){
            return parseFloat(parseFloat(a*-1).toFixed(4));
        }
        return a;
    },


    /**
     * 두개의 인자 값을 비교하여 피연산자1이 피연산자2 보다 작을 시 true를 반환한다.
     * param1 : a
     * param2 : b
     * return : true or false(boolean)
     */
    lessThan : function(a, b){
        var result = false;
        if(a < b){
            result = true;
        }
        return result;
    },
    /**
     * 두개의 인자 값을 비교하여 피연산자1이 피연산자2 보다 클 시 true를 반환한다.
     * param1 : a
     * param2 : b
     * return : true or false(boolean)
     */
    greaterThan : function(a, b){
        var result = false;
        if(a > b){
            result = true;
        }
        return result;
    },
    /**
     * 프레임마다 코너 값과 현재 누적 위치를 받아 비교 하여 코너인지 아닌지 반환
     * param1 : totalValue 코너값
     * param2 : b 누적카운트 수
     * return : true or false(boolean)
     */
    isCorner : function(corner, addMoveCount){
        var result = false;

        var corners = corner.split(";");

        for(var i= 0; i < corners.length; i++){
            //console.log("khan corner : " + corners[i] +" / " +addMoveCount);
            if(parseInt(corners[i].trim()) === addMoveCount){
                result = true;
            }
        }
        //console.log("khan result : " + result);
        return result;
    },
    /**
     * setProperty로 하나 씩하면 버그 있어서 position set 할때 사용
     * param1 : obj
     * param2 : componentName
     * param3 : xAxis
     * param4 : yAxis
     * param4 : zAxis
     */
    setPosition : function(obj, componentName, xAxis, yAxis, zAxis){
        obj.setAttribute('position', new Vector3(xAxis, yAxis, zAxis));
        //eval("obj.setAttribute(componentName,{x: " + parseFloat(xAxis) +", y: " + parseFloat(yAxis) + ", z: " + parseFloat(zAxis) + "});");
    },

    setPosition : function(obj , vec){
        obj.setAttribute('position', vec);
    },

    getPosition : function(obj) {
        var positionTmp = obj.positionTmp = obj.positionTmp || {x: 0.0, y: 0.0, z: 0.0};
        var position = obj.getAttribute('position');
        positionTmp.x = position.x; positionTmp.y = position.y; positionTmp.z = position.z;
        return positionTmp;
    },

    /**
     *
     * @param obj : 대상 오브젝트
     * @param velocity : 오브젝트 이동 속도
     * @param delta : 프레임 속도
     */
    transformForward : function(obj,velocity, delta){
        obj.transform.translateVector(velocity,delta)
    },

    /**
     * setProperty 로 하나 씩하면 버그 있어서 rotation set 할때 사용
     * param1 : obj
     * param2 : componentName
     * param3 : xAxis
     * param4 : yAxis
     * param4 : zAxis
     */
    setRotation : function(obj, componentName, xAxis, yAxis, zAxis){
        var rotateTmp = obj.rotateTmp = obj.rotateTmp || {x: 0.0, y: 0.0, z: 0.0};
        var rotation = obj.getAttribute('rotation');
        rotateTmp.x = rotation.x + xAxis;
        rotateTmp.y = rotation.y + yAxis;
        rotateTmp.z = rotation.z + zAxis;
        obj.setAttribute('rotation', rotateTmp);
//        eval("obj.setAttribute(componentName,{x: " + parseFloat(xAxis) +", y: " + parseFloat(yAxis) + ", z: " + parseFloat(zAxis) + "});");
    },

    rest : function(a , b){
      return a % b
    }



}
