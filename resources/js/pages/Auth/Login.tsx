import { Head } from '@inertiajs/react';

export default function Login() {
    // Handle Google Sign In
    const handleGoogleSignIn = () => {
        window.location.href = '/auth/google';
    };

    return (
        <>
            <Head title="Login - BIODATA" />
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 p-6">
                {/* Background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                    <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-indigo-500 opacity-5 blur-3xl"></div>

                    {/* Floating AI particles */}
                    <div className="absolute top-1/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-400 opacity-70 shadow-lg shadow-blue-500/50"></div>
                    <div
                        className="absolute top-1/3 right-1/3 h-3 w-3 animate-pulse rounded-full bg-purple-400 opacity-70 shadow-lg shadow-purple-500/50"
                        style={{ animationDelay: '1.5s' }}
                    ></div>
                    <div
                        className="absolute right-1/2 bottom-1/4 h-2 w-2 animate-pulse rounded-full bg-indigo-400 opacity-70 shadow-lg shadow-indigo-500/50"
                        style={{ animationDelay: '0.7s' }}
                    ></div>
                    <div
                        className="absolute bottom-1/3 left-1/4 h-2 w-2 animate-pulse rounded-full bg-cyan-400 opacity-70 shadow-lg shadow-cyan-500/50"
                        style={{ animationDelay: '2s' }}
                    ></div>

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
                </div>

                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-900/50 p-8 shadow-2xl backdrop-blur-sm">
                    {/* Edge glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-50 blur-md"></div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                                <img src="/assets/images/logo.png" alt="BIODATA Logo" className="h-full w-full object-contain" />
                            </div>
                            <h1 className="bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-4xl font-bold text-transparent">
                                BIODATA
                            </h1>
                            <p className="mt-2 text-blue-400">AI Resume Builder</p>
                        </div>

                        {/* Main message */}
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 text-2xl font-semibold text-white">Welcome to BIODATA</h2>
                            <p className="text-gray-300">Sign in to create professional resumes with AI and access your saved documents.</p>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-700 bg-white/10 p-4 text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                <path
                                    fill="#4285F4"
                                    d="M24 9.5c3.54 0 6.52 1.28 8.96 3.36l6.64-6.64C34.82 2.02 29.7 0 24 0 14.32 0 6.06 5.74 2.21 13.97l7.81 6.07C12.12 13.34 17.56 9.5 24 9.5z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M46.04 24.5c0-1.47-.13-2.88-.37-4.25H24v8.5h12.54c-.56 2.87-2.07 5.32-4.26 7.05l6.7 6.7c4.31-3.98 6.77-9.79 6.77-16z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.26 28.65c-.64-1.91-1-3.95-1-6.05s.36-4.14 1-6.05l-7.81-6.07C.79 13.17 0 18.44 0 24c0 5.56.79 10.83 2.21 15.52l8.05-6.18z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 48c5.7 0 10.82-2.02 14.7-5.45l-6.7-6.7c-1.96 1.31-4.42 2.07-7 2.07-6.44 0-11.88-3.84-14.04-9.35l-8.05 6.18C6.06 42.26 14.32 48 24 48z"
                                />
                            </svg>
                            Sign in with Google
                        </button>

                        {/* Benefits list */}
                        <div className="mt-8 space-y-3">
                            <p className="text-sm font-medium text-blue-400">Why sign in?</p>
                            <div className="flex items-center text-sm text-gray-300">
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                AI-powered resume creation
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Save and access your resumes
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Multiple professional templates
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                                    <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Instant PDF downloads
                            </div>
                        </div>

                        {/* Back to home link */}
                        <div className="mt-8 text-center text-sm text-gray-400">
                            <a href="/" className="text-blue-400 hover:text-blue-300">
                                ← Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
