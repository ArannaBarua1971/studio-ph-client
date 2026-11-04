
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Compass } from "lucide-react";

export default function Found404() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-xl w-full text-center space-y-7">

                <div className="text-8xl md:text-9xl font-black tracking-tighter text-amber-400">
                    404
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Page Not Found
                    </h1>
                    <p className="text-[#969696] text-sm md:text-base max-w-md mx-auto">
                        Looks like this page has moved or doesn't exist.
                        Let's get you back to discovering creative spaces.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button className="bg-amber-400 hover:bg-amber-400 rounded-xl">
                        <Link href="/" className="flex text-black">
                            <Home className="mr-2 size-4" />
                            Back to Home
                        </Link>
                    </Button>

                    <Button variant="outline" className="rounded-xl">
                        <Link href="/studios" className="flex">
                            <Compass className="mr-2 size-4" />
                            Explore Studios
                        </Link>
                    </Button>
                </div>

                <div className="pt-8 border-t border-[#DDE5DF]">
                    <p className="text-xs text-[#969696]">
                        © 2026 Studio. All rights reserved.
                    </p>
                </div>

            </div>
        </main>
    );
}
