"use strict"

const Game = (() => {

    const Player = (name, marker, isTurn) => {
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
            placeMarker
        }
    }

    let playerOne = Player("Jimmy", 0, false)
    let playerTwo = Player("John", 1, false)

    const winCondition = (board) => {
        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < win.length; i++) {
            let condition = win[i]
            for (let x = 0; x <= condition.length; x++) {
                if (board[condition[0]] === 0 && board[condition[1]] === 0 && board[condition[2]] === 0) {
                    console.log("ONE PLAYER WINS")
                } else if (board[condition[0]] === 1 && board[condition[1]] === 1 && board[condition[2]] === 1) {
                    console.log("PLAYER TWO WINS")
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
