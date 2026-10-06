import type { ReactNode } from 'react';

interface AuthCardProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AuthCard({ eyebrow, title, description, children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-cream) px-5 py-10">
      <div className="w-full max-w-md border border-(--color-dark)/10 bg-(--color-card) p-7 shadow-2xl shadow-(--color-dark)/10 sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-(--color-terracotta)">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-bold text-(--color-text) sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">{description}</p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}