import copyImg from '../../Assets/images/copy.svg'

import './styles.scss'

type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}