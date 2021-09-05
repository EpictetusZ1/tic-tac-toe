"use strict"

const Game = (() => {

    const Player = (name, marker, isTurn, wins) => {
        // TODO: Make SVG for these bad boys
        const placeMarker = () => {
            if (marker === 0) {
                return "X"
            } else {
                return "O"
            }
        }
        return {
            name,
            marker,
            isTurn,
            wins,
            placeMarker
        }
    }

    let playerOne = Player("Jimmy", 0, false, 0)
    let playerTwo = Player("John", 1, false,0)

    let _playerOneWin = false
    let _playerTwoWin = false

    const showWin = (player) => {
        player.wins++
        console.log(player)
    }

    const winCondition = (board) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winConditions.length; i++) {
            let cdn = winConditions[i]
            let c0 = cdn[0]
            let c1 = cdn[1]
            let c2 = cdn[2]
            for (let x = 0; x < cdn.length; x++) {
                if (board[c0] === 0 && board[c1] === 0 && board[c2] === 0) {
                    _playerOneWin = true
                    return showWin(playerOne)
                } else if (board[c0] === 1 && board[c1] === 1 && board[c2] === 1) {
                    _playerTwoWin = true
                    return showWin(playerTwo)
                }
            }
        }
    }



    const gameBoard = (() => {
        const _boardSize = 9
        // Init Board Array
        const initBoardState = new Array(_boardSize).fill(undefined)

        // Arr to play game on
        let _boardState = initBoardState

        // Creates Board in HTML
        const createBoard = () => {
            const boardElement = document.getElementById("board")
            for (let i = 1; i <= _boardSize; i++) {
                let sqElement = document.createElement("div")
                boardElement.appendChild(sqElement).classList.add("square")
                sqElement.setAttribute("data", `${i}`)
            }
        }

        const updateBoard = () => {
            // Node list targeting HTML board elements
            const squareList = document.querySelectorAll(".square")

            squareList.forEach((element) => {
                element.addEventListener("click", (e) => updateHTML(e.target))
                element.addEventListener("click",()  => winCondition(_boardState))
            })

            // Handle sending index to helpers
            const _logIndex = (index) => {
                if (playerOne.isTurn) {
                    playerOne.isTurn = false
                    updateArray(index, playerOne.marker)
                    return playerOne.placeMarker()
                } else {
                    playerOne.isTurn = true
                    updateArray(index, playerTwo.marker)
                    return playerTwo.placeMarker()
                }
            }

            function updateArray(index, marker) {
               _boardState[index -1] = marker
            }

            const updateHTML = (e) => {
                let index = parseInt(e.getAttribute("data"))
                e.textContent = _logIndex(index)
            }
        }

    return {
            createBoard,
           updateBoard,
    }
    })()
    return {
        gameState: gameBoard,
    }
})()

Game.gameState.createBoard()
Game.gameState.updateBoard()
