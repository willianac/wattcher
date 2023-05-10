import { animated, config, useTrail } from "@react-spring/web";

type Props = {
    children : React.ReactNode[]
}

export function AnimatedList({ children }: Props) {
    const trails = useTrail(children.length, {
        from : {opacity : 0},
        to : {opacity: 1},
        config : config.stiff
    })
    return (
        <div>
            {trails.map((props, index) => (
                <animated.div style={props}>{ children[index] }</animated.div>
                ))}
        </div>
    )
}