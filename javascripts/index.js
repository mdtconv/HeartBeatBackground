let video = document.getElementById('bm');
var socket = io('http://13.125.124.80:3000');
video.style.display = 'none';
// video.pause();
// video.play();

let nowVisible = false;

socket.on('connect', () => {
    console.log('Connected');
})

socket.on('heartbeat', (_heartbeat) => {
    console.log('got ', _heartbeat);
    console.log('nowVisible is', nowVisible);
    if(_heartbeat > 0) { // valid
        if(!nowVisible) {
            video.load();
            video.play();
            fadeIn(video);
        }
    } else { // invalid
        if(nowVisible) {
            fadeOut(video);
        }
    }
});

function fadeIn(element) {
    var op = 0;
    if(nowVisible === false) {
        element.style.display = 'inline';
        var timer = setInterval(function() {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1 || 0.1;
            nowVisible = true;
        }, 50);
    }
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
        nowVisible = false;
    }, 50);
}