import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate=useNavigate();
    return (
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"src/assets/chess.jpg"} className="max-w-[30rem]" alt="" />
                    </div>
                    <div className="pt-10">

                        <div className="flex justify-center">
                            <h1 className="text-4xl text-white font-bold">Play Chess On the go</h1>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button onClick={()=>{navigate('/game')}}>
                                Play Online
                            </Button>
                            {/* <button onClick={()=>{navigate('/game')}} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                                Play Online
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}