import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
export class Game {
    public player1:WebSocket;
    public player2:WebSocket;
    private board:Chess;
    private moves:string[];
    private startTime:Date;
    private moveCount=0;
    constructor(player1:WebSocket,player2:WebSocket) {
        this.player1=player1;
        this.player2=player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'black'
            }
        }));
    }
    

    makeMove(socket:WebSocket,move:{
        from:string;
        to:string;
    }){
        console.log(move)
        //validate if this is the player's turn
        //validate if the move is valid
        // console.log(this.moveCount);
        // console.log(this.board.board());
        if(this.moveCount%2===0&&socket!==this.player1){
            console.log("early return 1")
            return;
        }
        if(this.moveCount%2===1&&socket!==this.player2){
            console.log("early return 1")

            return;
        }
        console.log("did not early Return")
        try {
            this.board.move(move);

        } catch (error) {
            console.log(error);
            return;
        }
        console.log("move succeeded");
        //update the board
        //check if the game is over
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==='w'?'black':'white'
                }
            }));
        }
        console.log(this.moveCount);
        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }));
        }
        else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
                
            }));
        }
        this.moveCount++;

        //send the updated board to both players
    }
}