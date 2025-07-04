# 🎮 3D FPS Portfolio

A unique and interactive 3D first-person shooter style portfolio website built with React and Three.js. Navigate through space, aim with tactical precision, and shoot at planets to explore different sections of the portfolio.

![3D FPS Portfolio](https://img.shields.io/badge/3D-Portfolio-blue) ![React](https://img.shields.io/badge/React-18.x-blue) ![Three.js](https://img.shields.io/badge/Three.js-Latest-green) ![Vite](https://img.shields.io/badge/Vite-Latest-purple)

## ✨ Features

- **🎯 FPS-Style Navigation**: Full first-person shooter controls with WASD movement and mouse look
- **🔫 Tactical Gun Viewmodel**: Realistic weapon positioning like Valorant/CS:GO
- **🌍 Interactive Planets**: Shoot at different planets to navigate portfolio sections
- **🎮 Pointer Lock Controls**: Professional FPS camera controls with pointer lock API
- **💫 3D Space Environment**: Immersive space setting with dynamic lighting
- **⚡ Modern UI**: Tactical shooter-inspired crosshair and control panel
- **📱 Responsive Design**: Works across different screen sizes
- **🚀 Fast Performance**: Optimized with Vite and efficient Three.js rendering

## 🎮 Controls

| Key | Action |
|-----|--------|
| **Click** | Enter Combat Mode (Pointer Lock) |
| **WASD** | Movement |
| **Mouse** | Aim/Look Around |
| **Left Click** | Fire at Planets |
| **Right Click** | Exit Combat Mode |
| **Shift** | Sprint/Run |
| **Space** | Fly Up |
| **C** | Fly Down |

## 🛠️ Tech Stack

- **Frontend**: React 18, Three.js, React Three Fiber
- **Build Tool**: Vite
- **3D Models**: GLB format
- **Styling**: CSS-in-JS
- **Lighting**: Advanced Three.js lighting setup
- **Controls**: Custom FPS controller with pointer lock

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/3d-fps-portfolio.git
   cd 3d-fps-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── pages/
│   └── Home.jsx                 # Main page (clean & minimal)
├── components/
│   ├── FPSController.jsx        # Camera controls & movement
│   ├── ShootingSystem.jsx       # Raycasting & shooting logic
│   ├── GameManager.jsx          # System orchestration
│   ├── SceneLighting.jsx        # 3D lighting setup
│   ├── UI/
│   │   ├── Crosshair.jsx        # Tactical crosshair
│   │   └── ControlsPanel.jsx    # Control instructions
│   └── Scene/
│       └── PortfolioScene.jsx   # 3D scene with planets
├── models/
│   ├── Gun.jsx                  # FPS gun viewmodel
│   └── Planet.jsx               # Interactive planet objects
└── public/assets/3d/
    ├── Gun.glb                  # 3D gun model
    └── Planet.glb               # 3D planet model
```

## 🎯 Portfolio Sections

- **🌍 Planet About**: Personal information and skills
- **🚀 Planet Projects**: Showcase of projects and work
- **📞 Planet Contact**: Contact information and social links

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Planets

1. Add your 3D model to `public/assets/3d/`
2. Update `PortfolioScene.jsx` with new planet configuration
3. Add corresponding portfolio content

### Customizing Controls

Edit `FPSController.jsx` to modify:
- Movement speed
- Mouse sensitivity  
- Key bindings
- Camera constraints

## 🎨 Customization

### Crosshair Styling
Modify `components/UI/Crosshair.jsx` for different crosshair designs.

### Gun Positioning
Adjust gun scale and position in `models/Gun.jsx` for different FPS feels.

### Lighting
Update `SceneLighting.jsx` for different atmospheric effects.

## 🌟 Performance Optimization

- Models are efficiently loaded with `useGLTF`
- Raycasting excludes gun objects for optimal performance
- Clean component separation prevents unnecessary re-renders
- Vite provides fast bundling and hot-reload

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Three.js community for excellent 3D capabilities
- React Three Fiber for seamless React integration
- Inspiration from tactical FPS games like Valorant and CS:GO

---

⭐ **Star this repo if you found it helpful!**

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
