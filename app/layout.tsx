import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Aryan — Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Aryan — B.Tech AI Engineering student, Full Stack Developer, 3D Visualizer and Open Source Contributor. View projects, skills, and get in touch.",
  keywords: [
    "Aryan",
    "Full Stack Developer",
    "AI Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
  ],
  authors: [{ name: "Aryan" }],
  openGraph: {
    title: "Aryan — Full Stack Developer & AI Engineer",
    description:
      "B.Tech AI Engineering student. Full Stack Developer, 3D Visualizer & Open Source Contributor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
