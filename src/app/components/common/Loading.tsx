import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#141110] text-white"
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-11 place-items-center rounded-xl bg-amber-400 text-neutral-950">
          <Aperture className="size-6 animate-spin [animation-duration:2s] motion-reduce:animate-none" />
        </span>
        <span className="text-2xl font-bold tracking-tight">StudioSpace</span>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="size-2 animate-bounce rounded-full bg-amber-400 motion-reduce:animate-none" />
        <span className="size-2 animate-bounce rounded-full bg-amber-400 [animation-delay:150ms] motion-reduce:animate-none" />
        <span className="size-2 animate-bounce rounded-full bg-amber-400 [animation-delay:300ms] motion-reduce:animate-none" />
      </div>

      <span className="sr-only">Loading</span>
    </div>
  );
}