import * as React from "react";
import { useState } from "react";
import { Text, View } from '../components/Themed'
import uuid from 'react-native-uuid';
import { StyleSheet, Button} from 'react-native';


const styles = {
    board: {
        backgroundColor: "gray",
        width: "100%", 
        height: "110%"


    },
    boardRow: {
        height: "1em",
        width: "7em",
        display: "flex",
        margin: "1em"
       },

    boardColumn: {
        width: "40px",
        height: "40px",
        margin: "1em", 
        border: "4px black solid"
    }, 
    p1: {
        width: "40px",
        height: "40px",
        backgroundColor: "red",
        border: "1px black solid",
        borderRadius: "50%"
    },
    p2: {
        width: "40px",
        height: "40px",
        backgroundColor: "black",
        border: "1px black solid",
        borderRadius: "50%"
    }
}

export default function ConnectFourBoard() {
 
    let boardMatrixOriginal = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ]
    const [player, setPlayer] = useState("p1")
    const [boardMatrix, setBoardMatrix] = useState(boardMatrixOriginal)
    const changePlayer = () => {setPlayer(prev => {
        if(prev === "p1"){
            return "p2"
        }
        return "p1"
    })}

    async function addPiece(e: object, name: string) { 
        const row = parseInt(name.slice(0,1))
        const column = parseInt(name.slice(-1));
        for(let row = boardMatrix.length - 1; row >= 0; row -= 1){
            if(boardMatrix[row][column]== ""){
                let boardCopy = [...boardMatrix]
                boardCopy[row][column] = player;
                let newBoard = await setBoardMatrix(boardCopy)
                let winner = checkForWin()
                if(winner){
                    alert(`${winner} is the winner!`);
                    resetBoard()
                }
                changePlayer()
                break
            }
        }
    }

    const resetBoard = () => {
        setBoardMatrix(() => boardMatrixOriginal);
    }

    const checkForWin = () => {
        let horizontalWinCheck = checkMatrix(boardMatrix)
        let verticalWinCheck = checkMatrix(transpose(boardMatrix))
        return horizontalWinCheck ? horizontalWinCheck : verticalWinCheck ? verticalWinCheck : null;
    }
    const transpose = (m: Array<Array<String>>) => m[0].map((x,i) => m.map(x => x[i]))
const checkMatrix = (boardMatrix: Array<Array<String>>) => {
    let p1Score = 0;
    let p2Score = 0;
    for(let i of boardMatrix){
        for(let j of i){
            if(j != ""){
                if(j === "p1"){
                    p1Score += 1
                    p2Score = 0
                }
                else{
                    p2Score += 1
                    p1Score = 0
                }
                console.log(boardMatrix, p1Score, p2Score)
                if(p1Score === 4 || p2Score === 4){
                    break;
                }
            }
        }
    }
    return p1Score === 4 ? "p1" : p2Score === 4 ? "p2" : null;
}


    return (
        <View style={styles.board} >
             {boardMatrix.map((row, rowIndex) => {
                return <div key={uuid.v4().toString()} style={styles.boardRow}>
                    {row.map((c, cI) => {
                        if(c === ""){
                        return (<div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.boardColumn}>
                            <Button
                                onPress={(e) => addPiece (e, rowIndex.toString() + cI.toString())}
                                title={rowIndex.toString() + cI.toString()}
                            />
                            </div>)}
                        else if (c=== "p1"){
                            return (<div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.boardColumn}>
                            <div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.p1}/>
                            </div>)
                        }
                        else {
                            return (<div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.boardColumn}>
                            <div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.p2}/>
                            </div>)
                        }
                        })}
            </div>
            })}
        <br></br>
        <br/>
          <Button title="Reset Board" onPress={resetBoard}/>

        </View>
    )
}