import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="theme-ivory mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="label">404</p>
      <h1 className="display text-5xl">Hittar inte sidan</h1>
      <Link href="/" className="label underline underline-offset-4">
        Till startsidan
      </Link>
    </main>
  )
}
