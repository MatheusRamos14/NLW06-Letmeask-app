import copyIcon from '../assets/images/copy.svg'

import '../styles/roomcode.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyToClipboard}>
            <div>
                <img src={copyIcon} alt="ícone representando copiar." />
            </div>
            <span>Sala #-McyUZYdX599qbw4Ksc7</span>
        </button>
    );
}