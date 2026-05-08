# SMAerial

A responsive portfolio and inquiry website for SMAerial, focused on aerial drone photography and video packages for real estate, business, social media, and custom projects.

## Stack

- React
- TypeScript
- Vite
- Custom CSS
- FormSubmit for inquiry delivery

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  App.tsx
  App.css
  index.css
  main.tsx
  assets/

public/
  images/
  videos/
```

## Deployment

The site is configured for Vercel. `vercel.json` rewrites routes back to `index.html` so `/portfolio`, `/services`, and service hash links work as a single-page React app.
