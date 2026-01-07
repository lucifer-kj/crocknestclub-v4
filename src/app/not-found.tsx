import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-[150px] font-black leading-none text-black dark:text-white tracking-tighter select-none">
                404
            </h1>
            <div className="w-24 h-2 bg-primary my-8"></div>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Page Not Found</h2>
            <p className="max-w-md text-gray-500 mb-8 font-medium">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center h-12 px-8 font-bold text-white uppercase tracking-widest bg-black dark:bg-white dark:text-black hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
            >
                Back to Home
            </Link>
        </div>
    )
}
