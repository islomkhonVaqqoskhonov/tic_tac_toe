class Game {
    constructor(name) {
        this.name = name;
    }
}

class TicTacToeGame extends Game {
    #board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
    #turnOfx = true;
    #gameOver = false;
    #scoreX = 0;
    #scoreO = 0;


    constructor() {
        super("tic-tac-toe");
        this.showState();
    }

    get scoreX() {
        return this.#scoreX;
    }

    get scoreO() {
        return this.#scoreO;
    }

    get turnOfx() {
        return this.#turnOfx;
    }

    get board() {
        return this.#board;
    }

    // tear - Yurish qilish
    tear(x, y) {
        if (!this.#gameOver) {
            if (!this.#isCellEmpty(x, y)) {
                console.log(`(${x} : ${y}) - JOY BAND`);
                alert("! JOY BAND ")
            } else {
                this.#board[y][x] = this.#turnOfx ? "X" : "O";

                const winner = this.#checkWinner();
                if (winner) {
                    this.#gameOver = true;
                    if (winner === "DRAW") {
                        console.log("DRAW");
                        alert("!DURRANG")
                    } else {
                        if (winner === "X") {   
                            this.#scoreX++;
                            alert("X => winner")
                        }
                        else {
                            this.#scoreO++;
                            console.log(`WINNER: ${winner}`);
                            alert("O - g'olib. YAHUU")
                        }
                    }
                }

                this.#turnOfx = !this.#turnOfx;
            }

            this.showState();
        }
    }

    showState() {
        console.log(`X: ${this.#scoreX} .........  O: ${this.#scoreO}`);
        console.log(`Hozirgi navbat : ${this.#turnOfx ? "X" : "O"}`);
        console.table(this.#board);
    }

    continue() {
        this.#board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        this.#turnOfx = true;
        this.#gameOver = false;
        this.showState();
        this.tear()
    }

    restart() {
        // this.#scoreX = 0;
        // this.#scoreO = 0;
        this.continue();
    }

    #checkWinner() {
        for (let i = 0; i < this.#board.length; i++) {
            const row = this.#board[i];

            // gorizaltal yo'nalishda g'olibni aniqlash
            if (row[0] !== " " && row[0] === row[1] && row[0] === row[2]) {
                // this.continue()
                return row[0];

            }

            // vertical yo'nalishda g'olibni aniqlash
            if (i === 0) {
                const secondRow = this.#board[1];
                const thirdRow = this.#board[2];

                for (let j = 0; j < 3; j++) {
                    if (row[j] !== " " && row[j] === secondRow[j] && row[j] === thirdRow[j]) {
                        /**
                         * Buni yoqsam ishlamadi achkolarni hisoblamayapti 
                         * Lekin restart functionini btn ga biriktirib qo'ysam ishladi
                         * Nega ?????
                         */
                        // this.continue()
                        return row[j];
                    }
                }
            }
        }

        // diaganal yo'nalishda g'olibni aniqlash

        if (this.#board[0][0] !== " " && this.#board[0][0] === this.#board[1][1] && this.#board[0][0] === this.#board[2][2]) {
            return this.#board[0][0];
        }

        if (this.#board[2][0] !== " " && this.#board[2][0] === this.#board[1][1] && this.#board[2][0] === this.#board[0][2]) {
            return this.#board[2][0];
        }

        let isDraw = this.#board.every((row) => row.every((place) => place !== " "));

        if (isDraw) return "DRAW";

        return false;
    }

    #isCellEmpty(x, y) {
        return this.#board[y][x] === " ";
    }
}

class TicTacToeGameWithBetterUI extends TicTacToeGame {
    #board;
    #turnOfx = true;
    #gameOver = false;
    #scoreX;
    #scoreO;
    #JOIN = "           ";

    constructor() {
        super();
    }

    showState() {
        const hisob = document.querySelector(".hisob");
        hisob.innerHTML = `X : ${this.scoreX} BALL....................... O: ${this.scoreO} BALL`;

        const navbat = document.querySelector(".kimni-navbati");
        navbat.innerHTML = `Bittasini tanlen! =>  ${this.turnOfx ? "X" : "O"}`;

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const selector = `.c${i * 3 + j + 1}`;
                const cell = document.querySelector(selector);

                cell.innerHTML = this.board[i][j];
            }
        }
    }
}

// const game1 = new TicTacToeGame();
// game1.tear(0, 0); // x
// game1.tear(0, 2); // y
// game1.tear(1, 1); // x
// game1.tear(1, 2); // y
// game1.tear(2, 2); // x
// game1.tear(0, 1); // y
// game1.restart();

var game1 = new TicTacToeGame();
var game = new TicTacToeGameWithBetterUI();
