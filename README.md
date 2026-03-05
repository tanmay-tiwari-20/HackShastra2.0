# HackShastra 2.0 🚀

Welcome to the official **HackShastra 2.0** repository. This is an interactive, high-performance community platform and event management system built for the HackShastra community.

**Public Landing Page**: A premium, highly animated showcase of our community, events, and vision.

## ✨ Key Features

- **Cinematic Experience**: Heavy use of custom animations (GSAP, Framer Motion) and smooth scrolling (Lenis) for a highly engaging user experience.
- **Dynamic Content**: Data like events, chapters, core team members, and gallery images are fetched dynamically from MongoDB.
- **Theme Support**: Seamless Dark/Light mode transitions tailored to the brand's aesthetic.

## 🛠️ Technology Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org) with React 19.
- **Language**: TypeScript throughout.
- **Styling**: Tailwind CSS v4.
- **Database**: MongoDB (via the native Node.js driver).
- **Animation Libraries**:
  - `framer-motion` & `motion`
  - `@gsap/react` & `gsap`
  - `@use-gesture/react`
- **Scrolling**: `lenis`

## 🚀 Getting Started

To run this project locally, you will need Node.js and an active MongoDB URI.

### 1. Clone the repository

```bash
git clone https://github.com/tanmay-tiwari-20/hackshastra2.0.git
cd hackshastra2.0
```

### 2. Install dependencies

```bash
npm install
# or yarn install / pnpm install / bun install
```

### 3. Run the Development Server

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure Overview

- `app/`: Next.js App Router (Pages, Layouts, API Routes).
  - `api/`: REST endpoints connecting to MongoDB.
- `components/`: Reusable React components (UI elements, Forms, Animated Sections).
- `lib/`: Helper functions, database connection (`mongodb.ts`), and Type definitions (`types.ts`).
- `public/`: Static assets (images, fonts).

---

Built with ❤️ by the HackShastra Team.
