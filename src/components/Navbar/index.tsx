import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu =() => {
        setIsMenuOpen(false)
    }

    return (
        <>
            <header className="flex flex-wrap justify-between bg-white w-full py-3 items-center">
                <div>
                    <Link to="/">
                        <h1 className="text-3xl text-colorPrimary pl-4 font-semibold tracking-wide">Wattcher</h1>
                    </Link>
                </div>
                <button className="z-20 mr-4 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="sr-only">Abrir menu de navegação</span>
                    <span className="material-symbols-outlined text-2xl text">
                        {isMenuOpen ? "close" : "menu"}
                    </span>
                </button>
                <div className={`w-full md:block md:w-auto z-10 md:pr-4 ${isMenuOpen ? "block absolute top-14 z-20" : "hidden"}`} >
                    <ul className="flex flex-col bg-grayPrimary p-6 gap-2 rounded-md md:flex-row md:p-0 md:mt-0 md:bg-transparent md:gap-4">
                        <li>
                            <NavLink to="/mydevices" onClick={closeMenu}>
                                {({ isActive }) => (
                                    <span className={`font-semibold text-lg md:text-base hover:underline decoration-colorPrimary underline-offset-4 decoration-2 ${isActive ? "text-colorPrimary" : " "} `}>Meu resumo</span>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" onClick={closeMenu}>
                                {({ isActive }) => (
                                    <span className={`font-semibold text-lg md:text-base hover:underline decoration-colorPrimary underline-offset-4 decoration-2 ${isActive ? "text-colorPrimary" : " "}`}>Home</span>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" onClick={closeMenu}>
                                {({ isActive }) => (
                                    <span className={`font-semibold text-lg md:text-base hover:underline decoration-colorPrimary underline-offset-4 decoration-2 ${isActive ? "text-colorPrimary" : " "}`}>Entrar</span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            {isMenuOpen && <div className="w-full absolute h-full bg-black opacity-40 bottom-0 z-10" onClick={closeMenu}></div>}
        </>
    )
}

export default Navbar;