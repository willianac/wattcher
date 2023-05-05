import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="flex justify-between bg-white fixed w-full h-14 items-center">
            <div>
                <Link to="/">
                    <h1 className="text-3xl text-colorPrimary pl-4 font-semibold tracking-wide">Wattcher</h1>
                </Link>
            </div>
            <div>
                <ul className="flex gap-4 pr-4">
                    <li>
                        <Link to="/mydevices">
                            <span className="font-semibold">Meu resumo</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/home">
                            <span className="font-semibold">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" >
                            <span className="font-semibold">Entrar</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar;