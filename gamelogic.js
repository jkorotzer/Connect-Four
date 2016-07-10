var GameLogic = function() {
    this.winScore = 1000;
    this.loseScore = -1000;
    this.maxDepth = 9;
    this.bestMove = -1;
}

GameLogic.prototype = {
    scoreBoard: function(board) {
        var score = 0;
        for(var i = 10; i < 63; i++) {
            if ((i+1) % 9 != 0 && i % 9 != 0) {
                if (board.checkWin(i, player) && !board.checkWin(i-9, comp)) {
                    score--;
                } else if(board.checkWin(i, comp) && !board.checkWin(i-9, player)){
                    score+=5;
                }
            }
        }
        return score;
    },
    nextMove: function(board, currentPlayer, alpha, beta, depth, cache) {
        if (depth >= this.maxDepth) {
            return this.scoreBoard(board);
        }
        var best = 0;
        var alphas = [];
        var moves = board.getMoves();
        var key = board.key();
        if (key in cache) {
            return cache[key];
        } 
        if (currentPlayer === comp) {
            best = this.loseScore; //maximizing player
            for (move in moves) {
                var boardCopy = board.copy();
                if (boardCopy.checkWin(moves[move], comp)) {
                    if (depth === 0) {
                        this.bestMove = moves[move];
                    }
                    cache[key] = this.winScore - depth;
                    return (this.winScore - depth);
                } else {
                    boardCopy.play(moves[move], comp);
                    var sub = this.nextMove(boardCopy, player, alpha, beta, depth + 1, cache);
                    best = Math.max(best, sub);
                    alpha = Math.max(alpha, sub);
                    if (alpha >= beta) {
                        break;
                    }
                }
                if (depth === 0) {
                    alphas.push(best);
                }
            }
        } else {
            best = this.winScore; //minimizing player
            for(move in moves) {
                var boardCopy = board.copy();
                if (boardCopy.checkWin(moves[move], player)) {
                    cache[key] = this.loseScore + depth;
                    return (this.loseScore + depth);
                } else {
                    boardCopy.play(moves[move], player);
                    var sub = this.nextMove(boardCopy, comp, alpha, beta, depth + 1, cache);
                    best = Math.min(best, sub);
                    beta = Math.min(beta, sub);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        if (depth === 0) {
            console.log(alphas);
            var bestValue = -1001;
            for(var i = 0; i < alphas.length; i++) {
                if (alphas[i] > bestValue) {
                    bestValue = alphas[i];
                    this.bestMove = moves[i];
                }
            }
        }
        cache[key] = best;
        return best;
    }
}