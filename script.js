const Player = (playerName, gamePiece) => {
    let isTurn = false;
    const setName = (name) => (playerName = name);
    const setPiece = (piece) => (gamePiece = piece);
    const getName = () => playerName;
    const getPiece = () => gamePiece;
    return {isTurn, setName, setPiece, getName, getPiece};
};

const Players = (() => {
    const playersArray = [Player("player1", "X"), Player("player2", "O")];
    playersArray[0].isTurn = true;
    const getPlayersArray = () => playersArray;
    const changeTurns = () => {
        for (let i = 0; i < playersArray.length; i++) {
            playersArray[i].isTurn = !playersArray[i].isTurn;
        }
        console.log("TURNS CHANGED");
    };
    const makeMove = (position) => {
        for (let i = 0; i < playersArray.length; i++) {
            if (playersArray[i].isTurn) {
                if (
                    gameBoard.placePiece(position, playersArray[i].getPiece())
                ) {
                    changeTurns();
                }
                break;
            }
        }
    };
    const showWinner = (gamePiece) => {
        for (let i = 0; i < playersArray.length; i++) {
            if (playersArray[i].getPiece() === gamePiece) {
                console.log(playersArray[i].getPiece() + " is the winner!");
            }
        }
    };
    return {getPlayersArray, makeMove, showWinner};
})();

const gameBoard = (() => {
    let gameOver = false;
    const board = [
        {value: "", position: 0},
        {value: "", position: 1},
        {value: "", position: 2},
        {value: "", position: 3},
        {value: "", position: 4},
        {value: "", position: 5},
        {value: "", position: 6},
        {value: "", position: 7},
        {value: "", position: 8},
    ];

    const isLegalMove = (position) => {
        return board[position].value === "";
    };

    const comparePositions = (position1, position2) => {
        for (let i = 0; i < position2.length; i++) {
            if (!position1.includes(position2[i])) {
                console.log(position1, position2);
                return false;
            }
        }
        return true;
    };

    const checkForWin = () => {
        const winningPositions = [
            [0, 1, 2],
            [0, 4, 8],
            [0, 3, 6],
            [2, 5, 8],
            [2, 4, 6],
            [1, 4, 7],
            [3, 4, 5],
            [6, 7, 8],
        ];
        for (const player of Players.getPlayersArray()) {
            const playerPiece = player.getPiece();
            const playerPosition = board
                .filter((element) => {
                    if (element.value === playerPiece) {
                        return element.position;
                    }
                })
                .map((element) => Number(element.position));
            if (playerPosition.length < 3) return false;
            for (const position of winningPositions) {
                if (comparePositions(playerPosition, position)) {
                    console.log("RUNNING SHOW WINNER");
                    Players.showWinner(playerPiece);
                    return true;
                }
            }
        }
        return false;
    };

    const placePiece = (position, gamePiece) => {
        if (isLegalMove(position)) {
            board.splice(position, 1, {
                value: `${gamePiece}`,
                position: `${position}`,
            });
            checkForWin();
            return true;
        } else {
            console.log("ILLEGAL MOVE");
            return false;
        }
    };
    const getBoard = () => board;

    return {placePiece, getBoard};
})();

// USER INTERFACE
const displayController = (() => {
    const boardContainer = document.querySelector(".board");
    const createBoardElement = (position) => {
        const boardElement = document.createElement("div");
        boardElement.classList.add("board-element", "container");
        boardElement.onclick = (e) => {
            const position = e.target.getAttribute("data-position");
            Players.makeMove(position);
            displayBoard(gameBoard.getBoard());
        };
        boardElement.setAttribute("data-position", position);
        boardElement.textContent = gameBoard.getBoard()[position].value;
        return boardElement;
    };
    const displayBoard = () => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }

        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            boardContainer.appendChild(createBoardElement(i));
        }
    };
    return {displayBoard};
})();

window.onload = displayController.displayBoard();
