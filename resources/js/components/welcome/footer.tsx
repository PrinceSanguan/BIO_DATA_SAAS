const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="mb-2">
                        <h3 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">BIODATA</h3>
                    </div>

                    <p className="text-sm text-gray-400">AI-powered resume builder for the future workforce</p>

                    <div className="mt-4 text-xs text-gray-500">
                        <p>© 2025 BIODATA. All rights reserved.</p>
                        <p className="mt-1">
                            Created by{' '}
                            <a
                                href="https://studentwebsolutions.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 transition-colors hover:text-blue-300"
                            >
                                Student Web Solutions
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
