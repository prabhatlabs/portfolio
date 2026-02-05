# Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX** - Built with Radix UI components and Tailwind CSS
- **Dark Mode Support** - Theme switching with next-themes
- **Animations** - Smooth transitions using Framer Motion
- **GitHub Integration** - Contribution graph with react-github-calendar
- **TypeScript** - Full type safety throughout the application
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Analytics with Vercel Analytics

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Theme**: next-themes
- **Analytics**: Vercel Analytics

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js app router
│   ├── _components/       # Page components
│   └── page.tsx           # Main page
├── components/            # Reusable UI components
├── contexts/              # React contexts
├── data/                  # Static data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Feel free to submit issues and pull requests to improve this portfolio template.
