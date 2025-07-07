# Ethereal

A modern, elegant React + TypeScript + Vite web app template for fashion, e-commerce, or creative projects. Features beautiful UI, smooth animations, and a scalable component structure.

## ✨ Features

- **React 19 + TypeScript**: Latest React and type safety
- **Vite**: Fast dev/build tool
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth, declarative animations
- **Component-driven**: Reusable UI (Button, AnimatedButton, Navigation, Hero, Logo)
- **Radix UI**: Accessible primitives
- **Lucide Icons**: Modern icon set
- **Class Variance Authority**: Variant-based styling
- **Alias Imports**: Use `@/` for clean imports

## 📁 Project Structure

```
ethereal/
├── public/
│   └── image/           # Static images (logo, hero, etc)
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI (Button)
│   │   ├── buttons/     # AnimatedButton
│   │   ├── Logo.tsx     # Brand logo
│   │   └── Navigation.tsx
│   ├── pages/
│   │   └── Hero.tsx     # Main landing section
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx          # App layout
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind & global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the app.

3. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 🛠️ Tech Stack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 🧩 Components
- **Navigation**: Responsive header with animated links and cart icon
- **Hero**: Animated headline, subtext, call-to-action buttons, and hero image
- **Button / AnimatedButton**: Variant-based, accessible, and animated buttons
- **Logo**: Brand logo with hover animation

## 🖼️ Assets
- Place hero and logo images in `public/image/` (e.g., `dress-hero.jpg`, `logo.png`)

## 📝 Utilities
- `cn` (classNames): Utility for conditional class merging (`src/lib/utils.ts`)

## 🧑‍💻 Development Notes
- Uses path aliases (`@/`) via Vite and TypeScript config
- ESLint and TypeScript strict mode enabled
- Tailwind and tw-animate-css for styling and animation

## 📄 License
MIT (or specify your license)

---

> Inspired by modern UI/UX and built for rapid prototyping or production-ready apps.
