import { useState, useEffect } from "react";

export default function App() {
  const [link, setLink] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("songs");
    if (saved) setSongs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  const fetchSong = async (url) => {
    try {
      const res = await fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();

      return {
        url,
        title: data.title,
        artist: data.author_name,
        cover: data.thumbnail_url,
      };
    } catch {
      return null;
    }
  };

  const addSong = async () => {
    if (!link.includes("spotify.com")) return;

    const song = await fetchSong(link);
    if (!song) return;

    setSongs([...songs, song]);
    setLink("");
  };

  const removeSong = (i) => {
    if (!confirm("Song löschen?")) return;
    setSongs(songs.filter((_, index) => index !== i));
  };

  const copy = (url) => {
    navigator.clipboard.writeText(url);
    alert("kopiert");
  };

  return (
    <div className="app">
      <h1>🎧 Spotify Playlist Test</h1>

      <div className="input">
        <input
          placeholder="Spotify Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addSong}>Add</button>
      </div>

      <div className="list">
        {songs.map((s, i) => (
          <div className="card" key={i}>
            <img src={s.cover} />

            <div className="info">
              <h3>{s.title}</h3>
              <p>{s.artist}</p>
            </div>

            <div className="actions">
              <button onClick={() => copy(s.url)}>Copy</button>
              <button onClick={() => removeSong(i)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}