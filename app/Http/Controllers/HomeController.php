<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Visitor;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Track unique visitor
        $this->trackVisitor($request);

        return Inertia::render('Welcome');
    }

    private function trackVisitor(Request $request)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();
        $today = Carbon::today();

        // Only track one visit per IP per day
        Visitor::firstOrCreate([
            'ip_address' => $ipAddress,
            'visited_at' => $today,
        ], [
            'user_agent' => $userAgent,
        ]);
    }

    public function getVisitorStats()
    {
        $visitors = Visitor::selectRaw('DATE(visited_at) as date, COUNT(DISTINCT ip_address) as unique_visitors')
            ->where('visited_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($visitors);
    }
}
