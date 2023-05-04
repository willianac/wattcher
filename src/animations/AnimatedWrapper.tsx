import { animated, useSpring, config } from "@react-spring/web";

type Props = {
    children : React.ReactNode
}

function AnimatedWrapper({ children }: Props) {
    const [springs, api] = useSpring(
        () => ({
            from : { opacity : 0 },
            to : { opacity : 1 },
            config : config.gentle
        }), []
    )
    return <animated.main style={springs} className="h-full">{ children }</animated.main>
}

export function AnimateText({ children }: Props) {
    const [springs, api] = useSpring(
        () => ({
            from : { y : -30 },
            to : { y : 0 },
            config : config.wobbly
        })
    )
    return <animated.div style={springs} className="-z-50">{ children }</animated.div>
}

export default AnimatedWrapper;