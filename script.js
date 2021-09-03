"use strict"

const Game = (() => {

    const boardSize = 9
    const createBoard = () => _initBoardArr()
    const _initBoardArr = () => new Array(boardSize).fill(null)

    const Player = (marker, name) => {
        return {
            marker,
            name
        }
    }
    return {
        publicProperty: createBoard,
        playerOne: Player,
        playerTwo: Player
    }

})()
