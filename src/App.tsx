import { useEffect, useState } from "react"
import Header from "./Header";
import TrackComp from "./Track";
import { Attr, Track } from "./types";

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [pagination, setPagination] = useState<Attr | null>(null)
  const [error, setError] = useState<null | undefined | any>(null);
  let [maxPopularity, setMaxPopularity] = useState<number>(0);

  async function fetchTrendingTracks() {
    /* Create a LastFM object */
    const lastfm = {
      apiKey: 'f21088bf9097b49ad4e7f487abab981e',
      apiSecret: '7ccaec2093e33cded282ec7bc81c6fca'
    };

    /* Load trending tracks info. */
    try {
      const stream = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${lastfm.apiKey}&format=json`, {});
      const response = await stream.json();
      const { tracks: { track: temp, '@attr': attr } } = response;
      const max = [...temp].map(track => parseInt(track.listeners)).reduce((a, b) => Math.max(a, b));
      setMaxPopularity(max);
      setTracks(temp || []);
      setPagination(attr || null);
      setError(null);
    } catch (error) {
      setTracks([]);
      setError(error);
    }

  }

  useEffect(() => {
    fetchTrendingTracks();
  }, [])

  return (
    <div className="App">
      <Header />
      {!error ?
        <ul className="tracks">
          <li>
            <div className="track-inner track-header">
              <span className="track-index">#</span>
              <span className="track-img"></span>
              <span className="track-details">Details</span>
              <span className="track-popularity">Popularity</span>
              <span className="track-time">time</span>
            </div>
          </li>
          {tracks.map((track: Track, index: number) => <TrackComp key={index} track={track} index={index} max={maxPopularity} />)}
        </ul> :
        <pre>{JSON.stringify(error)}</pre>
      }
    </div>
  )
}

export default App
