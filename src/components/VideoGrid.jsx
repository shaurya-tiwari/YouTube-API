import React, { useState } from 'react';
import VideoPlayerModal from './VideoPlayerModal';

export default function VideoGrid({ videoData }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (!videoData || videoData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No videos to display</p>
      </div>
    );
  }

  return (
    <>
      <main className="p-4">
        <h2 className="text-lg font-semibold mb-4">Random Recommended Videos</h2>
        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoData.map((video) => (
            <div
              key={video.videoId}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => openVideo(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  {video.channel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeVideo}
      />
    </>
  );
}
