<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="application-name" content="BIODATA">

    <!-- SEO Meta Tags -->
    <meta name="description"
        content="Create professional resumes in minutes with AI-powered technology. Free, hassle-free resume builder that transforms your experience into compelling career stories.">
    <meta name="keywords"
        content="AI resume builder, free resume creator, professional resume, AI-powered resume, hassle-free resume, resume generator, CV builder">
    <meta name="author" content="BIODATA">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="BIODATA | Free AI-Powered Resume Builder">
    <meta property="og:description"
        content="Create professional resumes in minutes with our free AI-powered resume builder. Hassle-free and completely free!">
    <meta property="og:image" content="{{ asset('assets/images/logo.png') }}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="BIODATA | Free AI-Powered Resume Builder">
    <meta name="twitter:description"
        content="Create professional resumes in minutes with our free AI-powered resume builder. Hassle-free and completely free!">
    <meta name="twitter:image" content="{{ asset('assets/images/logo.png') }}">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('assets/images/logo.png') }}" type="image/png">
    <link rel="shortcut icon" href="{{ asset('assets/images/logo.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('assets/images/logo.png') }}">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Preload Fonts for Faster Rendering -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Optimized Styling -->
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        /* Ensuring dark mode does not override styles */
        html.dark {
            background-color: oklch(1 0 0);
        }
    </style>

    <!-- Title -->
    <title inertia>BIODATA | Free AI-Powered Resume Builder</title>

    <!-- Schema.org markup for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "BIODATA",
        "description": "Free AI-powered resume builder that creates professional resumes in minutes. Hassle-free resume creation with artificial intelligence technology.",
        "url": "{{ url('/') }}",
        "logo": "{{ asset('assets/images/logo.png') }}",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "AI-powered content generation",
            "Professional resume templates",
            "Instant PDF download",
            "Job-specific formatting",
            "Free to use"
        ]
    }
    </script>

    <!-- Inertia.js & Vite Integration -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="application-name" content="BIODATA">

    <!-- SEO Meta Tags -->
    <meta name="description"
        content="Create professional resumes in minutes with AI-powered technology. Free, hassle-free resume builder that transforms your experience into compelling career stories.">
    <meta name="keywords"
        content="AI resume builder, free resume creator, professional resume, AI-powered resume, hassle-free resume, resume generator, CV builder">
    <meta name="author" content="BIODATA">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="BIODATA | Free AI-Powered Resume Builder">
    <meta property="og:description"
        content="Create professional resumes in minutes with our free AI-powered resume builder. Hassle-free and completely free!">
    <meta property="og:image" content="{{ asset('assets/images/logo.png') }}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="BIODATA | Free AI-Powered Resume Builder">
    <meta name="twitter:description"
        content="Create professional resumes in minutes with our free AI-powered resume builder. Hassle-free and completely free!">
    <meta name="twitter:image" content="{{ asset('assets/images/logo.png') }}">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('assets/images/logo.png') }}" type="image/png">
    <link rel="shortcut icon" href="{{ asset('assets/images/logo.png') }}" type="image/png">
    <link rel="apple-touch-icon" href="{{ asset('assets/images/logo.png') }}">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Preload Fonts for Faster Rendering -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Optimized Styling -->
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        /* Ensuring dark mode does not override styles */
        html.dark {
            background-color: oklch(1 0 0);
        }
    </style>

    <!-- Title -->
    <title inertia>BIODATA | Free AI-Powered Resume Builder</title>

    <!-- Schema.org markup for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "BIODATA",
        "description": "Free AI-powered resume builder that creates professional resumes in minutes. Hassle-free resume creation with artificial intelligence technology.",
        "url": "{{ url('/') }}",
        "logo": "{{ asset('assets/images/logo.png') }}",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "AI-powered content generation",
            "Professional resume templates",
            "Instant PDF download",
            "Job-specific formatting",
            "Free to use"
        ]
    }
    </script>

    <!-- Inertia.js & Vite Integration -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
