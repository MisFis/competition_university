"use strict";
// 1993 Park-Miller LCG
function LCG(seed) {
    return function () {
        seed = Math.imul(16807, seed) | 0 % 2147483647;
        return (seed & 2147483647) / 2147483648;
    };
}



var randomGenerator = LCG(0);
function getRandomSeed(seed) {
    return [...seed].reduce(function (acc, curr) { return acc + curr.charCodeAt(0); }, 0) % 2147483647;
}

function setRandomSeed(seed) {
    var sedNumber = getRandomSeed(seed);
    randomGenerator = LCG(sedNumber);
}

function random() {
    return randomGenerator();
}

export {LCG, getRandomSeed, random}
