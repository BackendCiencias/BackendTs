"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daySetTime = void 0;
const daySetTime = (timeAdd) => {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + timeAdd;
    now.setTime(expireTime);
    return now;
};
exports.daySetTime = daySetTime;
//# sourceMappingURL=dayTime.js.map