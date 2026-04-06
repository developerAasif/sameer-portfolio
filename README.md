# Modern Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ Next.js 16 with App Router
- 🎨 shadcn/ui components
- 💅 Tailwind CSS v4
- 📱 Fully responsive design
- 🌙 Dark mode support (ready to implement)
- 🔒 TypeScript for type safety
- ✨ ESLint for code quality
- 🚀 Optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions
├── public/              # Static assets
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Adding shadcn/ui Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Customization

1. Modify metadata in `src/app/layout.tsx`
2. Customize colors and theme in `src/app/globals.css`
3. Add your content and components

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Code Quality:** ESLint

## License

MIT
