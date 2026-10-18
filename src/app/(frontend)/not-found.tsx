import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="theme-ivory mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="display text-5xl">Hittar inte sidan</h1>
      <Link href="/" className="underline">
        Till startsidan
      </Link>
    </main>
  )
}
