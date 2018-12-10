var i = 1; // 1씩 증가시켜서 전달할 변수

// 메시지 수신
self.onmessage = function( e ) {
    loop();
};

// 호출한 페이지에 1씩 증가시킨 i를 1초마다 전달한다.
function loop() {

    // 1씩 증가시켜서 전달
    var testWorker = new Worker("/resorces/webWorker/workerTest");

    postMessage( ++i );
    // 1초뒤에 다시 실행
    setTimeout( function() {
        loop();
    }, 1000 );

}