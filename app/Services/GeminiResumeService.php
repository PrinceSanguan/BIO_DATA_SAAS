<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeminiResumeService
{
  protected $apiKey;

  public function __construct()
  {
    $this->apiKey = env('GEMINI_API_KEY');
  }

  public function optimizeResume($userData)
  {
    try {
      $prompt = $this->buildOptimizationPrompt($userData);

      $response = Http::timeout(30)->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={$this->apiKey}", [
        'contents' => [
          [
            'parts' => [
              ['text' => $prompt]
            ]
          ]
        ]
      ]);

      if (!$response->successful()) {
        throw new \Exception('API request failed: ' . $response->body());
      }

      $result = $response->json();

      if (!isset($result['candidates'][0]['content']['parts'][0]['text'])) {
        throw new \Exception('Invalid API response structure');
      }

      $text = $result['candidates'][0]['content']['parts'][0]['text'];

      // Clean up the response text
      $text = trim($text);
      $text = preg_replace('/^```json\s*/', '', $text);
      $text = preg_replace('/\s*```$/', '', $text);

      $decoded = json_decode($text, true);

      if (json_last_error() !== JSON_ERROR_NONE) {
        // If JSON fails, return original data
        return $userData;
      }

      return $decoded;
    } catch (\Exception $e) {
      \Log::error('Resume optimization failed: ' . $e->getMessage());
      return $userData; // Return original data on failure
    }
  }

  private function buildOptimizationPrompt($userData)
  {
    $jobDescription = $userData['jobDescription'] ?? '';

    return "You are an expert resume writer. Optimize this resume data for ATS systems and improve professional wording. " .
      ($jobDescription ? "Tailor it specifically for this job posting: {$jobDescription}. " : "") .
      "Return ONLY valid JSON with the exact same structure but with improved, professional content. " .
      "Use strong action verbs, quantify achievements where possible, and include relevant keywords. " .
      "Do not add any markdown formatting or code blocks - just return the raw JSON. " .
      "Resume data: " . json_encode($userData);
  }

  public function calculateATSScore($optimizedData)
  {
    // ATS scoring logic based on keywords, formatting, etc.
    $score = 0;

    // Check for action verbs
    $actionVerbs = ['managed', 'developed', 'implemented', 'improved', 'increased', 'decreased', 'created', 'designed', 'led', 'achieved'];
    $content = strtolower(json_encode($optimizedData));
    foreach ($actionVerbs as $verb) {
      if (strpos($content, $verb) !== false) $score += 5;
    }

    // Check for quantifiable results
    if (preg_match('/\d+%|\$\d+|\d+\+/', $content)) $score += 15;

    // Check technical skills presence
    if (!empty($optimizedData['formData']['technicalSkills'])) $score += 20;

    return min($score, 100);
  }

  public function getImprovementSuggestions($optimizedData)
  {
    $suggestions = [];

    if (strlen($optimizedData['formData']['summaryOfQualification']) < 100) {
      $suggestions[] = "Expand your summary with more specific achievements";
    }

    if (count($optimizedData['experiences']) < 2) {
      $suggestions[] = "Add more relevant experience entries";
    }

    return $suggestions;
  }
}
