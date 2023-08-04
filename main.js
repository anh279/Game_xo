var c = document.querySelectorAll(".cell");
console.log(c.length);
var board = [];
for (var i = 0; i < c.length; i++) {
    board.push("");
}
console.log(board);
//const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

function makeMove(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].innerText =
            currentPlayer;
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
        } else if (board.every((cell) => cell !== "")) {
            alert("Hòa");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// function checkWin(player) {
//     // Kiểm tra hàng
//     for (let row = 0; row < 5; row++) {
//         if (
//             board[row * 5] === player &&
//             board[row * 5 + 1] === player &&
//             board[row * 5 + 2] === player &&
//             board[row * 5 + 3] === player &&
//             board[row * 5 + 4] === player
//         ) {
//             return true;
//         }
//     }

//     // Kiểm tra cột
//     for (let col = 0; col < 5; col++) {
//         if (
//             board[col] === player &&
//             board[col + 5] === player &&
//             board[col + 10] === player &&
//             board[col + 15] === player &&
//             board[col + 20] === player
//         ) {
//             return true;
//         }
//     }

//     // Kiểm tra đường chéo chính
//     if (
//         board[0] === player &&
//         board[6] === player &&
//         board[12] === player &&
//         board[18] === player &&
//         board[24] === player
//     ) {
//         return true;
//     }

//     // Kiểm tra đường chéo phụ
//     if (
//         board[4] === player &&
//         board[8] === player &&
//         board[12] === player &&
//         board[16] === player &&
//         board[20] === player
//     ) {
//         return true;
//     }

//     return false;
// }
function checkWin(player) {
    const rows = 7; // Kích thước hàng
    const cols = 7; // Kích thước cột

    // Kiểm tra hàng
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 4; col++) {
            let win = true;
            for (let i = 0; i < 5; i++) {
                if (board[row * cols + col + i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
    }

    // Kiểm tra cột
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 4; row++) {
            let win = true;
            for (let i = 0; i < 5; i++) {
                if (board[(row + i) * cols + col] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
    }

    // Kiểm tra đường chéo chính
    for (let row = 0; row < rows - 4; row++) {
        for (let col = 0; col < cols - 4; col++) {
            let win = true;
            for (let i = 0; i < 5; i++) {
                if (board[(row + i) * cols + col + i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
    }

    // Kiểm tra đường chéo phụ
    //row < 3 -> 0;
    for (let row = 0; row < rows - 4; row++) {
        //col = 6 -> 4;
        for (let col = cols - 1; col >= 4; col--) {
            let win = true;
            for (let i = 0; i < 5; i++) {
                //TH1
                //TH1: board[6],board[12],board[18],board[24],board[30] với row = 0 và col = 6
                //TH2: board[5],board[11],board[17],board[23],board[29] với row = 0 và col = 5
                //TH3: board[4],board[10],board[16],board[22],board[28] với row = 0 và col = 4
                //TH2
                //TH1: board[13],board[19],board[25],board[31],board[37] với row = 1 và col = 6
                //TH2: board[12],board[18],board[24],board[30],board[36] với row = 1 và col = 5
                //TH3: board[11]],board[17],board[23],board[29],board[35] với row = 1 và col = 4
                if (board[(row + i) * cols + col - i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
    }

    return false;
}

function resetBoard() {
    board.fill("");
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
    currentPlayer = "X";
}
