/**
 * Created by zqc on 2014/12/3.
 */

function createCar(speed,cxt,dom) {
    var o = new Object();
    o.speed = speed;
    o.cxt = cxt;
    o.cell = 100;
    o.curdir = {'x':100,'y':400};
    o.hinder = [[],[],[]];
    o.scroll = 0;
    o.scored = 0;
    o.init = function () {
        o.cxt.fillStyle = 'red';
        o.cxt.fillRect(o.curdir.x, o.curdir.y, o.cell, o.cell);
        document.onkeydown = function (e) {
            if(e.keyCode === 37 && o.curdir.x > 0){
                o.moveCar('left');
            }
            else if(e.keyCode === 39 && o.curdir.x < 200){
                o.moveCar('right');
            }
            else if(e.keyCode === 40)
                o.speed = speed / 3;
        };
        document.onkeyup = function () {
            o.speed = speed;
        };
        o.setHinder();
        o.downHinder();
    };
    o.setHinder = function () {
        var rand1 = Math.ceil(Math.random() * 1000) % 2,
            rand2 = Math.ceil(Math.random() * 1000) % 2,
            rand3 = Math.ceil(Math.random() * 1000) % 2;
        o.hinder[0].push({'x':0,'y':0,'hinder':rand1});
        o.hinder[1].push({'x':100,'y':0,'hinder':rand2});
        o.hinder[2].push({'x':200,'y':0,'hinder':rand1 + rand2 == 2?0:rand3});
        for(var i = 0; i < o.hinder.length; i ++){
            var last =o.hinder[i][o.hinder[i].length - 1];
            if(last.hinder === 1) {
                o.cxt.fillStyle = 'black';
                o.cxt.fillRect(last.x,last.y, o.cell, o.cell);
            }
        }
    };
    o.downHinder = function () {
        setTimeout(function () {
            var i = 0,
                j = 0,
                cur = null,
                old = null;
            for(; i < o.hinder[0].length; i ++) {
                for(j = 0; j < 3; j ++) {
                    cur = o.hinder[j][i];
                    if (cur.hinder === 1) {
                        old = o.hinder[j][i];
                        o.cxt.clearRect(old.x,old.y, o.cell, o.cell);
                        o.hinder[j][i].y = o.hinder[j][i].y + 5;
                        cur = o.hinder[j][i];
                        o.cxt.fillStyle = 'black';
                        o.cxt.fillRect(cur.x,cur.y, o.cell, o.cell);
                    }
                    else
                        o.hinder[j][i].y = o.hinder[j][i].y + 5;
                }
            }
            for(i = 0; i < o.hinder.length; i ++) {
                if (o.hinder[i][0].y >= 500) {
                    o.scored  = o.scored  +  Math.ceil(100/o.speed);
                    dom.innerHTML = '得分：' + o.scored;
                    var over = o.hinder[i].shift();
                    if(over.hinder === 1)
                        o.cxt.clearRect(over.x,over.y, o.cell, o.cell);
                }
            }
            if(o.hinder[o.curdir.x/100][0].hinder === 1 && o.hinder[o.curdir.x/100][0].y + 100 >= o.curdir.y){
                alert('你挂了');
                return;
            }
            o.scroll = o.scroll + 5;
            if(o.scroll % 300 == 0)
                o.setHinder();
            o.downHinder();
        }, o.speed);
    };
    o.moveCar = function (dir) {
        o.cxt.fillStyle = 'red';
        o.cxt.clearRect(o.curdir.x, o.curdir.y, o.cell, o.cell);
        o.curdir.x = (dir === 'left'?o.curdir.x - o.cell:o.curdir.x + o.cell);
        o.cxt.fillRect(o.curdir.x,o.curdir.y, o.cell, o.cell);
    };
    return o;
}

var c = document.getElementById('mycar');
var scored = document.getElementById('scored');
var cxt = c.getContext('2d');
var car = createCar(30,cxt,scored);
car.init();