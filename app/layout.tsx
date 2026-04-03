import './globals.css';
import type { ReactNode } from 'react';
import AppShell from '../components/shared/AppShell';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
