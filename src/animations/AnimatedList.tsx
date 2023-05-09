import { animated, useSpring, config } from "@react-spring/web";

type Props = {
    children : React.ReactNode
}

export function AnimatedList({ children }: Props) {
    const [springs, api] = useSpring(
        () => ({
            from : { opacity : 0 },
            to : { opacity : 1 },
            config : config.molasses
        }), []
    )
    return <animated.div style={springs}>{ children }</animated.div>
}