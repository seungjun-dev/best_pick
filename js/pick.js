/**
 * 전역 변수 선언부
 */
var item = [];
var list = [];
var round1 = [];
var round2 = [];
var round3 = [];
var round4 = [];
var round5 = '';
//var itemNumber = 32;

/**
 * Vue.js data 변수 선언부
 */
var goContents = {
    roundCounter: [16, 8, 4, 2, 1]
    , roundCounterIdx: 0
    , cnt: 0
    , urlLeft: ''
    , urlRight: ''
    , urlFinal: ''
    , idx: 0
}

window.onload = function () {
    var app = new Vue({
        el: '#app',
        data: goContents
    })

    $('#app').show();

    //페이지 init
    init();
}

init = function () {
    //console.log("best pick game start!");
    setRandomNumber();
    startPick();
}

/**
 * 이상형 월드컵 사진을 랜덤으로 보여주기 위해 
 * 1~32 랜덤 숫자 생성
 */
setRandomNumber = function () {
    var i = 0;

    while (i < 32) {
        var rNumber = Math.floor(Math.random() * 32) + 1;
        if (!sameNum(rNumber)) {
            item.push(rNumber);
            i++;
        }
    }
}

sameNum = function (rNumber) {
    //find 함수
    return item.find((item) => (item === rNumber));
}

/**
 * 이미지 URL 생성
 */
getImage = function (i) {
    var _url = './img/ramen/';
    var _fmt = '.jpg';

    goContents.urlLeft = _url + item[i * 2] + _fmt;
    goContents.urlRight = _url + item[i * 2 + 1] + _fmt;
}

/**
 * 이상형 월드컵 시작
 */
startPick = function () {
    getImage(goContents.idx);
}

/**
 * 픽 골랐을 때 로직
 */
hasPick = function (e) {
    goContents.cnt++;

    if ("left" == e) {
        list.push(item[goContents.idx * 2]);
        //console.log(item[goContents.idx * 2]);
    } else if ("right" == e) {
        list.push(item[goContents.idx * 2 + 1]);
        //console.log(item[goContents.idx * 2 + 1]);
    }

    if (goContents.cnt == goContents.roundCounter[goContents.roundCounterIdx]) {
        if (goContents.roundCounterIdx == 0) { alert("round1 done!"); round1 = list; }
        if (goContents.roundCounterIdx == 1) { alert("round2 done!"); round2 = list; }
        if (goContents.roundCounterIdx == 2) { alert("round3 done!"); round3 = list; }
        if (goContents.roundCounterIdx == 3) { alert("round4 done!"); round4 = list; }
        if (goContents.roundCounterIdx == 4) {
            alert("round5 done!"); round5 = list;
            renderFinalPick();
        }

        goContents.roundCounterIdx++;
        resetPick();
    } else {
        goContents.idx++;
        getImage(goContents.idx);
    }
}

/**
 * 라운드가 끝날때 마다 관련 변수를 초기화
 */
resetPick = function () {
    goContents.cnt = 0;
    item = list;
    list = [];
    goContents.idx = 0;
    getImage(goContents.idx);
}

/**
 * 마지막 화면 랜더링
 */
renderFinalPick = function () {
    var _url = './img/ramen/';
    var _fmt = '.jpg';

    goContents.urlFinal = _url + round5 + _fmt;

    $('#typeA').hide();
    $('#typeB').show();
}