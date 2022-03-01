import { Track } from "./types";

interface Props {
    track: Track,
    index: number,
    max: number
}

function convertDuration(time: string): string {
    // milliseconds to minutes and seconds
    const duration = parseInt(time);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
}

function getPercentage(num: number, max: number): number {
    return num / max * 100;
}

interface ProgressBarProps {
    progress: number
}
function ProgressBar({ progress }: ProgressBarProps) {
    return <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
    </div>
}

function TrackComp({ track, index, max }: Props) {
    return (<li>
        <div className="track-inner">
            <span className="track-index">{index + 1}</span>
            <span className="track-img">
                <img className="img-track" src={track.image[1]["#text"]} alt={track.name} />
            </span>
            <span className="track-details">
                <span className="track-name">{track.name}</span>
                <a href={track.artist.url} target="_blank" className="track-artist">{track.artist.name}</a>
            </span>
            <span className="track-popularity">
                <ProgressBar progress={getPercentage(parseInt(track.listeners), max)} />
                <p>{track.listeners}</p>
            </span>
            <span className="track-time">{convertDuration(track.duration)}</span>
        </div>
    </li>)
}

export default TrackComp;