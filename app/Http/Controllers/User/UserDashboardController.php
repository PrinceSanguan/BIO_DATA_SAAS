<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\Browsershot\Browsershot;
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
            $html = view("pdf.resume-{$template}", compact('optimizedData'))->render();

            // Generate filename from user's name
            $userName = $optimizedData['formData']['name'] ?? 'resume';
            $filename = strtolower(str_replace(' ', '', $userName)) . '-resume.pdf';

            $pdf = Browsershot::html($html)
                ->format('A4')
                ->margins(10, 10, 10, 10)
                ->pdf();

            return response($pdf)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
        } catch (\Exception $e) {
            \Log::error('PDF generation failed: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => 'Failed to generate PDF'], 500);
        }
    }
}
