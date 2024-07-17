/*
 * @Author: chenzhongsheng
 * @Date: 2024-07-17 09:38:18
 * @Description: Coding something
 */

var gradient = require("gradient-string")
var fs = require("fs")
let coolGradient = gradient([
    ('#f0d53b'),
    ('#ec5c2f')
]);
let coolString = coolGradient('Lim - Mark Framework easier to use.');
fs.writeFileSync('./a.txt', coolString, '');