const boxes = document.querySelectorAll(".box");
const game_info = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".button");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame()
{
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGamebtn.classList.remove('active');
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        if(box.classList.contains("win"))
            box.classList.remove("win");
    })
    game_info.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

boxes.forEach((box,index) => {
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

function checkGameover(){
    let answer = "";
    winningPositions.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== ""  || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            if(gameGrid[position[0]] === "X")
                answer = "X";

            else
                answer = "O";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    
    if(answer !== "")
    {
        game_info.innerText = `Winner - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }

    let filledCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            filledCount++;
    })

    if(filledCount === 9)
    {
        game_info.innerText = `Game Tied!`;
        newGamebtn.classList.add("active");
        return;
    }
}

function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameover();
    }
}

function swapTurn(){
    if(currentPlayer === "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";

    game_info.innerText = `Current Player - ${currentPlayer}`;
}

newGamebtn.addEventListener('click',initGame);