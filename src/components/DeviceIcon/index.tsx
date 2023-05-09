import { Badge } from "antd"
import "./styles.css"

type DeviceIconProps = {
    room_name: string
    quantity?: number
}

function DeviceIcon ({ room_name, quantity }: DeviceIconProps) {
    let ICON = ""

    switch (room_name) {
        case "Sala":
            ICON = "chair"
            break;
        case "Banheiro":
            ICON = "shower"
            break;
        case "Quarto":
            ICON = "single_bed"
            break;
        case "Escritório":
            ICON = "meeting_room"
            break;
        case "Quintal":
            ICON = "yard"
            break;
        case "Terraço/Varanda":
            ICON = "balcony"
            break;
        case "Cozinha":
            ICON = "kitchen"
            break;
        case "Garagem":
            ICON = "warehouse"
            break;
        default:
            ICON = "home"
            break;
    }

    return (
        <>
            <Badge count={quantity} className="flex flex-col items-center -z-10">
                <div className="w-16 h-16 rounded-lg border-2 border-colorPrimary flex items-center justify-center">
                    <span className="material-symbols-rounded text-colorPrimary">{ICON}</span>
                </div>
                <span className="text-sm text-colorPrimary tracking-tight font-semibold">{room_name}</span> 
            </Badge>
        </>
    )
}

export default DeviceIcon;