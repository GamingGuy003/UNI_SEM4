"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("./users");
function isWeak(passwd) {
    return passwd === passwd.toLowerCase() && passwd.length < 8;
}
function isStrong(passwd) {
    if (passwd.length > 30)
        return true;
    if (passwd.length > 15 && passwd !== passwd.toLowerCase())
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
    return users_1.users
        .sort(function (a, b) { return a.birthdate.age - b.birthdate.age; });
}
function countNationalities() {
    var nationalities = [];
    var _loop_2 = function (user) {
        if (!nationalities.some(function (elem) { return elem === user.nationality; }))
            nationalities.push(user.nationality);
    };
    for (var _i = 0, users_3 = users_1.users; _i < users_3.length; _i++) {
        var user = users_3[_i];
        _loop_2(user);
    }
    return nationalities.length;
}
function notExampleDomain() {
    return users_1.users.filter(function (user) { return !/@example\.com$/.test(user.email); });
}
function mostCommanEmail() {
    var domains = [];
    var _loop_3 = function (user) {
        // get only domain part of email
        var userDomain = user.email.split('@')[1];
        // either increment domain count or add new one if not found yet
        if (domains.some(function (domain) { return domain.domain === userDomain; })) {
            var domain = domains.find(function (domain) { return domain.domain === userDomain; });
            if (domain)
                domain.count++;
        }
        else {
            domains.push({ 'domain': userDomain, 'count': 1 });
        }
    };
    for (var _i = 0, _a = notExampleDomain(); _i < _a.length; _i++) {
        var user = _a[_i];
        _loop_3(user);
    }
    return domains.sort(function (a, b) { return a.count - b.count; })[0];
}
console.log(mostCommanEmail());
