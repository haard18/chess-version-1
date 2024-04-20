import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"
import { useState, useEffect } from "react"
import { Chess } from 'chess.js'
export const INIT_GAME = 'init_game'
export const MOVE = 'move'
export const GAME_OVER = 'game_over'
export const StartGame = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(() => new Chess());
    const[started,setStarted]=useState(false);
    const [board, setBoard] = useState(() => chess.board());
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message)
            switch (message.type) {
                case INIT_GAME:
                    setStarted(true);
                    setBoard(chess.board());
                    console.log('Game is starting')
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log('Opponent moved')
                    break;
                case GAME_OVER:
                    console.log('Game Over')
                    break;
            }
        };
        return () => {
            socket.close();
        }
    }, [socket])
    if (!socket) {
        return <div>Connecting...</div>
    }
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 w-full ">
                <div className="col-span-4  w-full flex justify-center items-center ">
                    <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
                </div>
                <div className="col-span-2 justify-center flex bg-slate-900 w-full">
                    <div className="pt-10">

                        {!started && <Button onClick={() => {
                            socket.send(JSON.stringify({
                                "type": INIT_GAME
                            }))
                        }}>
                            Play Online
                        </Button >}
                    </div>
                </div>
            </div>
        </div>

    </div>
}