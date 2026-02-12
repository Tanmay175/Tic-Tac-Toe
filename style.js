const boxes=document.querySelectorAll(".box")
const board=document.getElementById("board")
const winner=document.getElementById("winner")
const newgame=document.getElementById("new")
const reset=document.getElementById("reset")
const turn=document.getElementById("turn")

let turno=true;
let cnt=0

const win=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

board.addEventListener("click",(e)=>{
    if(!e.target.classList.contains("box")) return
    if(e.target.innerText===""){
        vibrate(60);
        if(turno)  e.target.innerText="O"
        else e.target.innerText="X";
        turno=!turno
        turn.textContent = turno ? "O's Turn" : "X's Turn";

        check()
    }
})
    // winner.textContent=pos1
function showwinner(pos1,pattern){
    winner.textContent=`🎉 ${pos1} is the winner 🎉`
    board.style.pointerEvents="none"
    pattern.forEach(num=>{
        boxes[num].style.color="pink"
        boxes[num].style.backgroundColor = "rgba(255,105,180,0.3)" 
    })
}

function check(){
     cnt=cnt+1
    for(pattern of win){
       let pos1= boxes[pattern[0]].innerText
       let pos2= boxes[pattern[1]].innerText
       let pos3= boxes[pattern[2]].innerText
        
       if(pos1==pos2 && pos2==pos3){
        if(pos1==="") continue;
        showwinner(pos1,pattern);
       }
    }
    if(cnt==9){
        winner.textContent=`The match is draw`
    }
    
}

newgame.addEventListener("click",clear)
reset.addEventListener("click",clear)
function clear(){
    vibrate(30)
    boxes.forEach(box=>{
        box.innerText=""
        box.style.color=""
        box.style.backgroundColor ="" 
    })
    winner.textContent=""
    turno=true
    board.style.pointerEvents = "auto";
   turn.textContent="O's Turn"
}

function vibrate(ms){
    if(navigator.vibrate) navigator.vibrate(ms)
}