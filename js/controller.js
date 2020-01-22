window.onload = function() {
    const players = ['X', 'O'];
    const player1Div = document.getElementById('player1')
    const player2Div = document.getElementById('player2')
    const resetDiv = document.getElementById('footer').getElementsByClassName('half')[0]
    resetDiv.addEventListener('click', () => {
        location.reload()
    })


    var currentPlayer = selectRandomPlayer(players)
    changePlayer(currentPlayer)
    let plays = [
        [
            [null, ''],
            [null, ''],
            [null, '']
        ],
        [
            [null, ''],
            [null, ''],
            [null, '']
        ],
        [
            [null, ''],
            [null, ''],
            [null, '']
        ],
    ]
    for (let row = 0; row < plays.length; row++) {
        for (let col = 0; col < plays[row].length; col++) {
            plays[row][col][0] = document.getElementById(row.toString() + col.toString())
            let parent = document.getElementById(row.toString() + col.toString()).parentElement
            parent.addEventListener('click', clickFunction)

            function clickFunction() {
                parent.removeEventListener('click', clickFunction)
                plays[row][col][1] = currentPlayer
                drawElements(plays)
                let results = checkResult(row, col, currentPlayer)
                if (results.checkRow || results.checkCol || results.checkDiag || results.checkAntiDiag) {
                    console.log(currentPlayer + " wins!");
                    Swal.fire({
                        position: 'middle',
                        title: currentPlayer + " wins!",
                        timer: 3000,
                        position: 'top'
                    }).then((result) => {
                        location.reload()
                    })
                    if (results.checkRow) {
                        for (let col = 0; col < 3; col++) {
                            color(plays[row][col][0], '#30ad23')
                        }
                    }
                    if (results.checkCol) {
                        for (let row = 0; row < 3; row++) {
                            color(plays[row][col][0], '#30ad23')
                        }
                    }
                    if (results.checkDiag) {
                        for (let index = 0; index < 3; index++) {
                            color(plays[index][index][0], '#30ad23')
                        }
                    }
                    if (results.checkAntiDiag) {
                        for (let index = 0; index < 3; index++) {
                            color(plays[index][2 - index][0], '#30ad23')
                        }
                    }

                } else {
                    if (checkGameDraw()) {
                        console.log('Game draws!"');
                        Swal.fire({
                            position: 'middle',
                            title: "Game draws!",
                            timer: 3000,
                            position: 'top'
                        }).then((result) => {
                            location.reload()
                        })
                    }
                }

                currentPlayer = nextPlayer(currentPlayer, players)
                changePlayer(currentPlayer)
            }
        }
    }

    function drawElements(plays) {
        for (let row = 0; row < plays.length; row++) {
            for (let col = 0; col < plays[row].length; col++) {
                plays[row][col][0].innerHTML = plays[row][col][1]
            }
        }
    }

    function checkResult(row, col, player) {
        var checkRow = true
        for (let col = 0; col < 3; col++) {
            if (plays[row][col][1] != player)
                checkRow = false
        }
        var checkCol = true
        for (let row = 0; row < 3; row++) {
            if (plays[row][col][1] != player)
                checkCol = false
        }
        var checkDiag = true
        for (let index = 0; index < 3; index++) {
            if (plays[index][index][1] != player)
                checkDiag = false
        }
        var checkAntiDiag = true
        for (let index = 0; index < 3; index++) {
            if (plays[index][2 - index][1] != player)
                checkAntiDiag = false
        }

        return {
            checkRow: checkRow,
            checkCol: checkCol,
            checkDiag: checkDiag,
            checkAntiDiag: checkAntiDiag
        }
    }

    function checkGameDraw() {
        var checkGameDraw = true
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!plays[row][col][1])
                    checkGameDraw = false
            }
        }
        return checkGameDraw
    }

    function nextPlayer(currentPlayer, players) {
        if (players.length - 1 == (players.findIndex(checkCurrentPlayer)))
            return players[0];
        else
            return players[players.findIndex(checkCurrentPlayer) + 1]


        function checkCurrentPlayer(player) {
            return player == currentPlayer
        }
    }

    function color(id, color) {
        id.style.color = color
    }

    function selectRandomPlayer(players) {
        return players[Math.round(Math.random())]
    }

    function changePlayer(currentPlayer) {
        if (players.findIndex(checkCurrentPlayer) == 0) {
            player1Div.style.backgroundColor = '#87818c'
            player2Div.style.backgroundColor = '#353238'
        }
        if (players.findIndex(checkCurrentPlayer) == 1) {
            player1Div.style.backgroundColor = '#353238'
            player2Div.style.backgroundColor = '#87818c'
        }

        function checkCurrentPlayer(player) {
            return player == currentPlayer
        }
    }
}