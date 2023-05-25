import { useState } from "react";
import { Link } from "react-router-dom";
import IntroForm from "../../components/IntroductionForm";
import Footer from "../../components/Footer";
import AnimatedWrapper, { AnimateText } from "../../animations/AnimatedWrapper";
import { Device } from "../../store/devices";
import { useCalculateEnergy } from "../../hooks/useCalculateEnergy";

function LandingPage() {
    const [energykWh, setEnergykWh] = useState("")
    
    const calculateEnergy = (device: Device) => {
        const result = useCalculateEnergy(device)
        setEnergykWh(result)
    }
  
    return (
        <AnimatedWrapper>
            <div className="flex flex-col h-full">
                <h1 className="pt-11 text-3xl font-bold text-center lg:w-1/2 lg:mx-auto lg:text-5xl lg:font-semibold lg:tracking-tight">Saiba quanto seus aparelhos gastam de energia todo mês</h1>
                <p className="mt-7 w-3/4 px-4 lg:mx-72">Saiba rapidamente quanto gasta seu aparelho eletrônico:</p>
                <main className="px-4 mt-4 lg:mx-72">
                    <IntroForm calc={calculateEnergy}/>
                    {
                        energykWh &&
                            <AnimateText><h2 className="text-xl text-gray-800 font-semibold">Seu aparelho gasta {energykWh} kWh por mês</h2></AnimateText>
                    }
                </main>
                <div className="flex flex-col items-center py-6 bg-colorPrimary gap-4 mt-7 flex-grow 2xl:flex-grow-0 2xl:mt-auto">
                    <h1 className="text-2xl font-bold">Entre agora mesmo</h1>
                    <Link to="/login">
                        <button className="button-special">Começar</button>
                    </Link>
                </div>
                <Footer />
            </div>
        </AnimatedWrapper>
    )
}
export default LandingPage;