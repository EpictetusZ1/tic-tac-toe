"use strict"

const Game = (() => {

    const _boardSize = 9

    // Generates first instance of board Array
    const initBoardState = new Array(_boardSize).fill(0)

    // Creates Board
    const createBoard = () => {
        let boardElement = document.getElementById("board")

        for (let i = 1; i <= _boardSize; i++) {
            let sqElement = document.createElement("div")
            boardElement.appendChild(sqElement).classList.add("square")
            sqElement.setAttribute("data", `${i}`)

            // Updates Board
            sqElement.addEventListener("click", (e) => placeMarker(e))
        }
    }

    // Update board in HTML
    let _turnController = false
    const placeMarker = (e) => {
        if (!_turnController) {
            e.target.textContent = "X"
            _turnController = true
        } else if (_turnController) {
            e.target.textContent = "0"
            _turnController = false
        }
    }

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
        return {
            name,
            marker
        }
    }

    return {
        createBoard: createBoard,
        initalBoardState: initBoardState,
        playerOne: Player,
        playerTwo: Player,
    }
})()

Game.createBoard()

console.log(Game.initalBoardState)

let jimmy = Game.playerOne("jimmy")
let john = Game.playerTwo("John")
