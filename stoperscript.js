let seconds=0;//It stores the total time passed in seconds.
let timer=null;//no timer runing yet

function updatedisplay(){
 const hours=String(Math.floor(seconds/3600)).padStart(2,'0')
 const mins=String(Math.floor((seconds%3600)/60)).padStart(2,'0')
 const secs=String(seconds % 60).padStart(2, '0');
 
 document.getElementById("display").textContent=`${hours}:${mins}:${secs}`;
}

function start(){
 if(timer!==null) return; // Don't start again if already running
 timer=setInterval(()=>{
    seconds++;
    updatedisplay();
 },1000);
}

function pause(){
  clearInterval(timer);
  timer=null;
}

function reset(){
    pause();
    seconds=0;
    updatedisplay();
}
