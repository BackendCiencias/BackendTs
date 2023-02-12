export const daySetTime = (timeAdd : number) =>{
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + timeAdd;
    now.setTime(expireTime);
    return now;
}