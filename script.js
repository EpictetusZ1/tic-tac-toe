"use strict"

const Game = (() => {
    const Player = (name, marker, isTurn, wins) => {


        const placeMarker = () => {
            let svg = document.createElement("img")
            if (marker === 0) {
                svg.src = "assets/tic-tac-svg/X.svg"
                return svg
            } else {
                svg.src = "assets/tic-tac-svg/O.svg"
                return svg
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

    let playerOne = Player("Jack", 0, true, 0)
    let playerTwo = Player("John", 1, false,0)

    const showWin = (player) => {
        player.wins++
        // TODO: update show win to display message on screen.
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
                    return showWin(playerOne)
                } else if (board[c0] === 1 && board[c1] === 1 && board[c2] === 1) {
                    return showWin(playerTwo)
                }
            }
        }
    }

    const gameBoard = (() => {
        const _boardSize = 9
        const initBoardState = new Array(_boardSize).fill(undefined)
        const boardElement = document.getElementById("board")

        let _boardState = initBoardState

        // Creates Board in HTML
        const createBoard = () => {
            for (let i = 1; i <= _boardSize; i++) {
                let sqElement = document.createElement("div")
                boardElement.appendChild(sqElement).classList.add("square")
                sqElement.setAttribute("data", `${i}`)
            }
        }

        const updateBoard = () => {
            // Add event listeners to all 'square' elements
            const squareList = document.querySelectorAll(".square")
            squareList.forEach((element) => {
                element.addEventListener("click", (e) => updateHTML(e))
                // Prevent duplicate clicks
                element.addEventListener("click", (e) => setClicked(e.target))
                // Check for win
                element.addEventListener("click",()  => winCondition(_boardState))
            })

            const setClicked = (e) => e.setAttribute("clicked", 1)

            // Handle turn, call update Array
            const _handleTurn = (index, e) => {
                if (playerOne.isTurn) {
                    playerOne.isTurn = false
                    updateArray(index, playerOne.marker)
                    e.target.appendChild(playerOne.placeMarker())
                } else {
                    playerOne.isTurn = true
                    updateArray(index, playerTwo.marker)
                    e.target.appendChild(playerTwo.placeMarker())
                }
            }

            const updateArray = (index, marker) => _boardState[index -1] = marker

            const updateHTML = (e) => {
                if (e.target.getAttribute("clicked") !== "1") {
                    let index = parseInt(e.target.getAttribute("data"))
                    _handleTurn(index, e)
                } else {
                    console.log("You already clicked this square")
                }
            }

            const resetBtn = document.getElementById("restart-game")
            resetBtn.addEventListener("click", () => resetGame())
            const resetGame = () => {
                boardElement.innerHTML = ""
                _boardState = []
                createBoard()
                updateBoard()
            }
        }
    return {
            createBoard,
            updateBoard
    }
    })()
    return {
        gameState: gameBoard,
    }
})()

Game.gameState.createBoard()
Game.gameState.updateBoard()
