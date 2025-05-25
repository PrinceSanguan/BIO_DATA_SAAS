<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use Exception;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleGoogleCallback()
    {
        try {
            // Get user data from Google
            $googleUser = Socialite::driver('google')->user();

            // Find user by email or create new one
            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                // Check if the email is the admin email
                $userRole = $googleUser->email === 'princesanguan44@gmail.com' ? 'admin' : 'user';

                // Create a new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => Hash::make(rand(100000, 999999)), // Random password
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'user_role' => $userRole,
                ]);
            } else {
                // Only update google_id and avatar, not the user_role
                $user->update([
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                ]);

                // If the email is the admin email and user_role is not admin, update it
                if ($googleUser->email === 'princesanguan44@gmail.com' && $user->user_role !== 'admin') {
                    $user->update(['user_role' => 'admin']);
                }
            }

            // Update last login time
            $user->update(['last_login_at' => now()]);

            // Log the user in
            Auth::login($user);

            // Redirect based on user role
            if ($user->user_role === 'admin') {
                return redirect()->route('admin.dashboard');
            } else {
                return redirect()->route('user.dashboard');
            }
        } catch (Exception $e) {
            // Log the error
            Log::error('Google login error: ' . $e->getMessage());

            // Redirect back with error
            return redirect('/login')->with('error', 'Google login failed. Please try again.');
        }
    }
}
