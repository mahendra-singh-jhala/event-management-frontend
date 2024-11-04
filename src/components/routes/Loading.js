import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGIF from "../../asset/loading.gif"

function Loading() {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const inrerval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)

        count === 0 && navigate("/login")

        return () => clearInterval(inrerval)
    }, [count, navigate])

    return (
        <div>
            <div
                className="w-full h-screen flex justify-center items-center"
            >
                <img src={LoadingGIF} alt="Loading" className="w-24" />
            </div>
        </div>
    )
}

export default Loading
