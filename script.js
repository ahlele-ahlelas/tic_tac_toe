let boxes = document.querySelectorAll('.box');
let reset_btn = document.querySelector('#reset');
let win_msg = document.querySelector('.msg');
let reset_game_btn = document.querySelector('#reset');
let new_game_btn = document.querySelector('#new_game');


let turnO = true;
let moveCount = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    win_msg.classList.add('hide');
}
const newGame = () => {
    resetGame();
}


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = 'O';
            box.classList.add('o-mark');
        } else {
            box.innerText = 'X';
            box.classList.add('x-mark');
        }
        turnO = !turnO;
        box.disabled = true;
        moveCount++;
        checkWinner();
    });
});

const message=(winner)=>{
    win_msg.innerText = `Congratulations! ${winner} wins!`;
    win_msg.classList.remove('hide');
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = '';
        box.classList.remove('x-mark', 'o-mark');
    }
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            message(pos1);
            disableBoxes();
            return;
        }
    }
    if (moveCount === 9) {
        win_msg.innerText = "It's a draw!";
        win_msg.classList.remove('hide');
    }
}

reset_game_btn.addEventListener('click', resetGame);
new_game_btn.addEventListener('click', newGame);