<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\GeminiResumeService;

class UserDashboardController extends Controller
{

    protected $geminiService;

    public function __construct(GeminiResumeService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function index()
    {
        $user = Auth::user();

        return Inertia::render('User/Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function generateResume(Request $request)
    {
        $userData = $request->all();

        try {
            $optimizedData = $this->geminiService->optimizeResume($userData);
            $atsScore = $this->geminiService->calculateATSScore($optimizedData);

            return response()->json([
                'success' => true,
                'optimizedData' => $optimizedData,
                'atsScore' => $atsScore,
                'suggestions' => $this->geminiService->getImprovementSuggestions($optimizedData)
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function downloadOptimizedResume(Request $request)
    {
        $optimizedData = $request->input('optimizedData');
        $template = $request->input('template', 'it');

        try {
            // Generate filename from user's name
            $userName = $optimizedData['formData']['name'] ?? 'resume';
            $filename = preg_replace('/[^a-zA-Z0-9\-_]/', '', strtolower(str_replace(' ', '-', $userName))) . '-resume.pdf';

            $pdf = Pdf::loadView("pdf.resume-{$template}", compact('optimizedData'))
                ->setPaper('a4', 'portrait');

            return $pdf->download($filename);
        } catch (\Exception $e) {
            \Log::error('PDF generation failed: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => 'Failed to generate PDF'], 500);
        }
    }
}
