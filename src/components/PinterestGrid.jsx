import React, { useState, useEffect, useRef } from 'react';
import VideoPlayerModal from './VideoPlayerModal';

export default function PinterestGrid({ videoData }) {
  const [processedVideos, setProcessedVideos] = useState([]);
  const [columns, setColumns] = useState(4);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef(null);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Detect number of columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1); // Mobile
      } else if (width < 768) {
        setColumns(2); // Tablet
      } else if (width < 1024) {
        setColumns(3); // Small desktop
      } else if (width < 1280) {
        setColumns(4); // Medium desktop
      } else {
        setColumns(5); // Large desktop
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Process videos and detect orientation
  useEffect(() => {
    if (!videoData || videoData.length === 0) {
      setProcessedVideos([]);
      return;
    }

    const processVideos = async () => {
      const processed = await Promise.all(
        videoData.map(async (video) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              const isPortrait = aspectRatio < 1; // Height > Width
              const isLandscape = aspectRatio >= 1; // Width >= Height

              // Calculate dynamic height based on orientation
              let baseHeight;
              if (isPortrait) {
                // Portrait videos: taller cards (phone recordings)
                baseHeight = 400 + Math.random() * 200; // 400-600px
              } else if (aspectRatio > 1.5) {
                // Very wide landscape (16:9 typical)
                baseHeight = 250 + Math.random() * 100; // 250-350px
              } else {
                // Square-ish or slightly landscape
                baseHeight = 300 + Math.random() * 150; // 300-450px
              }

              resolve({
                ...video,
                aspectRatio,
                isPortrait,
                isLandscape,
                calculatedHeight: baseHeight,
                naturalWidth: img.width,
                naturalHeight: img.height,
              });
            };
            img.onerror = () => {
              // Fallback if image fails to load
              resolve({
                ...video,
                aspectRatio: 16 / 9,
                isPortrait: false,
                isLandscape: true,
                calculatedHeight: 300,
                naturalWidth: 320,
                naturalHeight: 180,
              });
            };
            img.src = video.thumbnail;
          });
        })
      );

      setProcessedVideos(processed);
    };

    processVideos();
  }, [videoData]);

  // Organize videos into columns for masonry layout
  const organizeIntoColumns = () => {
    if (processedVideos.length === 0) return [];

    const columnHeights = new Array(columns).fill(0);
    const columnVideos = new Array(columns).fill(null).map(() => []);

    processedVideos.forEach((video) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnVideos[shortestColumnIndex].push(video);
      columnHeights[shortestColumnIndex] += video.calculatedHeight + 16; // 16px for gap
    });

    return columnVideos;
  };

  const columnVideos = organizeIntoColumns();

  if (!videoData || videoData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No videos to display</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div ref={gridRef} className="max-w-7xl mx-auto">
        {/* Pinterest-style Masonry Grid */}
        <div className="flex gap-4" style={{ alignItems: 'flex-start' }}>
          {columnVideos.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex-1"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {column.map((video, videoIndex) => {
                const isPortrait = video.isPortrait;
                const isLandscape = video.isLandscape;

                return (
                  <div
                    key={video.videoId}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{
                      height: `${video.calculatedHeight}px`,
                    }}
                  >
                    {/* Video Thumbnail */}
                    <div 
                      className="relative w-full h-full overflow-hidden cursor-pointer"
                      onClick={() => openVideo(video)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                          isPortrait ? 'object-top' : 'object-center'
                        }`}
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                        <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm cursor-pointer transition-colors">
                          <svg
                            className="w-10 h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Orientation Badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                            isPortrait
                              ? 'bg-purple-500/80 text-white'
                              : 'bg-blue-500/80 text-white'
                          }`}
                        >
                          {isPortrait ? '📱 Portrait' : '📹 Landscape'}
                        </span>
                      </div>
                    </div>

                    {/* Video Info Card - Appears on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-sm md:text-base line-clamp-2 mb-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-300 flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                          {video.channel}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openVideo(video);
                          }}
                          className="text-red-500 hover:text-red-400 transition-colors p-1"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Quick Info - Always Visible at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                      <h3 className="font-semibold text-white text-xs line-clamp-1">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Loading State */}
        {processedVideos.length === 0 && videoData.length > 0 && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#f7026d] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading videos...</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeVideo}
      />
    </div>
  );
}
