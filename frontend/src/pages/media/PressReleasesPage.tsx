// src/pages/media/PressReleasesPage.tsx

export default function PressReleasesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--psc-primary)]">
        Media Center
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--psc-on-surface)]">
        Press Releases
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--psc-on-surface-variant)]">
        Official statements issued by the Commission to the press.
      </p>
    </div>
  );
}