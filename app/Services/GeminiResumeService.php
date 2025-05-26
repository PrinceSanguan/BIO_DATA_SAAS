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
    $targetDescription = $userData['targetDescription'] ?? '';
    $personalInfo = $userData['personalInfo'] ?? '';
    $summaryOfQualifications = $userData['summaryOfQualifications'] ?? '';
    $education = $userData['education'] ?? '';
    $technicalSkills = $userData['technicalSkills'] ?? '';
    $relatedExperience = $userData['relatedExperience'] ?? '';
    $honorsAndActivities = $userData['honorsAndActivities'] ?? '';

    return "You are an expert resume writer. Transform this raw resume data into a professional, ATS-friendly resume. 

    CRITICAL INSTRUCTIONS:
    - Parse and organize the comma-separated data properly
    - All content must be in English only
    - Use powerful action verbs and quantified achievements
    - Return ONLY valid JSON with this exact structure:

    {
      \"formData\": {
        \"name\": \"extracted name\",
        \"address\": \"extracted address\", 
        \"github\": \"extracted github\",
        \"linkedin\": \"extracted linkedin\",
        \"summaryOfQualification\": \"enhanced summary\",
        \"technicalSkills\": \"organized technical skills\",
        \"honorAndActivities\": \"enhanced honors and activities\"
      },
      \"education\": [
        {
          \"schoolName\": \"school name\",
          \"level\": \"degree level\", 
          \"achievement\": \"achievements\",
          \"schoolYear\": \"year\"
        }
      ],
      \"experiences\": [
        {
          \"companyName\": \"company\",
          \"role\": \"position\",
          \"year\": \"year\"
        }
      ]
    }

    RAW DATA TO PROCESS:
    Target Description: {$targetDescription}
    Personal Information: {$personalInfo}
    Summary: {$summaryOfQualifications}
    Education: {$education}
    Technical Skills: {$technicalSkills}
    Experience: {$relatedExperience}
    Honors: {$honorsAndActivities}

    Parse each field carefully and enhance the content professionally.";
  }


  public function calculateATSScore($optimizedData)
  {
    $score = 0;
    $content = strtolower(json_encode($optimizedData));

    // Enhanced action verbs for IT professionals
    $actionVerbs = ['engineered', 'architected', 'developed', 'implemented', 'optimized', 'spearheaded', 'revolutionized', 'automated', 'streamlined', 'enhanced', 'delivered', 'managed', 'led', 'created', 'designed', 'built', 'deployed'];
    foreach ($actionVerbs as $verb) {
      if (strpos($content, $verb) !== false) $score += 4;
    }

    // Check for quantifiable results (more comprehensive)
    if (preg_match('/\d+%|\$\d+|\d+\+|\d+x|by \d+/', $content)) $score += 20;

    // Technical skills presence
    if (!empty($optimizedData['formData']['technicalSkills'])) $score += 25;

    // Check for IT-specific keywords
    $techKeywords = ['api', 'database', 'cloud', 'agile', 'scrum', 'ci/cd', 'microservices', 'devops', 'aws', 'azure', 'docker', 'kubernetes'];
    foreach ($techKeywords as $keyword) {
      if (strpos($content, $keyword) !== false) $score += 3;
    }

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
