import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/properties', label: 'Properties' },
  { href: '/agreements/new', label: 'New Agreement' },
  { href: '/dues/new', label: 'New Due' },
  { href: '/improvements/new', label: 'New Improvement' },
  { href: '/owners', label: 'Owners' },
  { href: '/tenants', label: 'Tenants' },
];

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <Link href="/dashboard" className="brand">
            Registry Platform
          </Link>
          <nav className="topnav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="topnav__link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="page-wrap">{children}</div>
    </div>
  );
}
