var item = [];
var list = [];
var round1 = [];
var round2 = [];
var round3 = [];
var round4 = [];
var round5 = '';
//var itemNumber = 32;

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
}

renderFinalPick = function () {
    var _url = './img/ramen/';
    var _fmt = '.jpg';

    goContents.urlFinal = _url + round5 + _fmt;

    $('#typeA').hide();
    $('#typeB').show();
}

hasPick = function (e) {
    goContents.cnt++;

    if ("left" == e) {
        list.push(item[goContents.idx * 2]);
        console.log(item[goContents.idx * 2]);
    } else if ("right" == e) {
        list.push(item[goContents.idx * 2 + 1]);
        console.log(item[goContents.idx * 2 + 1]);
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

resetPick = function () {
    goContents.cnt = 0;
    item = list;
    list = [];
    goContents.idx = 0;
    getImage(goContents.idx);
}

startPick = function () {
    getImage(goContents.idx);
}

getImage = function (i) {
    var _url = './img/ramen/';
    var _fmt = '.jpg';

    goContents.urlLeft = _url + item[i * 2] + _fmt;
    goContents.urlRight = _url + item[i * 2 + 1] + _fmt;
}

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

init = function () {
    console.log("best pick game start!");
    setRandomNumber();
    startPick();
}

init();