import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wiz-Demo-Defend',
  description: 'Proactively Defend Your Cloud',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
