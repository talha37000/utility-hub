const hourEL = document.querySelector(".hour");
const minuteEL = document.querySelector(".minute");
const secondEL = document.querySelector(".second");

updateTime();
function updateTime() {
    const clockTime = new Date();
    setTimeout(updateTime, 1000);
    const getHour = clockTime.getHours();
    const getMinute = clockTime.getMinutes();
    const getSecond = clockTime.getSeconds();

    const hourDeg = (getHour / 12) * 360;
    hourEL.style.transform = `rotate(${hourDeg}deg)`;
    const minuteDeg = (getMinute / 60) * 360;
    minuteEL.style.transform = `rotate(${minuteDeg}deg)`;
    const secondDeg = (getSecond / 60) * 360;
    secondEL.style.transform = `rotate(${secondDeg}deg)`;




}