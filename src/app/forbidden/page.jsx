import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-xl p-10 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-5xl">
            🚫
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-black text-red-500">
          403
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          Sorry, you do not have permission to access this page.
          Please contact the administrator if you believe this is a mistake.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">

          <Link
            href="/"
            className="flex-1 h-11 rounded-xl bg-amber-400 hover:bg-amber-500 text-neutral-900 font-bold flex items-center justify-center transition"
          >
            Go Home
          </Link>

          <Link
            href="/products"
            className="flex-1 h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-white font-semibold flex items-center justify-center transition"
          >
            Browse Products
          </Link>

        </div>

      </div>
    </section>
  );
}