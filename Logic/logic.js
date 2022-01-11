boxes = Array.from(document.getElementsByClassName("box"));
var turn = "X";
var music = new Audio("../media/music.mp3");
var audiovalid = new Audio("../media/valid.mp3");
var audioinvalid = new Audio("../media/invalid.mp3");
boxes.forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", (e) => {
        if (boxtext.innerText == "") {
            audiovalid.play();
            boxtext.innerText = turn;
            if (checkforwin() === 0) {
                turn = (turn === "X" ? "O" : "X");
                players = Array.from(document.querySelectorAll(".player"));
                console.log(players);
                if (turn === "X") {
                    players[0].style["text-decoration"] = "underline";
                    players[1].style["text-decoration"] = "none";
                }
                else if (turn === "O") {
                    players[0].style["text-decoration"] = "none";
                    players[1].style["text-decoration"] = "underline";
                }
            }
            else {
                let board = document.getElementById("board");
                board.style["display"] = "none";
                info = document.getElementById("info");
                info.style["display"] = "flex";
                music.play();
                reset.innerText = "Play Again";
                para = document.getElementById("congrats");
                para.innerText = `Player ${turn == "X" ? 1 : 2} Won!!`;
                para.style["display"] = "inline-block";
            }
        }
        else {
            audioinvalid.play();
        }
    })
});

boxes.forEach(element => {
    element.addEventListener("mouseover", () => {
        if (element.querySelector(".boxtext").innerText !== "") {
            element.style["background-color"] = "#f48c8c";
        }
        else {
            element.style["background-color"] = "#adf4ad";
        }
    })
});

boxes.forEach(element => {
    element.addEventListener("mouseout", () => {
        element.style["background-color"] = "azure";
    })
});

checkforwin = () => {
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]]
    flag = 0;
    wins.forEach(w => {
        boxtext = document.getElementsByClassName("boxtext");
        if ((boxtext[w[0]].innerText === boxtext[w[1]].innerText) &&
            (boxtext[w[1]].innerText === boxtext[w[2]].innerText) &&
            (boxtext[w[0]].innerText !== "")) {
            flag = 1;
        }
    });
    return flag;
}

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    let boxtext = Array.from(document.querySelectorAll(".boxtext"));
    boxtext.forEach(element => {
        element.innerText = "";
    });
    reset.innerText = "reset";
    let board = document.getElementById("board");
    board.style["display"] = "grid";
    info = document.getElementById("info");
    info.style["display"] = "none";
    music.pause();
    turn = "X";
})