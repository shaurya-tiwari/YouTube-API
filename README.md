# 🎬 YouTube API Explorer

<div align="center">
  
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![YouTube API](https://img.shields.io/badge/YouTube_API-v3-FF0000?style=for-the-badge&logo=youtube&logoColor=white)

A modern, responsive YouTube video search and discovery platform with stunning UI/UX, featuring Pinterest-style masonry layout and traditional grid views.

[Live Demo](https://you-tube-api-rose.vercel.app/) • [Report Bug](https://github.com/shaurya-tiwari/YouTube-API/issues) • [Request Feature](https://github.com/shaurya-tiwari/YouTube-API/issues)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **🔍 Smart Video Search** - Search for any YouTube video using YouTube Data API v3
- **🎲 Random Recommendations** - Get random video suggestions on page load from diverse categories
- **🎥 Video Player Modal** - Watch videos directly in an elegant modal player with autoplay
- **🎨 Dual View Modes**:
  - **Pinterest Grid** - Dynamic masonry layout with intelligent aspect ratio detection
  - **Standard Grid** - Classic 3-column responsive grid layout

### 🎨 UI/UX Excellence
- **🌓 Dark Mode** - Seamless theme switching with persistent localStorage support
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop (1-5 column layouts)
- **✨ Smooth Animations** - Hover effects, transitions, and card interactions
- **🎭 Modern Design** - Gradient backgrounds, glassmorphism, and elegant shadows
- **⚡ Fast Loading** - Built with Vite for lightning-fast development and builds

### 🧠 Smart Features
- **🖼️ Intelligent Image Detection** - Automatically identifies portrait/landscape videos
- **📏 Dynamic Card Heights** - Masonry layout adapts to video aspect ratios
- **⌨️ Keyboard Shortcuts** - Close video player with ESC key
- **🔗 Direct YouTube Links** - Open videos on YouTube.com in new tabs

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- YouTube Data API v3 Key ([Get one here](https://console.cloud.google.com/apis/library/youtube.googleapis.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaurya-tiwari/YouTube-API.git
   cd YouTube-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_youtube_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern React with Hooks and functional components
- **Vite** - Next-generation frontend tooling

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixes

### APIs & Libraries
- **YouTube Data API v3** - Fetch video search results
- **React Icons 5.3** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting with React plugins
- **Vite Plugin React** - Fast Refresh and JSX support

---

## 📁 Project Structure

```
YouTube-API/
├── src/
│   ├── components/
│   │   ├── PinterestGrid.jsx       # Masonry layout component
│   │   ├── VideoGrid.jsx           # Traditional grid component
│   │   ├── VideoPlayerModal.jsx    # Video modal player
│   │   ├── video.jsx               # Legacy video component
│   │   └── downloadvideo.jsx       # (Future feature)
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # Component styles
│   ├── index.css                   # Global styles + Tailwind
│   └── main.jsx                    # App entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint rules
└── package.json                    # Dependencies & scripts
```

---

## 🎯 Usage

### Searching for Videos
1. Type your search query in the search bar
2. Press Enter or click the Search button
3. Browse through results in your preferred view mode

### Switching View Modes
- Click the **Grid** icon for traditional layout
- Click the **Pinterest** icon for masonry layout

### Playing Videos
- Click any video card to open the modal player
- Video plays automatically with YouTube's embedded player
- Press **ESC** or click the **X** button to close
- Click **"Watch on YouTube"** to open in a new tab

### Dark Mode
- Toggle the 🌙/☀️ icon in the header
- Your preference is saved automatically

---


## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all files |

---

## 🔑 API Configuration

This project uses **YouTube Data API v3**. You'll need to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key to your `.env` file

**API Quota**: The free tier provides 10,000 units/day. Each search costs ~100 units.

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- [ ] Download video feature is under development
- [ ] Search history not implemented yet
- [ ] Video playback statistics not displayed

---

## 🗺️ Roadmap

- [ ] Add video download functionality
- [ ] Implement search history with localStorage
- [ ] Add video statistics (views, likes, duration)
- [ ] Implement infinite scroll/pagination
- [ ] Add video playlist creation
- [ ] User authentication and favorites
- [ ] Share functionality for social media


## 👤 Author

**Shaurya Tiwari**

- GitHub: [@shaurya-tiwari](https://github.com/shaurya-tiwari)

---

## 🙏 Acknowledgments

- [YouTube Data API](https://developers.google.com/youtube/v3) - For providing the video search functionality
- [React Icons](https://react-icons.github.io/react-icons/) - For the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Vite](https://vitejs.dev/) - For the blazing fast build tool

---

<div align="center">

Made with ❤️ by Shaurya Tiwari

⭐ Star this repo if you find it helpful!

</div>
