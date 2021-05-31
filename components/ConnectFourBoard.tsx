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
        height: "2em",
        width: "3em", 
        margin: "1em", 
        border: "4px black solid"
    }, 
    p1: {
        height: "2em",
        width: "3em",
        backgroundColor: "red",
        border: "1px black solid",
        borderRadius: "50%"
    },
    p2: {
        height: "2em",
        width: "3em",
        backgroundColor: "black",
        border: "1px black solid",
        borderRadius: "50%"
    }
}

export default function ConnectFourBoard() {
 
    let boardMatrixOriginal = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ]
    const [player, setPlayer] = useState(true)
    const [boardMatrix, setBoardMatrix] = useState(boardMatrixOriginal)
    const changePlayer = () => {setPlayer(prev => !prev)}

    const pressButton = (e: object, name: string) => { 
        const row = parseInt(name.slice(0,1))
        const column = parseInt(name.slice(-1));
        for(let row = boardMatrix.length - 1; row >= 0; row -= 1){
            if(boardMatrix[row][column]==null){
                let boardCopy = [...boardMatrix]
                boardCopy[row][column] = player;
                setBoardMatrix(boardCopy)
                console.log(boardMatrix)
                changePlayer()
                break
            }
        }
    }
    return (
        <View style={styles.board} >
             {boardMatrix.map((row, rowIndex) => {
                return <div key={uuid.v4().toString()} style={styles.boardRow}>
                    {row.map((c, cI) => {
                        if(c === null){
                        return (<div key={uuid.v4().toString()} id={rowIndex.toString() + cI.toString()} style={styles.boardColumn}>
                            <Button
                                onPress={(e) => pressButton(e, rowIndex.toString() + cI.toString())}
                                title={rowIndex.toString() + cI.toString()}
                            />
                            </div>)}
                        else if (c===true){
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
          
        </View>
    )
}