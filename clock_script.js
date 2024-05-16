

(function() { // Encapsulate in an anonymous function to protect namespace

const dayFromNumber = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthFromNumber = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const schedules = function(){
    try{
        return JSON.parse(scheduleStr)
    }
    catch(e){
        alert(e.message)
    }
    return null
}();
var sched = null;
const time = new Date();
var lastSecond = -1;
var lastMinute = -1;
var lastHour = -1;
var schedIndex = -1;
var time_remaining = -1;

/* Main function to update the data in the page at a set interval
*/
function update() {
    time.setTime(Date.now());
    let s = time.getSeconds();
    
    if (s != lastSecond) { // Don't do anything if seconds haven't changed
        lastSecond = s;

        let m = time.getMinutes();
        let h = time.getHours();

        if (m != lastMinute) { // Maybe change schedule info when minute changes
            lastMinute = m;
            if(sched !== null || setSchedule()) updateBlockInfo();

            if (h != lastHour) {// Update day of week and date and get new daily schedule when hour changes
                lastHour = h;
                updateCalendarInfo();
                if(h == 0) setSchedule();
            }
        }
        updateClocks(h, m, s);
    }
}
window.setInterval(update, 100);


function updateClocks(h, m, s){
    let ampm = h < 12? "AM": "PM";
    let h12 = h > 12? h - 12: h == 0? 12: h;
    let mStr = String(m).padStart(2, '0');
    let sStr = String(s).padStart(2, '0');

    document.getElementById("top_left_clock_span").innerHTML = `${h12}:${mStr}:${sStr}&nbsp;${ampm}`;
    document.getElementById("time_span").innerHTML = `${h12}:${mStr}&nbsp;${ampm}`;

    // Compute time left
    if(sched !== null && schedIndex >= 0){
        if(schedIndex < sched.length){
            let endh = 0;
            let endm = 0;
            if(schedIndex == sched.length - 1){
                // At last item
                endh = 24;
                endm = 0;
                document.getElementById("time_left_title").innerHTML = "Time Until Tomorrow";
                document.getElementById("next_block_at").innerHTML = "";
            }
            else{
                let nextStart = sched[schedIndex + 1].start.split(":");
                endh = parseInt(nextStart[0]);
                endm = parseInt(nextStart[1]);
                let lunchNext = sched[schedIndex + 1].type == "Lunch";
                document.getElementById("time_left_title").innerHTML = `Time Until ${lunchNext?"":"Next "}${sched[schedIndex + 1].type}`;
                document.getElementById("next_block_at").innerHTML = `${lunchNext?"":"Next " }${sched[schedIndex + 1].type} at ${sched[schedIndex + 1].start}`;
            }
            let timeLeft = 60 * (endm + 60 * endh) - (s + 60 * (m + 60*h));

            let hLeft = Math.floor(timeLeft / 3600);
            let mLeft = Math.floor(timeLeft/60) - hLeft * 60;
            let sLeft = timeLeft - 60 * mLeft - 3600 * hLeft;

            document.getElementById("time_left").innerHTML = `${hLeft}h ${mLeft}m ${sLeft}s`;
        }
        else {
            noBlockInfo();
        }
    }
}


function setSchedule(){
    let dayNum = time.getDay();
    if(schedules !== null) {
        for(let i=0; i < schedules.length; i++) {
            if(schedules[i].days.indexOf(dayNum) > -1){
                sched = schedules[i].values;
                sched.sort(function(a,b){return a.start.localeCompare(b.start)});
                schedIndex = -1;
                time_remaining = -1;
                updateBlockInfo();
                return true;
            } 
        }
    }
    sched = null;
    return false
}


function noBlockInfo(){
    document.getElementById("cur_block").innerHTML = "";
    document.getElementById("next_block_at").innerHTML = "";
    document.getElementById("time_left_title").innerHTML = "";
    document.getElementById("time_left").innerHTML = "";
    document.getElementById("rounded").styles.backgroundColor = "rgba(13, 9, 10, .55)";
}


function updateBlockInfo(){
    if (sched === null) {
        noBlockInfo();
        return;
    }

    // Get the current block index
    // time as string to compare with entries in schedule
    var timeStr = `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`;
    // sentinel value. Expected to be changed.
    schedIndex = -1;
    if(timeStr > sched[sched.length - 1].start){ //We are in the last block on this day's schedule
        schedIndex = sched.length - 1;
    }
    else {
        for(let i = 0; i < sched.length - 1; i++){
            if(timeStr < sched[i + 1].start) {
                schedIndex = i;
                break;
    }   }   }
    
    if(schedIndex < 0){
        noBlockInfo();
        return;
    }
    // If we got here, we are in a block and the next block exists
    document.getElementById("cur_block").innerHTML = sched[schedIndex].text;
    document.getElementById("rounded").style.backgroundColor = `rgba(${sched[schedIndex].colour}, .55)`;
}


function updateCalendarInfo(){
    document.getElementById("date").innerHTML = `${dayFromNumber[time.getDay()]}, ${monthFromNumber[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;
}

/* Runs at interval to refresh Dad joke.
*/
async function updateDadJoke() {
    const url = "https://icanhazdadjoke.com/";
    let html = "";
    try {
        let response = await fetch(url, {headers:{ Accept: "application/json",},});
        let resObj = await response.json();
        if(resObj.status == 200){
            html = resObj.joke;
        } 
    } catch (error) {
        console.log(error)
    }
    let div = document.getElementById("joke_div")
    if(html.length > 109){
        div.style.fontSize = "1.875rem";
        div.style.lineHeight = "2.25rem";
    }
    else {
        div.style.fontSize = "2.25rem";
        div.style.lineHeight = "2.5rem";
    }
    div.innerHTML = html;
}
updateDadJoke();
window.setInterval(updateDadJoke, 3*60*1000);


/*
 * Code for animating the background canvas.
*/
(function(){
    const baseline = 128;

    const c = document.getElementById("canv");
    const $ = c.getContext("2d");

    const col = (x, y, r, g, b) => {
      $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      $.fillRect(x, y, 1, 1);
    };

    const preCalR = [];
    (function(){
        for(let x = 0; x < 36; x++){
            preCalR[x] = [];
            for(let y = 0; y < 36; y++){
                preCalR[x][y] = 1.0 * (x * x - y * y) / 300;
            } } })();
    const R = function (x, y, t) {
        // Repeats for t multiples of 2PI
      return Math.floor(baseline + 64 * Math.cos(preCalR[x][y] + t));
    };
    
    const preCalG = [];
    (function(){
        for(let i = 0; i < 36; i++){
            preCalG[i] = 1.0 * i * i / 300;
        } })();
    const G = (x, y, cost4, sint3) => {
        // Repeats for t multiple of 12 * 2PI
      return Math.floor(
        baseline + 64 * Math.sin(preCalG[x] * cost4 + preCalG[y] * sint3)
      );
    };
    
    const preCalB = [];
    (function(){
        for(let x = 0; x < 36; x++){
            preCalB[x] = [];
            for(let y = 0; y < 36; y++){
                preCalB[x][y] = ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100;
            } } })();
    const B = function (x, y, sint9) {
        // Repeats for t muliple of 9 * 2PI
      return Math.floor(baseline + 64 * Math.sin(5 * sint9 + preCalB[x][y]));
    };

    var t = 0;
    var countdown = 0;
    const topT = 9 * 4 * 2 * Math.PI; 

    var run = function () {
        if (countdown > 0){
            countdown -= 1;
        }
        else {
            countdown = 10;
            var cost4 = Math.cos(t / 4);
            var sint3 = Math.sin(t / 3);
            var sint9 = Math.sin(t / 9);
            for (let x = 0; x <= 35; x++) {
                for (let y = 0; y <= 35; y++) {
                  col(x, y, R(x, y, t), G(x, y, cost4, sint3), B(x, y, sint9));
                  //col(x, y, 128, 128, B(x, y, sint9));
                }
              }
              t = t + 0.05;
              if (t > topT) t -= topT;
        }
    window.requestAnimationFrame(run);  
    };
    run();
})();

})();
