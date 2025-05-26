import Footer from '@/components/welcome/footer';
import Navbar from '@/components/welcome/navbar';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Brain, FileText, Users, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Video Modal Component
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div ref={modalRef} className="relative w-full max-w-6xl">
                <button onClick={onClose} className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300">
                    <X className="h-8 w-8" />
                </button>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                    <iframe
                        className="h-full w-full"
                        src="https://www.youtube.com/embed/OtTLiKz3UU4?autoplay=1&controls=1&showinfo=1&rel=0"
                        title="BIODATA Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

// Main Welcome Component
export default function Welcome() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const heroRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const heroVideoRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.from(heroContentRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
            });

            gsap.from(heroVideoRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out',
            });
        }

        if (featuresRef.current) {
            const cards = featuresRef.current.querySelectorAll('.feature-card');
            gsap.from(cards, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                },
            });
        }

        if (benefitsRef.current) {
            const items = benefitsRef.current.querySelectorAll('.benefit-item');
            gsap.from(items, {
                x: -30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: benefitsRef.current,
                    start: 'top 85%',
                },
            });
        }
    }, []);

    useEffect(() => {
        if (showLoginModal && modalRef.current) {
            gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    }, [showLoginModal]);

    const handleGoogleSignIn = async () => {
        try {
            window.location.href = '/auth/google';
        } catch (error) {
            console.error('Google sign in error:', error);
        }
    };

    return (
        <>
            <Head title="BIODATA - AI Resume Builder" />

            <Navbar />

            <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 pt-20 pb-8">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Resume background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
                            {/* Resume document outline */}
                            <rect
                                x="50"
                                y="40"
                                width="300"
                                height="520"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-blue-300"
                            />

                            {/* Header section */}
                            <rect x="70" y="60" width="260" height="40" fill="currentColor" className="text-blue-200" opacity="0.3" />

                            {/* Profile lines */}
                            <line x1="70" y1="120" x2="230" y2="120" stroke="currentColor" strokeWidth="2" className="text-blue-300" />
                            <line x1="70" y1="135" x2="280" y2="135" stroke="currentColor" strokeWidth="1" className="text-blue-300" />
                            <line x1="70" y1="150" x2="250" y2="150" stroke="currentColor" strokeWidth="1" className="text-blue-300" />

                            {/* Section headers */}
                            <rect x="70" y="180" width="80" height="15" fill="currentColor" className="text-purple-300" opacity="0.4" />
                            <rect x="70" y="240" width="100" height="15" fill="currentColor" className="text-purple-300" opacity="0.4" />
                            <rect x="70" y="320" width="90" height="15" fill="currentColor" className="text-purple-300" opacity="0.4" />
                            <rect x="70" y="400" width="70" height="15" fill="currentColor" className="text-purple-300" opacity="0.4" />

                            {/* Content lines */}
                            <line x1="70" y1="210" x2="280" y2="210" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="225" x2="260" y2="225" stroke="currentColor" strokeWidth="1" className="text-gray-400" />

                            <line x1="70" y1="270" x2="290" y2="270" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="285" x2="240" y2="285" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="300" x2="275" y2="300" stroke="currentColor" strokeWidth="1" className="text-gray-400" />

                            <line x1="70" y1="350" x2="285" y2="350" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="365" x2="255" y2="365" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="380" x2="270" y2="380" stroke="currentColor" strokeWidth="1" className="text-gray-400" />

                            <line x1="70" y1="430" x2="200" y2="430" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
                            <line x1="70" y1="445" x2="220" y2="445" stroke="currentColor" strokeWidth="1" className="text-gray-400" />

                            {/* Bullet points */}
                            <circle cx="75" cy="210" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="225" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="270" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="285" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="300" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="350" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="365" r="2" fill="currentColor" className="text-blue-400" />
                            <circle cx="75" cy="380" r="2" fill="currentColor" className="text-blue-400" />
                        </svg>
                    </div>

                    {/* Multiple resume documents */}
                    <div className="absolute top-10 right-10 rotate-12 transform opacity-3">
                        <svg className="h-96 w-64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
                            <rect
                                x="10"
                                y="10"
                                width="280"
                                height="380"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-indigo-300"
                            />
                            <rect x="25" y="25" width="250" height="30" fill="currentColor" className="text-indigo-200" opacity="0.2" />
                            <line x1="25" y1="80" x2="200" y2="80" stroke="currentColor" strokeWidth="1" className="text-indigo-300" />
                            <line x1="25" y1="95" x2="250" y2="95" stroke="currentColor" strokeWidth="1" className="text-indigo-300" />
                            <line x1="25" y1="110" x2="220" y2="110" stroke="currentColor" strokeWidth="1" className="text-indigo-300" />
                        </svg>
                    </div>

                    <div className="absolute bottom-10 left-10 -rotate-6 transform opacity-3">
                        <svg className="h-80 w-56" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350">
                            <rect
                                x="10"
                                y="10"
                                width="230"
                                height="330"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-purple-300"
                            />
                            <rect x="20" y="20" width="210" height="25" fill="currentColor" className="text-purple-200" opacity="0.2" />
                            <line x1="20" y1="65" x2="180" y2="65" stroke="currentColor" strokeWidth="1" className="text-purple-300" />
                            <line x1="20" y1="80" x2="210" y2="80" stroke="currentColor" strokeWidth="1" className="text-purple-300" />
                        </svg>
                    </div>

                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                    <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-indigo-500 opacity-5 blur-3xl"></div>

                    <div className="absolute top-1/4 right-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-400 opacity-70 shadow-lg shadow-blue-500/50"></div>
                    <div
                        className="absolute top-1/3 right-1/3 h-3 w-3 animate-pulse rounded-full bg-purple-400 opacity-70 shadow-lg shadow-purple-500/50"
                        style={{ animationDelay: '1.5s' }}
                    ></div>
                    <div
                        className="absolute right-1/2 bottom-1/4 h-2 w-2 animate-pulse rounded-full bg-indigo-400 opacity-70 shadow-lg shadow-indigo-500/50"
                        style={{ animationDelay: '0.7s' }}
                    ></div>

                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
                </div>

                <div className="relative container mx-auto px-4 py-4 md:py-8">
                    <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                        <div ref={heroContentRef} className="w-full text-center">
                            <h1 className="mb-6 bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-3xl leading-tight font-bold text-transparent md:text-4xl lg:text-5xl">
                                Build Your Perfect Resume with <span className="text-blue-400">AI Magic!</span>
                            </h1>
                        </div>

                        <div ref={heroVideoRef} className="relative z-20 mx-auto w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                            <div
                                className="group relative cursor-pointer overflow-hidden rounded-xl border border-blue-500/20 bg-gray-900/50 shadow-2xl shadow-blue-500/10 backdrop-blur-sm"
                                onClick={() => setShowVideoModal(true)}
                            >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/30 via-transparent to-purple-500/30 opacity-50 blur-md"></div>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

                                <div className="relative aspect-video">
                                    <iframe
                                        className="h-full w-full rounded-xl"
                                        src="https://www.youtube.com/embed/OtTLiKz3UU4?autoplay=1&mute=1&loop=1&playlist=OtTLiKz3UU4&controls=0&showinfo=0&rel=0&modestbranding=1"
                                        title="BIODATA Demo"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="rounded-full bg-blue-500/80 p-4">
                                            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative container mx-auto mt-16 px-4">
                    <div ref={benefitsRef} className="mb-16 rounded-xl bg-gradient-to-r from-gray-800/50 to-blue-900/50 p-8 backdrop-blur-sm">
                        <h2 className="mb-6 text-center text-2xl font-bold text-white">How BIODATA Transforms Your Career</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="benefit-item rounded-lg bg-blue-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                                        <Brain className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For IT Professionals</h3>
                                </div>
                                <p className="text-gray-300">
                                    Showcase your technical skills with industry-specific templates. Highlight your programming languages, frameworks,
                                    and projects.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-blue-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                                        <FileText className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Fresh Graduates</h3>
                                </div>
                                <p className="text-gray-300">
                                    Transform your academic achievements into compelling career stories. AI helps you articulate your potential
                                    effectively.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-blue-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                                        <Users className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Career Changers</h3>
                                </div>
                                <p className="text-gray-300">
                                    Seamlessly transition between industries. AI helps translate your transferable skills into relevant experience.
                                </p>
                            </div>

                            <div className="benefit-item rounded-lg bg-blue-900/30 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                                        <Zap className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">For Everyone</h3>
                                </div>
                                <p className="text-gray-300">
                                    Save hours of formatting and writing. Get professional results instantly with our AI-powered content generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />

            {showLoginModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold">Get Started with BIODATA</h3>
                            <button onClick={() => setShowLoginModal(false)} className="rounded-full p-1 hover:bg-gray-200" aria-label="Close">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-6 text-center">
                            <p className="mb-4 text-gray-600">
                                Create your professional resume in minutes. Sign in with Google to get started with our AI-powered resume builder.
                            </p>

                            <div className="mx-auto mb-4 h-16 w-16 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-full w-full">
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                </svg>
                            </div>

                            <p className="mb-6 text-sm text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 transition hover:bg-gray-50"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
