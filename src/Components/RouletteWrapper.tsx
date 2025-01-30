import React from "react";
import Board from "./Board";
import Wheel from "./Wheel";
import { Button } from '@mantine/core';
import { Timer } from "easytimer.js";
import classNames from "classnames";
import { io } from "socket.io-client";
import ProgressBarRound from "./ProgressBar";
import { Item, PlacedChip, RouletteWrapperState, GameData, GameStages } from "./Global";

class RouletteWrapper extends React.Component<any, any> {

    rouletteWheelNumbers = [
        0, 32, 15, 19, 4, 21, 2, 25,
        17, 34, 6, 27, 13, 36, 11,
        30, 8, 23, 10, 5, 24, 16, 33,
        1, 20, 14, 31, 9, 22, 18, 29,
        7, 28, 12, 35, 3, 26
    ];

    timer = new Timer();
    numberRef = React.createRef<HTMLInputElement>();
    state: RouletteWrapperState = {
        rouletteData: {
            numbers: this.rouletteWheelNumbers
        },
        chipsData: {
            selectedChip: null,
            placedChips: new Map()
        },
        number: {
            next: null
        },
        winners: [],
        history: [],
        stage: GameStages.NONE,
        username: "",
        endTime: 0,
        progressCountdown: 0,
        time_remaining: 0,
    };
    socketServer: any;

    blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35];

    constructor(props: { username: string }) {
        super(props);
        this.onSpinClick = this.onSpinClick.bind(this);
        this.onChipClick = this.onChipClick.bind(this);
        this.getChipClasses = this.getChipClasses.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.placeBet = this.placeBet.bind(this);
        this.clearBet = this.clearBet.bind(this);

        this.socketServer = io("http://localhost:8000");
    }

    componentDidMount() {
        this.socketServer.open();
        this.socketServer.on('stage-change', (data: string) => {
            console.log("Stage Change Data Received:", data);
            var gameData = JSON.parse(data) as GameData;
            this.setGameData(gameData);
        });
        this.socketServer.on("connect", () => {
            console.log("Connected to Socket Server");
            this.setState({ username: this.props.username }, () => {
                this.socketServer.emit("enter", this.state.username);
            });
        });
    }

    componentWillUnmount() {
        this.socketServer.close();
    }

    setGameData(gameData: GameData) {
        console.log("Game Data Received:", gameData);

        if (gameData.stage === GameStages.NO_MORE_BETS) {
            this.setState({
                endTime: 35,
                progressCountdown: 35 - gameData.time_remaining,
                number: { next: gameData.value },
                stage: gameData.stage,
                time_remaining: gameData.time_remaining,
            });
        } else if (gameData.stage === GameStages.WINNERS) {
            console.log("Winners Data:", gameData.wins);
            this.setState({
                endTime: 59,
                progressCountdown: 59 - gameData.time_remaining,
                winners: gameData.wins || [],
                stage: gameData.stage,
                time_remaining: gameData.time_remaining,
                history: gameData.history || [],
            });
        } else {
            this.setState({
                endTime: 25,
                progressCountdown: 25 - gameData.time_remaining,
                stage: gameData.stage,
                time_remaining: gameData.time_remaining,
            });
        }
    }

    onCellClick(item: Item) {
        const currentChips = this.state.chipsData.placedChips;
        const chipValue = this.state.chipsData.selectedChip;
        if (!chipValue) return;

        const currentChip: PlacedChip = {
            item,
            sum: chipValue + (currentChips.get(item)?.sum || 0),
        };

        currentChips.set(item, currentChip);
        this.setState({
            chipsData: {
                selectedChip: chipValue,
                placedChips: currentChips,
            },
        });
    }

    onChipClick(chip: number | null) {
        this.setState({
            chipsData: {
                selectedChip: chip,
                placedChips: this.state.chipsData.placedChips,
            },
        });
    }

    getChipClasses(chip: number) {
        return classNames({
            chip_selected: chip === this.state.chipsData.selectedChip,
            "chip-100": chip === 100,
            "chip-20": chip === 20,
            "chip-10": chip === 10,
            "chip-5": chip === 5,
        });
    }

    onSpinClick() {
        const userNumber = this.numberRef!.current!.value;
        console.log("User Input Number:", userNumber); // For Debugging

        // Randomly generate the next ball number
        const randomBallNumber = Math.floor(Math.random() * this.rouletteWheelNumbers.length);
        console.log("Random Ball Number:", randomBallNumber);

        // Update the state with the generated number
        this.setState({ 
            number: { next: randomBallNumber },
            history: [...this.state.history, randomBallNumber], // Maintain history of spins
        });
    }

    placeBet() {
        const placedChipsMap = this.state.chipsData.placedChips;
        const chips: PlacedChip[] = Array.from(placedChipsMap.values());

        console.log("Placing Bet:", chips);
        this.socketServer.emit("place-bet", JSON.stringify(chips));
    }

    clearBet() {
        this.setState({
            chipsData: {
                selectedChip: null,
                placedChips: new Map(),
            },
        });
    }

    render() {
        return (
            <div>
                <div>
                    <table className="rouletteWheelWrapper">
                        <tbody>
                            <tr>
                                <td className="winnersBoard">
                                    <div className="winnerItemHeader font-[Kings]">WINNERS</div>
                                    {this.state.winners.length > 0 ? (
                                        this.state.winners.map((entry, index) => (
                                            <div key={index} className="winnerItem">
                                                {index + 1}. {entry.username} won ${entry.sum}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="font-bold text-xl text-[#877337] font-[Kings]">No winners yet</div>
                                    )}
                                </td>
                                <td>
                                    <Wheel
                                        rouletteData={this.state.rouletteData}
                                        number={this.state.number}
                                    />
                                </td>
                                <td>
                                    <div className="winnerHistory">
                                        {this.state.history.map((entry, index) => (
                                            <div
                                                key={index}
                                                className={
                                                    entry === 0
                                                        ? "green"
                                                        : this.blackNumbers.includes(entry)
                                                            ? "black"
                                                            : "red"
                                                }
                                            >
                                                {entry}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Board
                        onCellClick={this.onCellClick}
                        chipsData={this.state.chipsData}
                        rouletteData={this.state.rouletteData}
                    />
                </div>
                <div className="progressBar">
                    <ProgressBarRound
                        stage={this.state.stage}
                        maxDuration={this.state.endTime}
                        currentDuration={this.state.time_remaining}
                    />
                </div>
                <div>
                    <h2>Next Number: {this.state.number.next}</h2>
                    <input className="number" ref={this.numberRef} />
                    <button className="spin" onClick={this.onSpinClick}>Spin</button>
                </div>
                <div className="roulette-actions">
                    <ul>
                        <li>
                            <Button
                                color="#6A3502"
                                size="xl"
                                radius={"md"}
                                className="font-[Kings] !text-[#877337] "
                                onClick={this.clearBet}
                            >
                                Clear Bet
                            </Button>
                        </li>
                        {[100, 20, 10, 5].map((chip) => (
                            <li key={chip} className="board-chip">
                                <div
                                    className={this.getChipClasses(chip)}
                                    onClick={() => this.onChipClick(chip)}
                                >
                                    {chip}
                                </div>
                            </li>
                        ))}
                        <li>
                            <Button
                                // disabled={this.state.stage !== GameStages.PLACE_BET}

                                color="#6A3502"
                                size="xl"
                                radius={"md"}
                                className="font-[Kings] !text-[#877337] "
                                onClick={this.placeBet}>Place Bet</Button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RouletteWrapper;