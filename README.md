# SMAerial - Aerial Drone Photography Portfolio

A modern, responsive portfolio website for SMAerial, showcasing aerial drone photography services tailored for realtors and business owners.

## Features

- **Hero Section**: Eye-catching introduction with call-to-action
- **Services**: Detailed overview of photography services
- **Portfolio Gallery**: Grid display of sample aerial photos
- **About**: Company information and mission
- **Contact Form**: Easy way for clients to get in touch
- **Responsive Design**: Optimized for all devices
- **Fast Loading**: Built with Vite for optimal performance

## Technologies Used

- **React 19**: Modern React with TypeScript
- **Vite**: Fast build tool and dev server
- **CSS**: Custom responsive styling
- **TypeScript**: Type-safe development

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smaerial.com.git
   cd smaerial.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Entry point
├── assets/          # Static assets
└── index.css        # Global styles

public/
└── placeholder*.jpg # Sample images (replace with actual photos)
```

## Customization

### Adding Real Images

Replace the placeholder images in `public/` with your actual aerial photography:

- `placeholder-drone.jpg`: Hero section image
- `placeholder1.jpg` to `placeholder6.jpg`: Portfolio gallery images

### Updating Content

Edit `src/App.tsx` to customize:

- Company name and taglines
- Service descriptions
- About section text
- Contact information

### Styling

Modify `src/App.css` to adjust colors, fonts, and layout to match your brand.

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for CI/CD

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For inquiries about aerial photography services, visit [smaerial.com](https://smaerial.com) or contact us through the website.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# smaerial
