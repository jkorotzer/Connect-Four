function addPieceToBoard(column, color) {
    var rowHeight = board.rowState[column];
    $("#row" + rowHeight).find("." + column).html(color);
}

function takeTurn(column, currentPlayer) {
    if (board.checkWin(column, currentPlayer)) {
        playing = false;
        alert("winner!");
    }
    board.play(column, currentPlayer);
    if (currentPlayer === player) {
        addPieceToBoard(column, red);
    } else {
        addPieceToBoard(column, black);
    }
}

function play(move) {
    if (playing) {
        if (!board.canPlay(move)) {
            alert("invalid move");
        } else {
            takeTurn(move, player);
            if (playing) {
                logic.nextMove(board, comp, logic.loseScore, logic.winScore, 0, []);
                takeTurn(logic.bestMove, comp);
            }
        }
    }
}