"use strict";
function searchPerson(age, stature) {
    let yy = '';
    yy = `找到了${age}岁`;
    if (stature !== undefined) {
        yy += stature;
    }
    return yy + '的人';
}
var result = searchPerson(22, '175cm');
console.log(result);
function searchPerson2(...xuqiu) {
    let yy = '找到了';
    for (let i = 0; i < xuqiu.length; i++) {
        yy += xuqiu[i];
        if (i < xuqiu.length) {
            yy += '、';
        }
    }
    return yy + '的人';
}
var resule2 = searchPerson2('22岁', '140斤', '175cm');
console.log(resule2);
