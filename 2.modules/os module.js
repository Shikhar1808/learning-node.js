const os = require("os");
const user = os.userInfo();
console.log(user); //to get info about current user
console.log(`The system uptime is${os.uptime()} seconds`);//to get useruptime
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
};
console.log(currentOS);