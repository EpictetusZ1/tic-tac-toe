"use strict"

const Game = (() => {
    const _boardSize = 9

    // Set Players 'Markers' using 0 and 1
    let _markerOne = 0

    const Player = (name, marker) => {
        const getMarker = () => {
            if (!_markerOne) {
                _markerOne ++
                return marker = 0
            } else {
                return marker = 1
            }
        }
        marker = getMarker()
        const placeMarker = () => {
            return marker
        }
        return {
            name,
            marker,
            placeMarker
        }
    }

    let playerOne = Player("Jimmy")
    let playerTwo = Player("John")

    const gameBoard = (() => {
        // Init Board Array
        const initBoardState = new Array(_boardSize).fill(undefined)

        // Arr to play game on
        let _boardState = initBoardState

        // Creates Board in HTML
        const createBoard = () => {
            let boardElement = document.getElementById("board")

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
                element.addEventListener("click", (e) => updateArray(e.target))
            })

            // Handle placing marker on board
            let _changeTurn = false
            const _logIndex = (index) => {
                let marker
                if (!_changeTurn) {
                    marker = playerOne.placeMarker()
                    _changeTurn = true
                } else {
                   marker = playerTwo.placeMarker()
                    _changeTurn = false
                }
                _boardState[index -1] = marker
                return marker
            }

            const updateArray = (e) => {
                let index = parseInt(e.getAttribute("data"))
                e.textContent = _logIndex(index)
            }
            return {
                updateArray
            }
        }

    return {
            initBoardState,
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

