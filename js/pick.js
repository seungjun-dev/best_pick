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
    , textLeft: ''
    , urlRight: ''
    , textRight: ''
    , urlFinal: ''
    , textFinal: ''
    , idx: 0
    , topic: ''
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
    getTopic();
    setRandomNumber();
    startPick();
}

getTopic = function () {
    var param = location.search;
    if (param.indexOf("ramen") != -1) {
        goContents.topic = "Ramen";
    } else if (param.indexOf("puppy") != -1) {
        goContents.topic = "Puppy";
    } else if (param.indexOf("snack") != -1) {
        goContents.topic = "Snack";
    }
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
    var _url = './img/' + goContents.topic.toLowerCase() + '/';

    if ("ramen" == goContents.topic.toLowerCase()) {
        goContents.urlLeft = _url + ramen[item[i * 2] - 1].pics;
        goContents.urlRight = _url + ramen[item[i * 2 + 1] - 1].pics;
        goContents.textLeft = ramen[item[i * 2] - 1].name;
        goContents.textRight = ramen[item[i * 2 + 1] - 1].name;
    } else if ("puppy" == goContents.topic.toLowerCase()) {
        goContents.urlLeft = _url + puppy[item[i * 2] - 1].pics;
        goContents.urlRight = _url + puppy[item[i * 2 + 1] - 1].pics;
        goContents.textLeft = puppy[item[i * 2] - 1].name;
        goContents.textRight = puppy[item[i * 2 + 1] - 1].name;
    } else if ("snack" == goContents.topic.toLowerCase()) {
        goContents.urlLeft = _url + snack[item[i * 2] - 1].pics;
        goContents.urlRight = _url + snack[item[i * 2 + 1] - 1].pics;
        goContents.textLeft = snack[item[i * 2] - 1].name;
        goContents.textRight = snack[item[i * 2 + 1] - 1].name;
    }

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
    var _url = './img/' + goContents.topic.toLowerCase() + '/';

    if ("ramen" == goContents.topic.toLowerCase()) {
        goContents.urlFinal = _url + ramen[round5 - 1].pics;
        goContents.textFinal = ramen[round5 - 1].name;
    } else if ("puppy" == goContents.topic.toLowerCase()) {
        goContents.urlFinal = _url + puppy[round5 - 1].pics;
        goContents.textFinal = puppy[round5 - 1].name;
    } else if ("snack" == goContents.topic.toLowerCase()) {
        goContents.urlFinal = _url + snack[round5 - 1].pics;
        goContents.textFinal = snack[round5 - 1].name;
    }


    $('#typeA').hide();
    $('#typeB').show();
}