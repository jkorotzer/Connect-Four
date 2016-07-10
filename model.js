var Board = function() {
    this.empty = 0;
    this.red = 1;
    this.black = 2;
    
    this.gameState = [];
    this.rowState = [];
    for(var i = 0; i < 72; i++) {
        this.gameState.push(0);
    }
    
    for(var i = 0; i < 8; i++) {
        this.rowState.push(0); //dummy row in front so we can index as 1-7
    }
}

Board.prototype = {
    copy: function() {
        var board = new Board();
        for(var i = 0; i < 72; i++) {
            board.gameState[i] = this.gameState[i];
        }
        for(var i = 0; i < 8; i++) {
            board.rowState[i] = this.rowState[i];
        }
        return board;
    },
    getPos: function(row) {
        if (row > 7) {
            return row;
        }
        var pos = (parseInt((parseInt(this.rowState[row]) + parseInt(1))) * parseInt(9)) + parseInt(row);
        return pos;
    },
    play: function(row, player) {
        var pos = this.getPos(row);
        this.gameState[pos] = parseInt(player);
        this.rowState[row]++;
    },
    canPlay: function(row) {
        if (this.rowState[row] >= 6) {
            return false;
        }
        if (row < 1 || row > 7) {
            return false;
        }
        return true;
    },
    checkWin: function(row, player) {
        var pos = this.getPos(row);
        if (this.gameState[pos] === 0) {
            this.gameState[pos] = player;
            var win = this.checkHorizontal(pos) || this.checkVertical(pos) || this.checkDiagonal(pos);
            this.gameState[pos] = 0;
            return win;
        } 
        return false;
    },
    checkHorizontal: function(pos) {
        for(var i = pos - 3; i <= pos; i++) { //check horizontal around piece
            if (this.gameState[i] === this.gameState[i+1] && this.gameState[i+1] === this.gameState[i+2] && this.gameState[i+2]=== this.gameState[i+3]) {
                return true;
            }
        }
        return false;
    },
    checkVertical: function(pos) {
        if (pos < 37) {
            return false;
        }
        if (this.gameState[pos] === this.gameState[pos-9] && this.gameState[pos-9] === this.gameState[pos-18] && this.gameState[pos-18]===this.gameState[pos-27]) {
            return true;
        }
        return false;
    },
    checkDiagonal: function(pos) {
        var counter = 0;
        var check = pos;
        while (check > 10 && counter < 3) {
            check -= 10;
            counter += 1;
        }
        for(var i = check; i <= pos; i += 10) {
            if ((i + 30 < 72) && (i + 20 < 72) && (i + 10 < 72)) {
                if(this.gameState[i] === this.gameState[i+10] && this.gameState[i+10] === this.gameState[i+20] && this.gameState[i+20] === this.gameState[i+30]){
                    return true;
                }
            }
        }
        var secondCounter = 0;
        var secondCheck = pos;
        while (secondCheck > 10 && secondCounter < 3) {
            secondCheck -= 8;
            secondCounter += 1;
        }
        for(var i = secondCheck; i <= pos; i += 8) {
            if ((i + 8 < 72) && (i + 16 < 72) && (i + 24 < 72)) {
                if(this.gameState[i] === this.gameState[i+8] && this.gameState[i+8] === this.gameState[i+16] && this.gameState[i+16] === this.gameState[i+24]){
                    return true;
                }
            }
        }
        return false;
    },
    getMoves: function() {
        var moves = [];
        for(var i = 1; i <= 7; i++) {
            if (this.rowState[i] < 6) {
                moves.push(i);
            }
        }
        return moves;
    },
    unmove: function(row) {
        this.rowState[row] -= 1;
        var pos = this.getPos(row);
        this.gameState[pos] = 0;
    },
    key: function() {
        var key = "";
        for(var i = 0; i < 72; i++) {
            key = key + this.gameState[i];
        }
        return key;
    }
}

