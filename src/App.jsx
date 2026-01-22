import React, { useState, useEffect } from 'react';
import PinterestGrid from './components/PinterestGrid';
import VideoGrid from './components/VideoGrid';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [videoData, setVideoData] = useState([]);
  const [viewMode, setViewMode] = useState('pinterest');
  const [search, setSearch] = useState('');

  // 🌐 Fetch videos from YouTube API
  const fetchVideos = async (query) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_API_KEY}&q=${query}&part=snippet&type=video&maxResults=12&videoDuration=medium`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data?.items) {
        const rawVideoData = data.items.map((item) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        setVideoData(rawVideoData);
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
      <div className="min-h-screen text-black transition-all bg-gradient-to-br from-gray-50 to-white w-screen dark:from-gray-900 dark:to-gray-800 dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 max-w-7xl mx-auto">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#f7026d] to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#f7026d] to-red-600 bg-clip-text text-transparent">Mini Youtube</h1>
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

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('pinterest')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'pinterest'
                  ? 'bg-[#f7026d] text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Pinterest Style Grid"
            >
              📌 Pinterest
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#f7026d] text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Standard Grid"
            >
              ⬜ Grid
            </button>
          </div>

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
          </div>
        </header>

        {/* Main Content */}
        {viewMode === 'pinterest' ? (
          <PinterestGrid videoData={videoData} />
        ) : (
          <VideoGrid videoData={videoData} />
        )}
      </div>
    </>
  );
}
