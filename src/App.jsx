import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);

  const addSong = () => {
    if (!input) return;

    setSongs([
      ...songs,
      {
        url: input,
        id: Date.now(),
      },
    ]);

    setInput("");
  };

  const removeSong = (id) => {
    setSongs(songs.filter((s) => s.id !== id));
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="app">
      <h1>🎧 Spotify Playlist Tool</h1>

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
            <p>{song.url}</p>

            <div className="buttons">
              <button onClick={() => copyLink(song.url)}>Copy</button>
              <button onClick={() => removeSong(song.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
