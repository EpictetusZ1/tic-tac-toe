"use strict"

const Game = (() => {

    const boardSize = 9
    const boardState = () => createBoard()
    const createBoard = () => {
        let boardElement = document.getElementById("board")

        for (let i = 1; i <= boardSize; i++) {
            let sqDisplay = document.createElement("div")
            boardElement.appendChild(sqDisplay).classList.add("square")
        }
        return new Array(boardSize).fill(null)

    }

    const Player = (marker, name) => {
        return {
            marker,
            name
        }
    }

    return {
        createBoard: createBoard,
        boardState: boardState,
        playerOne: Player,
        playerTwo: Player,
    }
})()

Game.boardState()
