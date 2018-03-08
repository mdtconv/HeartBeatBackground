let video = document.getElementById('bm');
let source = document.getElementById('source');

var socket = io('http://13.125.124.80:3000');
// video.style.display = 'none';
// video.pause();
video.play();

let enabled = false;
let disabledVideos = ["./../videos/disabled_1.mp4", "./../videos/disabled_2.mp4"];
let enabledVideos = ["./../videos/enabled_1.mp4", "./../videos/enabled_2.mp4", "./../videos/enabled_3.mp4", "./../videos/enabled_4.mp4", "./../videos/enabled_5.mp4", "./../videos/enabled_6.mp4"];

socket.on('connect', () => {
    console.log('Connected');
})

socket.on('heartbeat', (_heartbeat) => {
    console.log('got ', _heartbeat);
    console.log('enabled is', enabled);
    if(_heartbeat > 0) { // valid
        if(!enabled) {
            // enabled 변경
            video.setAttribute('src',  enabledVideos[Math.floor(Math.random() * enabledVideos.length)]);
            video.load();
            video.play();
            fadeIn(video);
        }
    } else { // invalid
        if(enabled) {
            enabled = false;
            fadeIn(video, false);
            video.setAttribute('src',  disabledVideos[Math.floor(Math.random() * disabledVideos.length)]);
            video.play();
        }
    }
});

function fadeIn(element, enable=true) {
    var op = 0;
    if(enabled === false) {
        element.style.display = 'inline';
        var timer = setInterval(function() {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1 || 0.1;
            enabled = enable;
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
        enabled = false;
    }, 50);
}
