import { Card, CardContent } from "@/components/ui/card";
import { Headphones, ShieldCheck, UserCheck, Wrench,XIcon} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/adminData/studio";
import Logo from "../components/Logo";

const quickLinks = [
    { label: "Browse Studios", href: "/studios" },
    { label: "Add studio", href: "/add-studio" },
];

const categories = CATEGORIES.map(({ name }) => {
    return {
        label: name,
        href: `/studios?category=${name}`
    }
})



const socials = [
    { label: "X", href: "https://x.com", icon: <i className="fa-brands fa-x-twitter"></i> },
    { label: "Instagram", href: "https://instagram.com", icon: <i className="fa-brands fa-square-instagram"></i> },
    { label: "YouTube", href: "https://youtube.com", icon: <i className="fa-brands fa-youtube"></i> },
    { label: "LinkedIn", href: "https://linkedin.com", icon: <i className="fa-brands fa-linkedin"></i> },
];
const features = [
    {
        icon: ShieldCheck,
        title: "$1,000,000 Liability Shield",
        description:
            "Comprehensive property and casualty protection for verified hosts during scheduled production hours.",
    },
    {
        icon: UserCheck,
        title: "Verified Creator Profiles",
        description:
            "Identity verification, background checks, and portfolio reviews across directors, producers, and hosts.",
    },
    {
        icon: Wrench,
        title: "Equipment Safety & Check-in",
        description:
            "Detailed gear manifests and digital walk-through checklists protect lighting rigs, cameras, and audio boards.",
    },
    {
        icon: Headphones,
        title: "24/7 Production Support",
        description:
            "Live dispatch assistance for access logistics, power questions, or schedule extensions on shoot day.",
    },
];


function Footer() {
    return (
        <div >
            {/* Features */}
            <section className="border-b border-white/10 bg-[#141110] px-4 py-14 sm:px-6 sm:py-16">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Host Guarantee &amp; Creator Support
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
                            Every production space on StudioGrid comes backed by
                            industry-standard safety standards, property protection, and 24/7
                            creator care.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map(({ icon: Icon, title, description }) => (
                            <Card
                                key={title}
                                className="rounded-2xl border-white/10 bg-white/[0.04] py-0 shadow-none"
                            >
                                <CardContent className="p-5">
                                    <div className="grid size-10 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                                        <Icon className="size-[18px]" />
                                    </div>
                                    <h3 className="mt-5 text-sm font-bold text-white">{title}</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                                        {description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-[#141110] text-white">
                <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
                        {/* Logo + mission + socials */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Logo/>
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
                                Making world-class production spaces open to every creator, with
                                verified hosts and full liability protection.
                            </p>
                            <ul className="mt-6 flex items-center gap-2">
                                {socials.map(({ label, href, icon }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 transition-colors hover:text-amber-400"
                                        >
                                            {icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h3 className="text-sm font-bold">Quick Links</h3>
                            <ul className="mt-5 space-y-3">
                                {quickLinks.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className="text-sm text-neutral-400 hover:text-amber-400">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Popular categories */}
                        <div>
                            <h3 className="text-sm font-bold">Popular Categories</h3>
                            <ul className="mt-5 space-y-3">
                                {categories.map((c) => (
                                    <li key={c.label}>
                                        <Link href={c.href} className="text-sm text-neutral-400 hover:text-amber-400">
                                            {c.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-sm font-bold">Newsletter</h3>
                            <form className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                                <Input
                                    type="email"
                                    required
                                    placeholder="you@email.com"
                                    aria-label="Email address"
                                    className="h-11 rounded-xl border-white/15 bg-white/[0.04] text-white placeholder:text-neutral-500"
                                />
                                <Button type="submit" className="h-11 rounded-xl bg-amber-400 px-5 font-bold text-black hover:bg-amber-300">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Copyright & terms */}
                    <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>&copy; {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
                        <Link href="/terms" className="hover:text-amber-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Footer
