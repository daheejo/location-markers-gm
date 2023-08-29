interface markerInfoBoxProps {
    name: string;
    lat: number;
    lng: number;
}

const MarkerInfoBox: React.FC<markerInfoBoxProps> = ({ name, lat, lng }) => {
    return (
        <div className="infobox">
            <p className="info-text">{name}</p>
            <p className="info-text">lat: {lat}</p>
            <p className="info-text">lng: {lng}</p>
        </div>
    )
}

export default MarkerInfoBox;