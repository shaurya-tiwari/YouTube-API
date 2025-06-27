import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  // 🌐 Fetch videos from YouTube API
  const fetchVideos = async (query) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_API_KEY}&q=${query}&part=snippet&type=video&maxResults=12&videoDuration=medium`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data?.items) {
        const videoElements = data.items.map((item) => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const channel = item.snippet.channelTitle;
          const thumbnail = item.snippet.thumbnails.medium.url;

          return (
            <div key={videoId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-48 object-cover rounded"
                />
              </a>
              <h3 className="mt-2 font-semibold text-sm">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{channel}</p>
            </div>
          );
        });
        setVideos(videoElements);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  // 🔍 Handle search
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === '') return;
    await fetchVideos(search);
  };

  // 🔄 Random topics on first load
  useEffect(() => {
    const randomTopics = ['vlog', 'travel', 'coding', 'cars', 'music', 'football', 'food', 'hindi movies'];
    const topic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    fetchVideos(topic);
  }, []);

  // 🌙 Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <div className="min-h-screen text-black transition-all bg-white w-screen dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 border-b dark:border-gray-700">
          <a href="/">
            <h1 className="text-xl font-bold text-[#f7026d]">Mini Youtube</h1>
          </a>

          {/* Search */}
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 flex-1 md:max-w-xl">
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search YouTube"
              className="px-3 py-1 rounded border text-black dark:text-white dark:bg-gray-800 border-[#f7026d] focus:outline-none flex-grow"
            />
            <button type="submit" className="text-white bg-[#f7026d] px-4 py-1 rounded">
              Search
            </button>
          </form>

          {/* Toggle */}
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-700"></div>
              <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow top-0.5 left-0.5 transition-transform ${darkMode ? 'translate-x-5' : ''
                  }`}
              ></div>
            </div>
            <span className="ml-3 text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </label>
        </header>

        {/* Main Content */}
        <main className="p-4">
          <h2 className="text-lg font-semibold mb-4">Random Recommended Videos</h2>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos}
          </div>
        </main>
      </div>
    </>
  );
}
