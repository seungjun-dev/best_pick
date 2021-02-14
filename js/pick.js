var item = [];
//var itemNumber = 32;

var goContents = {
    //vue 관련 함수 선언부
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
}

init();

