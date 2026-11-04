import Link from "next/link"
import { Aperture } from "lucide-react";

function Logo() {
    return (
        <div><Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-amber-400 text-neutral-950">
                <Aperture className="size-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">StudioSpace</span>
        </Link></div>
    )
}

export default Logo