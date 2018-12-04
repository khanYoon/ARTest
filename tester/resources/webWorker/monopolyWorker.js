// 메시지 수신
self.onmessage = function( e ) {
    //console.log("메세지가 호줄 되었습니다.")

    if(e.data[0] =='init'){
        console.log("여기 호출")
    }
    if(e.data[0]=='repeat'){
        console.log("repeat 들어왔습니다.");
        repeat(e.data);
    }

    if(e.data[0]=='transformEnd'){
        console.log("holdOff  : " + e.data[1]);
        //postMessage(['holdOff', e.data[1]]);
    }

};

function repeat(data){
    //maxUtils.setProperty(data[1],data[2],data[3],data[4],data[5],data[6]);
    var count = data[1];
    var blockList = data[2];

    //console.log("count + " + count);
    //console.log("blockList + " + blockList);
    for(var i=0; i<count; i++){
        var blockName  = this.getSplitValue(blockList, ",", i+1);
        this.sleep(200);
        postMessage(['endRepeat', blockName]);
        //postMessage(['endRepeat', blockName]);
    }
}

function getSplitValue(targetValue, splitValue, index){
    var result = "";
    if((index =="" || index == undefined || index == null)){
        index = 1;
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

function sleep (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
