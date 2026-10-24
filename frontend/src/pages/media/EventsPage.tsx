// src/pages/media/EventsPage.tsx

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--psc-primary)]">
        Media Center
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--psc-on-surface)]">
        Events
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--psc-on-surface-variant)]">
        Upcoming and past events hosted or attended by the Commission.
      </p>
    </div>
  );
}