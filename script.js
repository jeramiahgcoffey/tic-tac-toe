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
    const changeTurn = () => {
        for (let i = 0; i < playersArray.length; i++) {
            playersArray[i].isTurn = !playersArray[i].isTurn;
            console.log("TURNS CHANGED");
        }
    };
    const makeMove = (position) => {
        for (let i = 0; i < playersArray.length; i++) {
            if (playersArray[i].isTurn) {
                if (
                    gameBoard.placePiece(position, playersArray[i].getPiece())
                ) {
                    changeTurn();
                }
                break;
            }
        }
    };
    return {changeTurn, makeMove};
})();

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const isLegalMove = (position) => {
        return board[position] === "";
    };
    const placePiece = (position, gamePiece) => {
        if (isLegalMove(position)) {
            board.splice(position, 1, gamePiece);
            return true;
        } else {
            console.log("Illegal Move");
            return false;
        }
    };
    const getBoard = () => board;
    return {placePiece, getBoard};
})();

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
        boardElement.textContent = gameBoard.getBoard()[position];
        return boardElement;
    };
    const displayBoard = (boardArray) => {
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }

        for (let i = 0; i < boardArray.length; i++) {
            boardContainer.appendChild(createBoardElement(i));
        }
    };
    return {displayBoard};
})();

displayController.displayBoard(gameBoard.getBoard());
// const player1 = Player("Jeramiah", "X");
// player1.makeMove(2);
