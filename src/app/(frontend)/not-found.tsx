import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="theme-ivory mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="statement">Hittar inte sidan</h1>
      <Link href="/">
        Till startsidan
      </Link>
    </main>
  )
}
