
export default function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-[var(--psc-border,rgba(0,0,0,0.1))] pt-6">
      <div className="flex flex-col items-center justify-center gap-1 text-center opacity-70">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--psc-on-surface,#0f172a)]">
          Public Service Commission
        </p>
        <p className="text-[9px] text-[var(--psc-on-surface-variant,#64748b)]">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
}
