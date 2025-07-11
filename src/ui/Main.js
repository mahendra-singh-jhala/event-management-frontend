import Image from "../asset/Event.png"
import { Link } from "react-router-dom"

function Main() {
    return (
        <section>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 text-white mx-auto font-serif py-10 items-center">
                <div className="w-full ms-4 px-20">
                    <p className="uppercase text-xs tracking-widest">Book Your Event Now </p>
                    <h1 className="text:4xl md:text-6xl font-bold  py-4 mb-4 leading-snug "> Good <span
                        className="text-blue-600 text-6xl md:text-8xl"> Website </span> For Event Management
                    </h1>
                    <div className="mb-8">
                        <button
                            className="w-1/2 flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg border hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-0">
                            <Link className="relative text-xs px-5 py-2.5" to="/event">
                                View Event
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <img src={Image} alt="event.jpg" className="opacity-70" />
                </div>
            </div>
        </section>
    )
}

export default Main
