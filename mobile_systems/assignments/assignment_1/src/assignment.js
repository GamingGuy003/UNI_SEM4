"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("./users");
function isWeak(passwd) {
    return passwd == passwd.toLowerCase() && passwd.length < 8;
}
function isStrong(passwd) {
    if (passwd.length > 30)
        return true;
    if (passwd.length > 15 && passwd != passwd.toLowerCase())
        return true;
    if (passwd.length > 10 && /[A-Z]/.test(passwd) && /[a-z]/.test(passwd) && /[0-9]/.test(passwd))
        return true;
    return false;
}
function getWeak() {
    return users_1.users
        .filter(function (user) { return isWeak(user.login.password); })
        .map(function (user) { return user.name; });
}
function getStrong() {
    return users_1.users
        .filter(function (user) { return isStrong(user.login.password); })
        .map(function (user) { return user.name; });
}
function analyzeUsers() {
    var weak = getWeak().length;
    var strong = getStrong().length;
    return {
        "weak": weak,
        "medium": users_1.users.length - (weak + strong),
        "strong": strong
    };
}
function resetWeak() {
    var weak = getWeak();
    var _loop_1 = function (user) {
        if (weak.some(function (weak) { return weak === user.name; }))
            // does not modify the actual array since no write access
            user.login.password = "changeme";
    };
    for (var _i = 0, users_2 = users_1.users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        _loop_1(user);
    }
}
function sortByAge() {
    return users_1.users.sort(function (a, b) { return a.birthdate.age - b.birthdate.age; });
}
console.log(sortByAge());
