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
            placeMarker,
        }
    }

    let playerOne = Player("Player 1", 0, true, 0)
    let playerTwo = Player("Player 2", 1, false,0)


    const resetPlayer = () => {
        playerOne.name = "Player 1"
        playerTwo.name = "Player 2"
        playerOne.wins = 0
        playerTwo.wins = 0
    }

    const p1Name = document.getElementById("playerOne")
    const p2Name = document.getElementById("playerTwo")

    const _updateNames1 = (e, num) => {
        e.preventDefault()
        if (num === 0) {
            playerOne.name = p1Name[0].value
            p1Name.reset()
        } else if (num === 1) {
            playerTwo.name = p2Name[0].value
            p2Name.reset()
        }
    }
    // Collect names from form.
   (() => {
        p1Name.addEventListener("submit", (e) => _updateNames1(e, 0))
        p2Name.addEventListener("submit", (e) => _updateNames1(e, 1))
        return 1
    })()

    const boardContainer = document.querySelector(".board-container")
    const title = document.querySelector(".title-container")

    const showResult = (player) => {
        let winnerDiv = document.createElement("div")
        if (!tie) {
            player.wins++
            winnerDiv.textContent = `${player.name} Won! ${player.name} has Won: ${player.wins} times!`
            title.appendChild(winnerDiv).classList.add("winner")
            displayPlayAgain(boardContainer)
        } else {
            winnerDiv.textContent = "The game is a draw!"
            title.appendChild(winnerDiv).classList.add("winner")
            displayPlayAgain(boardContainer)
        }
        setTimeout(() => title.removeChild(winnerDiv), 2000)
    }

    const displayPlayAgain = (board) => {
        const playAgainDiv = document.createElement("div")
        playAgainDiv.setAttribute("id", "play-again-btn")
        playAgainDiv.textContent = "Play Again ?"
        board.appendChild(playAgainDiv).classList.add("play-again")
        playAgainDiv.addEventListener("click", () => playAgain())
        playAgainDiv.addEventListener("click", () => board.removeChild(playAgainDiv))
    }

    const playAgain = () => {
        gameBoard.updateBoard()._resetPlay()
        playerOne.isTurn = true
        win = false
        _counter = 0
    }

    let _counter = 0
    let tie = false
    let win = false

    const checkDraw = () => {
        _counter++
        if (_counter === 9) {
            tie = true
            return showResult(null)
        }
    }

    const winCondition = (board) => {
        if (!tie && !win) {
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
                        win = true
                        return showResult(playerOne)
                    } else if (board[c0] === 1 && board[c1] === 1 && board[c2] === 1) {
                        win = true
                        return showResult(playerTwo)
                    }
                }
            }
            checkDraw()
        }
    }

    const gameBoard = (() => {
        // Creates Board in HTML
        const createBoard = () => {
            const _boardSize = 9
            const boardElement = document.getElementById("board")
            const initBoardState = new Array(_boardSize).fill(undefined)

            for (let i = 1; i <= _boardSize; i++) {
                let sqElement = document.createElement("div")
                boardElement.appendChild(sqElement).classList.add("square")
                sqElement.setAttribute("data", `${i}`)
            }
            return {
                initBoardState,
                boardElement
            }
        }

        let _boardState = createBoard()

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

            const alertToClicked = () => {
            }

            const updateHTML = (e) => {
                // Keep track of squares that have been clicked
                if (e.target.getAttribute("clicked") !== "1") {
                    let index = parseInt(e.target.getAttribute("data"))
                    _handleTurn(index, e)
                } else {
                    console.log("You already clicked this square")
                }
            }
            const boardElement = document.getElementById("board")
            const resetBtn = document.getElementById("restart-game")
            resetBtn.addEventListener("click", () => resetGame())
            // Absolute Reset of the Game State
            const resetGame = () => {
                boardElement.innerHTML = ""
                _boardState = []
                resetPlayer()
                createBoard()
                updateBoard()
            }
            const _resetPlay = () => {
                boardElement.innerHTML = ""
                _boardState = []
                gameBoard.createBoard()
                gameBoard.updateBoard()
            }
            return {
                _resetPlay
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
// Game.gameState.createBoard()
Game.gameState.updateBoard()
