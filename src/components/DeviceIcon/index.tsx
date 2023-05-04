import { Badge } from "antd"
import "./styles.css"

type DeviceIconProps = {
    icon_name: string
    quantity?: number
}

function DeviceIcon ({ icon_name, quantity }: DeviceIconProps) {
    let ICON = ""
    let ROOM = ""

    switch (icon_name) {
        case "living_room":
            ICON = "chair"
            ROOM = "Sala"
            break;
        case "bathroom":
            ICON = "shower"
            ROOM = "Banheiro"
            break;
        case "bedroom":
            ICON = "single_bed"
            ROOM = "Quarto"
            break;
        case "office":
            ICON = "meeting_room"
            ROOM = "Escritório"
            break;
        case "backyard":
            ICON = "yard"
            ROOM = "Quintal"
            break;
        case "terrace":
            ICON = "balcony"
            ROOM = "Terraço/Varanda"
            break;
        default:
            ICON = "home"
            ROOM = "Outros"
            break;
    }

    return (
        <>
            <Badge count={quantity} className="flex flex-col items-center -z-10">
                <div className="w-16 h-16 rounded-lg border-2 border-colorPrimary flex items-center justify-center">
                    <span className="material-symbols-rounded text-colorPrimary">{ICON}</span>
                </div>
                <span className="text-sm text-colorPrimary tracking-tight font-semibold">{ROOM}</span> 
            </Badge>
        </>
    )
}

export default DeviceIcon;