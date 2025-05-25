import { useState } from 'react';

interface User {
    name: string;
    email: string;
}

interface DashboardProps {
    user: User;
}

interface Education {
    level: string;
    schoolName: string;
    achievement: string;
    schoolYear: string;
}

interface Experience {
    companyName: string;
    role: string;
    year: string;
}

interface Template {
    id: string;
    name: string;
    preview: string;
}

interface OptimizedData {
    optimizedData: any;
    formData: any;
    education: Education[];
    experiences: Experience[];
    atsScore?: number;
    suggestions?: string[];
}

export default function UserDashboard({ user }: DashboardProps) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        github: '',
        linkedin: '',
        summaryOfQualification: '',
        technicalSkills: '',
        honorAndActivities: '',
    });

    const [education, setEducation] = useState<Education[]>([
        { level: 'Primary School', schoolName: '', achievement: '', schoolYear: '' },
        { level: 'Secondary School', schoolName: '', achievement: '', schoolYear: '' },
        { level: 'Tertiary School', schoolName: '', achievement: '', schoolYear: '' },
        { level: 'Doctorate School', schoolName: '', achievement: '', schoolYear: '' },
    ]);

    const [experiences, setExperiences] = useState<Experience[]>([{ companyName: '', role: '', year: '' }]);

    const [jobDescription, setJobDescription] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('it');
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewData, setPreviewData] = useState<OptimizedData | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const templates: Template[] = [{ id: 'it', name: 'IT Professional', preview: '/images/templates/it-preview.jpg' }];

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        setEducation((prev) => prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)));
    };

    const handleExperienceChange = (index: number, field: string, value: string) => {
        setExperiences((prev) => prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)));
    };

    const addExperience = () => {
        setExperiences((prev) => [...prev, { companyName: '', role: '', year: '' }]);
    };

    const removeExperience = (index: number) => {
        setExperiences((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/dashboard/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    formData,
                    education,
                    experiences,
                    template: selectedTemplate,
                    jobDescription,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setPreviewData(result);
                setShowPreview(true);
            } else {
                alert('Failed to generate resume. Please try again.');
            }
        } catch (error) {
            console.error('Generation failed:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadPDF = async () => {
        if (!previewData) return;

        try {
            const response = await fetch('/dashboard/download-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    optimizedData: previewData.optimizedData,
                    template: selectedTemplate,
                }),
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ai-optimized-resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download resume. Please try again.');
        }
    };

    const editResume = () => {
        setShowPreview(false);
        setPreviewData(null);
    };

    if (showPreview && previewData) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Top Navigation */}
                <div className="bg-white shadow-sm dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Resume Preview</h1>
                            <div className="flex space-x-4">
                                <button
                                    onClick={editResume}
                                    className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                                >
                                    Edit Resume
                                </button>
                                <a href="/logout" className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl space-y-6">
                        {/* ATS Score Card */}
                        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ATS Compatibility Score</h2>
                                    <p className="text-gray-600 dark:text-gray-400">How well your resume performs with Applicant Tracking Systems</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold text-green-600">{previewData.atsScore || 0}%</div>
                                    <div className="text-sm text-gray-500">ATS Score</div>
                                </div>
                            </div>
                        </div>

                        {/* Suggestions */}
                        {previewData.suggestions && previewData.suggestions.length > 0 && (
                            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900">
                                <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">AI Suggestions</h3>
                                <ul className="space-y-2">
                                    {previewData.suggestions.map((suggestion, index) => (
                                        <li key={index} className="flex items-start space-x-2 text-blue-800 dark:text-blue-200">
                                            <span className="text-blue-600">•</span>
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Download Section */}
                        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                            <div className="text-center">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Your AI-Optimized Resume is Ready!</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Your resume has been optimized using AI to improve ATS compatibility and professional language.
                                </p>
                                <button
                                    onClick={downloadPDF}
                                    className="transform rounded-lg bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-blue-700"
                                >
                                    Download PDF Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Top Navigation */}
            <div className="bg-white shadow-sm dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome, {user.name}</h1>
                        <a href="/logout" className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
                            Logout
                        </a>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div className="mb-8 text-center">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">AI Resume Builder</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Fill out the information below and let our AI create your perfect resume with ATS optimization
                            </p>
                        </div>

                        <form className="space-y-6">
                            {/* Template Selection */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Choose Template</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {templates.map((template) => (
                                        <div
                                            key={template.id}
                                            onClick={() => setSelectedTemplate(template.id)}
                                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                                selectedTemplate === template.id
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <div className="mb-2 flex h-32 w-full items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{template.name} Preview</span>
                                            </div>
                                            <p className="text-center font-medium text-gray-900 dark:text-gray-100">{template.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Description Field */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Target Job Description (Optional)</h2>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="Paste the job description you're applying for. AI will optimize your resume accordingly and improve keyword matching."
                                />
                            </div>

                            {/* Personal Information */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Personal Information</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
                                        <input
                                            type="url"
                                            value={formData.github}
                                            onChange={(e) => handleInputChange('github', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                                        <input
                                            type="url"
                                            value={formData.linkedin}
                                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Summary of Qualification</h2>
                                <textarea
                                    value={formData.summaryOfQualification}
                                    onChange={(e) => handleInputChange('summaryOfQualification', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="List your skills and abilities that can contribute to the company. AI will enhance this with stronger language and better keywords."
                                />
                            </div>

                            {/* Education */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Education</h2>
                                {education.map((edu, index) => (
                                    <div key={index} className="mb-4 rounded-md bg-white p-4 dark:bg-gray-800">
                                        <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-100">{edu.level}</h3>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                            <input
                                                type="text"
                                                placeholder="School Name"
                                                value={edu.schoolName}
                                                onChange={(e) => handleEducationChange(index, 'schoolName', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Achievement/Degree"
                                                value={edu.achievement}
                                                onChange={(e) => handleEducationChange(index, 'achievement', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                            <input
                                                type="text"
                                                placeholder="School Year"
                                                value={edu.schoolYear}
                                                onChange={(e) => handleEducationChange(index, 'schoolYear', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Technical Skills */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    Technical Skills <span className="text-red-500">*</span>
                                </h2>
                                <textarea
                                    value={formData.technicalSkills}
                                    onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="List your technical skills (programming languages, frameworks, tools, etc.)"
                                    required
                                />
                            </div>

                            {/* Related Experience */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Related Experience</h2>
                                    <button
                                        type="button"
                                        onClick={addExperience}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Add Experience
                                    </button>
                                </div>
                                {experiences.map((exp, index) => (
                                    <div key={index} className="mb-4 rounded-md bg-white p-4 dark:bg-gray-800">
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="font-medium text-gray-900 dark:text-gray-100">Experience {index + 1}</h3>
                                            {experiences.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeExperience(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                value={exp.companyName}
                                                onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Role/What you did"
                                                value={exp.role}
                                                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                value={exp.year}
                                                onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
                                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Honor and Activities */}
                            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-700">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Honor and Extracurricular Activities</h2>
                                <textarea
                                    value={formData.honorAndActivities}
                                    onChange={(e) => handleInputChange('honorAndActivities', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    placeholder="List your honors, awards, certifications, and extracurricular activities"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 text-center">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isGenerating}
                                    className={`transform rounded-lg px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
                                        isGenerating
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:from-blue-700 hover:to-purple-700'
                                    }`}
                                >
                                    {isGenerating ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            <>
                                                <span>Generating AI Resume...</span>
                                            </>
                                        </div>
                                    ) : (
                                        'Generate My AI-Optimized Resume'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
