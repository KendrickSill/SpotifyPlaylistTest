import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);

  const addSong = () => {
    if (!input.trim()) return;

    setSongs([
      {
        id: Date.now(),
        url: input,
      },
      ...songs,
    ]);

    setInput("");
  };

  const removeSong = (id) => {
    setSongs(songs.filter((s) => s.id !== id));
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied 🎧");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🎧 Music Playlist</h1>
        <p className="sub">Paste Spotify links and build your vibe</p>

        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Spotify link..."
          />
          <button onClick={addSong}>Add</button>
        </div>

        <div className="list">
          {songs.map((song) => (
            <div className="card" key={song.id}>
              <div className="text">{song.url}</div>

              <div className="actions">
                <button onClick={() => copyLink(song.url)}>Copy</button>
                <button className="danger" onClick={() => removeSong(song.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
