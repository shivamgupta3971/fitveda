"use client";

import { useState } from "react";

type Props = {
  onSubmit: (url: string) => void;
};

export default function UrlInput({ onSubmit }: Props) {
  const [mode, setMode] = useState<"url" | "text">("url");
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.output) {
      setVideoUrl(data.output[0]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* 🔁 Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-2 ${mode === "url" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          URL
        </button>
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 ${mode === "text" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Text to Video
        </button>
      </div>

      {/* 🌐 URL MODE */}
      {mode === "url" && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL..."
            className="border p-2 flex-1"
          />
          <button className="bg-green-500 text-white px-4">Load</button>
        </form>
      )}

      {/* 🎬 TEXT TO VIDEO MODE */}
      {mode === "text" && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video..."
            className="border p-2"
          />

          <button
            onClick={generateVideo}
            className="bg-purple-600 text-white px-4 py-2"
          >
            Generate Video
          </button>

          {loading && <p>Generating video...</p>}

          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="mt-3 w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}