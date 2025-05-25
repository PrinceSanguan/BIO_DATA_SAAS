import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navbarRef.current) {
            gsap.from(navbarRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }
    }, []);

    return (
        <nav
            ref={navbarRef}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-gray-900/80 py-3 shadow-lg shadow-blue-500/10 backdrop-blur-md' : 'bg-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                            <img src="/assets/images/logo.png" alt="Logo" className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-xl font-bold text-transparent">
                                BIODATA
                            </span>
                            <span className="ml-1 hidden text-xs text-blue-400 sm:inline-block">AI Resume Builder</span>
                        </div>
                    </Link>

                    <div className="hidden items-center md:flex">
                        <Link href="/login" className="group relative overflow-hidden rounded-lg px-5 py-2.5 transition-all duration-300 ease-out">
                            <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"></span>
                            <span className="relative flex items-center justify-center text-sm font-medium text-white">
                                <Users className="mr-2 h-5 w-5" />
                                Sign In with Google
                            </span>
                        </Link>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none md:hidden" aria-label="Toggle menu">
                        {isOpen ? (
                            <X className="h-6 w-6 text-white" />
                        ) : (
                            <div className="space-y-1">
                                <div className="h-0.5 w-6 bg-white"></div>
                                <div className="h-0.5 w-6 bg-white"></div>
                                <div className="h-0.5 w-6 bg-white"></div>
                            </div>
                        )}
                    </button>
                </div>

                {isOpen && (
                    <div className="mt-4 rounded-lg bg-gray-800/90 pb-4 shadow-lg backdrop-blur-sm md:hidden">
                        <div className="flex flex-col space-y-3 p-4">
                            <Link
                                href="/login"
                                className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20"
                                onClick={() => setIsOpen(false)}
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Sign In with Google
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
