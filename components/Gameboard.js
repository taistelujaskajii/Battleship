import { Text, View, Pressable } from 'react-native';
import Entypo from "@expo/vector-icons/Entypo"
import styles from '../style/style'
import React, { useState, useRef, useEffect } from 'react';

const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
// let initialBoard = [];
// initialBoard = Array(25).fill(START)

export default function Gameboard() {


    const timerRef = useRef();

    const [game, setGame] = useState("");
    const [start, setStart] = useState(false);
    const [board, setBoard] = useState([]);
    const [hits, setHits] = useState(0);
    const [bombs, setBombs] = useState(15);
    const [ships, setShips] = useState(3);
    const [time, setTime] = useState(15);
    const [ship, setShip] = useState({});

    function drawItem(number) {

        if (!start) {
            setGame('you should start the game first');
        }
        else if (board[number] === START && ships > 0 && bombs > 0) {
            setBombs(bombs - 1);
            if (ship.has(number)) {
                board[number] = CIRCLE;
                setShips(ships - 1);
                setHits(hits + 1);
            } else {
                board[number] = CROSS;
            }
        }
    }

    // En tiiä miks tätä randomia en saanu toimimaan ristinollan initialboard START setupilla.

    // function random() {
    //     // for (let i = 0; i < rounds; i++) {
    //     //     while (true) {
    //     //         let arvottu = Math.floor(Math.random() * 25)
    //     //         if (board[arvottu] === START) {
    //     //             board[arvottu] = ship;
    //     //             break;
    //     //         }
    //     //     }
    //     // }
    //     // return board;
    // }

    function chooseItemColor(number) {
        if (board[number] === CROSS) {
            return "#FF3031";
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30";
        }
        else {
            return "#74B9FF";
        }
    }

    function timer() {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
        timerRef.current = interval;
    }

    function stop() {
        clearInterval(timerRef.current);
    }

    function initializeBoard() {
        let initialBoard = [];
        initialBoard = Array(25).fill(START)
        setBoard(initialBoard);

        const nums = new Set();
        while (nums.size !== 3) {
            nums.add(Math.floor(Math.random() * 25));
        }
        setShip(nums);

    }

    useEffect(() => {
        initializeBoard();
    }, [])

    useEffect(() => {
        if (time === 0 || bombs === 0 || ships === 0) {
            stop();
            setGame(gameresult());
        }
    }, [time, bombs, ships])

    function gameresult() {
        setBombs(0);
        if (time === 0) {
            return "Times' out, you lose!"
        }
        if (ships === 0) {
            return "All ships down, you won!"
        }
        if (bombs === 0) {
            return "Out of bombs, you lose!"
        }
    }

    function handleClick() {
        if (!start) {
            timer();
            setStart(true);
        } else {
            resetGame();
        }
    }

    function resetGame() {
        stop();
        initializeBoard();

        setStart(false);

        setBombs(15);
        setTime(15);
        setHits(0);
        setShips(3);

        setGame("");
    }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>
                <Pressable key={0} style={styles.row} onPress={() => drawItem(0)}>
                    <Entypo key={0} name={board[0]} size={32} color={chooseItemColor(0)} />
                </Pressable>
                <Pressable key={1} style={styles.row} onPress={() => drawItem(1)}>
                    <Entypo key={1} name={board[1]} size={32} color={chooseItemColor(1)} />
                </Pressable>
                <Pressable key={2} style={styles.row} onPress={() => drawItem(2)}>
                    <Entypo key={2} name={board[2]} size={32} color={chooseItemColor(2)} />
                </Pressable>
                <Pressable key={3} style={styles.row} onPress={() => drawItem(3)}>
                    <Entypo key={3} name={board[3]} size={32} color={chooseItemColor(3)} />
                </Pressable>

                <Pressable key={4} style={styles.row} onPress={() => drawItem(4)}>
                    <Entypo key={4} name={board[4]} size={32} color={chooseItemColor(4)} />
                </Pressable>

            </View>
            <View style={styles.flex}>
                <Pressable key={5} style={styles.row} onPress={() => drawItem(5)}>
                    <Entypo key={5} name={board[5]} size={32} color={chooseItemColor(5)} />
                </Pressable>
                <Pressable key={6} style={styles.row} onPress={() => drawItem(6)}>
                    <Entypo key={6} name={board[6]} size={32} color={chooseItemColor(6)} />
                </Pressable>
                <Pressable key={7} style={styles.row} onPress={() => drawItem(7)}>
                    <Entypo key={7} name={board[7]} size={32} color={chooseItemColor(7)} />
                </Pressable>
                <Pressable key={8} style={styles.row} onPress={() => drawItem(8)}>
                    <Entypo key={8} name={board[8]} size={32} color={chooseItemColor(8)} />
                </Pressable>

                <Pressable key={9} style={styles.row} onPress={() => drawItem(9)}>
                    <Entypo key={9} name={board[9]} size={32} color={chooseItemColor(9)} />
                </Pressable>
            </View>
            <View style={styles.flex}>
                <Pressable key={10} style={styles.row} onPress={() => drawItem(10)}>
                    <Entypo key={10} name={board[10]} size={32} color={chooseItemColor(10)} />
                </Pressable>
                <Pressable key={11} style={styles.row} onPress={() => drawItem(11)}>
                    <Entypo key={11} name={board[11]} size={32} color={chooseItemColor(11)} />
                </Pressable>
                <Pressable key={12} style={styles.row} onPress={() => drawItem(12)}>
                    <Entypo key={12} name={board[12]} size={32} color={chooseItemColor(12)} />
                </Pressable>
                <Pressable key={13} style={styles.row} onPress={() => drawItem(13)}>
                    <Entypo key={13} name={board[13]} size={32} color={chooseItemColor(13)} />
                </Pressable>

                <Pressable key={14} style={styles.row} onPress={() => drawItem(14)}>
                    <Entypo key={14} name={board[14]} size={32} color={chooseItemColor(14)} />
                </Pressable>
            </View>
            <View style={styles.flex}>
                <Pressable key={15} style={styles.row} onPress={() => drawItem(15)}>
                    <Entypo key={15} name={board[15]} size={32} color={chooseItemColor(15)} />
                </Pressable>
                <Pressable key={16} style={styles.row} onPress={() => drawItem(16)}>
                    <Entypo key={16} name={board[16]} size={32} color={chooseItemColor(16)} />
                </Pressable>
                <Pressable key={17} style={styles.row} onPress={() => drawItem(17)}>
                    <Entypo key={17} name={board[17]} size={32} color={chooseItemColor(17)} />
                </Pressable>
                <Pressable key={18} style={styles.row} onPress={() => drawItem(18)}>
                    <Entypo key={18} name={board[18]} size={32} color={chooseItemColor(18)} />
                </Pressable>

                <Pressable key={19} style={styles.row} onPress={() => drawItem(19)}>
                    <Entypo key={19} name={board[19]} size={32} color={chooseItemColor(19)} />
                </Pressable>
            </View>
            <View style={styles.flex}>
                <Pressable key={20} style={styles.row} onPress={() => drawItem(20)}>
                    <Entypo key={20} name={board[20]} size={32} color={chooseItemColor(20)} />
                </Pressable>
                <Pressable key={21} style={styles.row} onPress={() => drawItem(21)}>
                    <Entypo key={21} name={board[21]} size={32} color={chooseItemColor(21)} />
                </Pressable>
                <Pressable key={22} style={styles.row} onPress={() => drawItem(22)}>
                    <Entypo key={22} name={board[22]} size={32} color={chooseItemColor(22)} />
                </Pressable>
                <Pressable key={23} style={styles.row} onPress={() => drawItem(23)}>
                    <Entypo key={23} name={board[23]} size={32} color={chooseItemColor(23)} />
                </Pressable>

                <Pressable key={24} style={styles.row} onPress={() => drawItem(24)}>
                    <Entypo key={24} name={board[24]} size={32} color={chooseItemColor(24)} />
                </Pressable>
            </View>
            <Pressable style={styles.button} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>{start ? "New game" : "Start game"}</Text>
            </Pressable>

            <Text style={styles.gameinfo}>Hits: {hits} Bombs: {bombs} Ships: {ships}</Text>
            <Text style={styles.gameinfo}>Time: {time} seconds</Text>
            {start && game === "" ?
                <Text style={styles.gameinfo}>Game is on</Text>
                :
                game !== ""
                    ? <Text style={styles.gameinfo}>{game}</Text>
                    : <Text style={styles.gameinfo}>Game is not started</Text>
            }
        </View>
    )
}