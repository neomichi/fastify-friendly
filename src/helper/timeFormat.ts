let dateTime = new Date();

let day = ("0" + dateTime.getDate()).slice(-2);

let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);

let year = dateTime.getFullYear();

// get current hours
let hours = dateTime.getHours();

// get current minutes
let minutes = dateTime.getMinutes();

// get current seconds
let seconds = dateTime.getSeconds();


export const currenttime=year + "-" + month + "-" + day + "-" + hours + "-" + minutes + "-" + seconds+'.txt'
export const currentDate=year + "." + month + "." + day +'.txt'