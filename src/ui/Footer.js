import { BsInstagram } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom"
import Image from "../asset/logo.png"

function Footer() {
    return (
        <footer>
            <section>
                <div className="flex justify-between bg-gradient-to-r from-purple-600 via-violet-500 to-blue-600 text-black py-8">
                    <div className="w-full px-8 py-4">
                        <Link to="/" className="w-16 flex items-center ms-2 mb-2">
                            <img src={Image} alt="logo" />
                            <h1 className="text-xl font-bold font-serif text-fuchsia-400">EVENT</h1>
                        </Link>
                        <p className="text-md w-1/4 text-gray-800 ps-4 font-semibold">Sri Jagannath Nivas,8-1-164/345/A/1,
                            Pragati Colony, Mailardevpally, Nawab
                            Saheb Kunta, Hyd, 500005</p>
                    </div>
                    <div className="mx-auto w-full max-w-screen-xl">
                        <div className="flex flex-wrap items-center justify-around">
                            <div>
                                <h2 className="mb-6 text-lg text-gray-900 uppercase dark:text-white">Community</h2>
                                <ul className="text-black font-medium">
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Learners</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Parteners</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Developers</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Transactions</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Blog</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-lg text-gray-900 uppercase dark:text-white">Quick links</h2>
                                <ul className="text-black font-medium">
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Home</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Professional</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Regitrestion</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Testimonial</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline">Programs</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-lg text-gray-900 uppercase dark:text-white">More</h2>
                                <ul className="text-black font-medium">
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Press</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Investors</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Terms</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Help</Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link  className="hover:underline text-sm">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div
                    className="flex justify-center items-center bg-gradient-to-tr from-purple-800 via-violet-500 to-blue-800 py-4">
                    <Link  className="mx-2">
                        <BsInstagram />
                    </Link>
                    <Link  className="mx-2">
                        <BsGithub />
                    </Link>
                    <Link  className="mx-2">
                        <BsFacebook />
                    </Link>
                    <Link  className="mx-2">
                        <BsLinkedin />
                    </Link>
                    <Link  className="mx-2">
                        <BsWhatsapp />
                    </Link>
                </div>
            </section>

            <section>
                <div
                    className="bg-gradient-to-tr from-purple-800 via-violet-500 to-blue-800 py-1 text-xs text-center text-white">
                    <span>Copyright @ 2023 askmeidentity. All Rights Reserved</span>
                </div>
            </section>
        </footer>
    )
}

export default Footer
