<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Visitor;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Get all users
        $users = User::select('id', 'name', 'email', 'user_role', 'created_at', 'last_login_at')
            ->orderBy('created_at', 'desc')
            ->get();

        // Get visitor statistics for last 30 days
        $visitorStats = Visitor::selectRaw('DATE(visited_at) as date, COUNT(DISTINCT ip_address) as unique_visitors')
            ->where('visited_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'users' => $users,
            'visitorStats' => $visitorStats,
            'totalUsers' => $users->count(),
            'totalVisitors' => Visitor::distinct('ip_address')->count(),
        ]);
    }
}
