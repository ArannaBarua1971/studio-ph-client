
"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Eye, Lock, Mail, User, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, signUp } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import showToast from "@/lib/helper/toaster"
import { useState } from "react"

export default function SignUpPage() {

  function getPasswordError(password: string) {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter.";
    return "";
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string, email: string, password: string, image: string
    }

    const error=getPasswordError(data.password)

    if (!error.length) {
      const { data: submitData, error: er } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image
      });
      if (!er) {
        showToast({ message: "Sign up successfull" })
        redirect("/login")
      }
      else {
        showToast({ message: er.message, type: "warning" })
      }
    } else {
      showToast({ message: error, type: "warning" })
    }

  }
  const signInWithGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-4 sm:p-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[0.95fr_1.05fr]">
        {/* Left: brand panel */}
        <aside className="relative hidden min-h-[520px] flex-col justify-between overflow-hidden bg-neutral-950 p-8 text-white md:flex">
          <Image
            src="/images/hero-studio.jpg"
            alt=""
            fill
            priority
            sizes="440px"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/60 to-neutral-950" />

          <div className="relative z-10">
            <span className="flex size-10 items-center justify-center rounded-xl bg-amber-400 text-sm font-bold text-neutral-950">
              SG
            </span>
            <p className="mt-8 text-xs font-bold uppercase tracking-wide text-amber-400">
              Creative Production Platform
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight">
              Access Your Shoot Schedule
            </h2>
          </div>

          <figure className="relative z-10 border-t border-white/10 pt-6">
            <blockquote className="text-xs italic leading-relaxed text-white/85">
              “Booking daylight cycloramas through StudioGrid takes 2 minutes.
              The host guarantees and power specs save us hours on set.”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/15 text-sm font-bold text-amber-400">
                M
              </span>
              <span>
                <span className="block text-xs font-bold">Marcus Vance</span>
                <span className="block text-[11px] text-white/60">
                  Commercial DP, Vance Films
                </span>
              </span>
            </figcaption>
          </figure>
        </aside>

        {/* Right: form */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Sign In to StudioGrid
              </h1>
              <p className="mt-1 text-xs text-neutral-500">
                Enter your credentials to continue
              </p>
            </div>

            <div className="flex shrink-0 rounded-xl bg-neutral-100 p-1 text-xs font-semibold">
              <Link href={"/login"} className="rounded-lg px-3.5 py-1.5 text-neutral-500 hover:text-neutral-800">
                Login
              </Link>
              <Link
                href="/signup"

                className="rounded-lg bg-white px-3.5 py-1.5 text-neutral-900 shadow-sm"
              >
                Register
              </Link>
            </div>
          </div>

          <hr className="my-5 border-neutral-100" />

          <Button
            onClick={() => signInWithGoogle()}
            variant="outline"
            className="h-11 w-full rounded-xl border-neutral-300 text-sm font-medium text-neutral-800"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
            </svg>
            Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wide text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200" />
            Or continue with email
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-neutral-700">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  required
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Lucky Barua"
                  className="h-11 rounded-xl border-neutral-300 pl-9 text-sm placeholder:text-neutral-400 focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-neutral-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. arannabaruase71@gmail.com"
                  className="h-11 rounded-xl border-neutral-300 pl-9 text-sm placeholder:text-neutral-400 focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-neutral-700">
                Photo Url
              </Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  required
                  id="name"
                  type="url"
                  name="image"
                  placeholder="e.g. arannabaruase71@gmail.com"
                  className="h-11 rounded-xl border-neutral-300 pl-9 text-sm placeholder:text-neutral-400 focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-neutral-700">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  required
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 rounded-xl border-neutral-300 px-9 text-sm placeholder:text-neutral-400 focus-visible:border-amber-400 focus-visible:ring-amber-400/30"
                />
                <Eye className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Sign up
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-amber-600 underline underline-offset-2"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}