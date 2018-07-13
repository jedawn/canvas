var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
const endTime = new Date(2018, 6, 14, 18, 47, 52);
var curShowTimeSeconds = 0;
var ball = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    setInterval(function () {
        render(context);
        update();
    }, 20);
}

function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = (endTime.getTime() - curTime.getTime()) / 1000;
    return ret >= 0 ? ret : 0;
}
function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt(nextShowTimeSeconds % 3600 / 60);
    var nextSeconds = parseInt(nextShowTimeSeconds % 60);

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt(curShowTimeSeconds % 3600 / 60);
    var curSeconds = parseInt(curShowTimeSeconds % 60);

    if (nextSeconds != curSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds;
        // 判断数字变化添加需要实现动画的小球
        if (parseInt(nextSeconds / 10) != parseInt(curSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
    
        if (parseInt(nextSeconds % 10) != parseInt(curSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        if (parseInt(nextMinutes / 10) != parseInt(curMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
    
        if (parseInt(nextMinutes % 10) != parseInt(curMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
        }
        if (parseInt(nextHours / 10) != parseInt(curHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10));
        }
    
        if (parseInt(nextHours % 10) != parseInt(curHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
        }
    }
    updateBalls();
}

function addBalls(x, y, num, cxt) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ball.push({
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    r: RADIUS,
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -2,
                    g: 1.5 + Math.random(),
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                })
            }
        }
    }
}

function updateBalls() {
    for (var i = 0; i < ball.length; i++) {
        ball[i].x += ball[i].vx;
        ball[i].y += ball[i].vy;
        ball[i].vy += ball[i].g;
        if (ball[i].y >= WINDOW_HEIGHT - RADIUS) {
            ball[i].y = WINDOW_HEIGHT - RADIUS;
            ball[i].vy = -ball[i].vy * 0.5;
        }
    }
    //性能优化
    var cnt = 0;
    for(var i=0;i<ball.length;i++){
        if(ball[i].x + RADIUS > 0 && ball[i].x - RADIUS < WINDOW_WIDTH){
            ball[cnt++] = ball[i];
        }
    }
    while(ball.length > cnt){
        ball.pop();
    }
}

function render(cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt(curShowTimeSeconds % 3600 / 60);
    var seconds = parseInt(curShowTimeSeconds % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < ball.length; i++) {
        cxt.fillStyle=ball[i].color;
        cxt.beginPath();
        cxt.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2 * Math.PI)
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}