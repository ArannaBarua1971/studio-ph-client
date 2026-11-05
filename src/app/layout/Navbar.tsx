"use client"
import Link from 'next/link';
import {
    CirclePlus,
    LayoutList,
    CalendarCheck,
    ChevronRight,
    LogOut,
    
} from "lucide-react";
import {usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import Logo from '../components/Logo';



export default function Navbar() {
    const pathname = usePathname()
    const { data } = useSession()
    const router=useRouter()
    const links = [
        { href: "/", name: "Home" },
        { href: "/studios", name: "Explore Studio" },
        { href: "/how-it-works", name: "How it works" },
        {href:"/aboutus",name:"About Us"}
    ]

    const subLinks = [
        { href: "/add-studio", name: "Add Studio", icon: CirclePlus },
        { href: "/my-listings", name: "My Studio Listings", icon: LayoutList },
        { href: "/my-bookings", name: "My Bookings", icon: CalendarCheck },
    ];

    return (
        <header className="sticky top-0 z-40 bg-stone-950/90 text-stone-100 backdrop-blur-md border-b border-stone-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">

                <Logo/>

                <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
                    {
                        links.map(link => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${pathname === link.href ? 'text-amber-400 font-semibold' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))
                    }

                </nav>

                <div className="flex items-center gap-3 shrink-0">
                    {data?.session ? (
                        <div className="relative group">
                            <button
                                type="button"
                                className="flex items-center gap-3 "
                                aria-haspopup="menu"
                            >
                                <span>{data?.user?.name}</span>
                                {data?.user?.image ? (
                                    <img
                                        src={data.user.image}
                                        alt={data.user.name ?? "User avatar"}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                                        {data?.user?.name?.charAt(0) ?? "?"}
                                    </div>
                                )}
                            </button>

                            <div className="absolute right-0 top-full pt-2 hidden group-hover:block  z-50">
                                <ul className="bg-black text-white border-2 text-sm p-3 space-y-2 rounded-md">
                                    {subLinks.map((link) => {
                                        const active = pathname === link.href;
                                        const Icon = link.icon;
                                        return <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={`group/item relative flex items-center gap-3 rounded-lg px-3 py-2 whitespace-nowrap transition-all duration-200
                                                    ${active
                                                        ? "bg-amber-400/10 text-amber-400 font-semibold"
                                                        : "text-zinc-300 hover:bg-white/5 hover:text-white hover:translate-x-1"
                                                    }`}
                                            >
                                                <Icon
                                                    size={16}
                                                    className={`shrink-0 transition-colors ${active ? "text-amber-400" : "text-zinc-500 group-hover/item:text-amber-400"
                                                        }`}
                                                />
                                                <span className="flex-1">{link.name}</span>
                                                <ChevronRight
                                                    size={14}
                                                    className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                                                />
                                            </Link>
                                        </li>
                                    })}
                                    <li
                                        className={`cursor-pointer text-black group/item relative flex items-center gap-3 rounded-lg px-3 py-2 whitespace-nowrap bg-red-400`}
                                        onClick={() => {
                                            signOut({
                                                fetchOptions: {
                                                    onSuccess: () => {
                                                        router.push("/login");
                                                    },
                                                },
                                            })
                                        }}
                                    >
                                        <LogOut
                                            size={16}
                                            className={`shrink-0 transition-colors `}
                                        />
                                        <span className="flex-1">Sign Out</span>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href={"/login"}
                                className="px-3.5 py-1.5 text-xs font-semibold text-stone-200 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Log In
                            </Link>
                            <Link
                                href={"/signup"}
                                className="px-3.5 py-1.5 text-xs font-bold font-display text-stone-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
};
