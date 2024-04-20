import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/StartGame";

export const ChessBoard = ({ chess, setBoard, board, socket }: {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket
}) => {
    const [to, setTo] = useState<Square | null>(null);
    const [from, setFrom] = useState<Square | null>(null);
    return <div className="text-white-200 ">

        {board.map((row, rowIndex) => {
            return <div key={rowIndex} className="flex">
                {row.map((square, squareIndex) => {
                    const squareRepresentation = String.fromCharCode(97 + (squareIndex % 8)) + "" + (8 - rowIndex) as Square;

                    return <div onClick={
                        () => {
                            if (!from) {
                                setFrom(squareRepresentation)
                            } else {
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        move: {
                                            from,
                                            to: squareRepresentation
                                        }
                                    }
                                }))
                                setFrom(null)
                                console.log({
                                    from,
                                    to: squareRepresentation
                                })
                                chess.move({
                                    from,
                                    to: squareRepresentation
                                })
                                setBoard(chess.board())
                                // setTo(null)
                            }
                        }

                    } key={squareIndex} className={`w-16 h-16 ${(rowIndex + squareIndex) % 2 == 0 ? ' bg-cyan-700 ' : ' bg-amber-700'}`}>
                        <div className="w-full justify-center flex h-full">
                            <div className="h-full flex justify-center flex-col">
                            {/* src\assets\b copy.png */}
                                <img src={`src/assets/${square?.color==='b'?square?.type:`${square?.type} copy`}.png`} alt="" />
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}

    </div>
}