
let input=''//to store no button as string
let remSeconds=0;//we convert everything to total seconds, and just subtract 1 every second. total secs left
let timer=null;//timer not started
let paused =false;//continue from the same time,Timer is either running or reset

//converts it into a timer format:

function formatTimeFromInput(inputstr){
    const digits= inputstr.padStart(6,'0')// input string always has 6 digits,   local variable
    const hours=digits.slice(0,2);    //.slice(start, end)
    const mints=digits.slice(2,4)
    const secs=digits.slice(4,6)
    return `${hours}h ${mints}m ${secs}s`   //time in formatted form

}

function updateDisplay(){
 document.getElementById("timerdisplay").textContent=formatTimeFromInput(input)
}



function addDigit(value){
    if(input.length >=6 || timer) return;
    input=input+value;
    input=input.slice(0,6)// Only 6 digits max
    updateDisplay()
}

function backspace(){
    if(timer) return;
    input=input.slice(0,-1);//	Remove the last digit
    updateDisplay();
}

//convert into totalseconds
function getTotalSeconds(){
    const digits=input.padStart(6,'0');
    const hrs=parseInt(digits.slice(0,2,10))   //converts it to a number-parseint(string, radix)
    const mints=parseInt(digits.slice(2,4),10) //10--predict as a decimal number
    const secs=parseInt(digits.slice(4,6),10)
    return hrs * 3600 + mints * 60 + secs;
}

function start(){
    if(timer||!input) return   // prevents multiple timers from running.
    
    remSeconds=getTotalSeconds();
    if(remSeconds<=0) return;

    timer=setInterval(() => {
       if(remSeconds<=0){
        clearInterval(timer) //stops
        timer=null;
        const sound = new Audio('https://example.com/alarm.mp3');
        sound.play()
        alert("Times's Up");
        return;
       } 
       remSeconds--;
       const hrs=String(Math.floor(remSeconds / 3600)).padStart(2,'0')
       const mints=String(Math.floor((remSeconds % 3600) /60)).padStart(2,'0')
       const secs=String(remSeconds % 60).padStart(2,'0')
       document.getElementById('timerdisplay').textContent=`${hrs}h ${mints}m ${secs}s`
    }, 1000);
}

function pause(){
    if(timer)//checks if a timer is currently running
    clearInterval(timer)//stops the countdown
    timer=null
}

function reset(){
    pause();
    input='';//clear input value
    updateDisplay();
}

updateDisplay() //Initialize on load,00h 00m 00s is shown even before the user enters anything.
