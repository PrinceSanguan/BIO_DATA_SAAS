import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface DashboardProps {
    user: {
        name: string;
        email: string;
    };
}

export default function Dashboard({ user }: DashboardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        targetDescription: '',
        personalInformation: '',
        summaryOfQualifications: '',
        education: '',
        technicalSkills: '',
        relatedExperience: '',
        honorsAndActivities: '',
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedResume, setGeneratedResume] = useState<any>(null);
    const [atsScore, setAtsScore] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const steps = [
        {
            step: 1,
            title: 'Target Description',
            field: 'targetDescription',
            placeholder: 'Enter job description or describe yourself (e.g., "I\'m good at programming")',
            maxLength: 500,
        },
        {
            step: 2,
            title: 'Personal Information',
            field: 'personalInformation',
            placeholder: 'name, address, GitHub, LinkedIn',
            maxLength: 300,
        },
        {
            step: 3,
            title: 'Summary of Qualifications',
            field: 'summaryOfQualifications',
            placeholder: 'Describe your key qualifications and strengths',
            maxLength: 400,
        },
        {
            step: 4,
            title: 'Education',
            field: 'education',
            placeholder: 'Put your schools, achievements or degree, and school year',
            maxLength: 400,
        },
        {
            step: 5,
            title: 'Technical Skills',
            field: 'technicalSkills',
            placeholder: 'List your technical skills and technologies',
            maxLength: 300,
        },
        {
            step: 6,
            title: 'Related Experience',
            field: 'relatedExperience',
            placeholder: 'Put your company name, your role, what you did, and the year',
            maxLength: 600,
        },
        {
            step: 7,
            title: 'Honors and Extracurricular Activities',
            field: 'honorsAndActivities',
            placeholder: 'List your honors, awards, and extracurricular activities',
            maxLength: 400,
        },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
        if (!hasSeenModal) {
            setShowModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        localStorage.setItem('hasSeenWelcomeModal', 'true');
        setShowModal(false);
    };

    const handleNext = () => {
        if (currentStep < 7) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleGenerateResume = async () => {
        // Check if all fields are filled
        const allFieldsFilled = steps.every((step) => (formData[step.field as keyof typeof formData] || '').trim().length > 0);

        if (!allFieldsFilled) {
            alert('Please fill all required fields before generating your resume.');
            return;
        }

        setIsGenerating(true);

        try {
            const response = await fetch('/dashboard/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    targetDescription: formData.targetDescription,
                    personalInfo: formData.personalInformation,
                    summaryOfQualifications: formData.summaryOfQualifications,
                    education: formData.education,
                    technicalSkills: formData.technicalSkills,
                    relatedExperience: formData.relatedExperience,
                    honorsAndActivities: formData.honorsAndActivities,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedResume(data.optimizedData);
                setAtsScore(data.atsScore);
                setShowSuccessModal(true);
            } else {
                alert('Failed to generate resume: ' + data.error);
            }
        } catch (error) {
            console.error('Error generating resume:', error);
            alert('An error occurred while generating the resume');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadResume = async () => {
        if (!generatedResume) return;

        try {
            const response = await fetch('/dashboard/download-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    optimizedData: generatedResume,
                    template: 'it',
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resume.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                setShowSuccessModal(false);
            } else {
                alert('Failed to download resume');
            }
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('An error occurred while downloading the resume');
        }
    };

    const getCurrentStepData = () => steps.find((step) => step.step === currentStep);
    const currentStepData = getCurrentStepData();
    const currentFieldValue = formData[currentStepData?.field as keyof typeof formData] || '';
    const allFieldsFilled = steps.every((step) => (formData[step.field as keyof typeof formData] || '').trim().length > 0);

    return (
        <>
            <Head title="Dashboard - BIODATA" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <div></div>
                            <a href="/logout" className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-colors hover:bg-red-700">
                                Logout
                            </a>
                        </div>
                        <div className="text-center">
                            <h1 className="mb-2 text-4xl font-bold text-white">Welcome back, {user.name}!</h1>
                            <p className="text-blue-300">Create your AI-powered resume in 7 simple steps</p>
                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Left Column - Form */}
                            <div>
                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="mb-2 flex justify-between text-sm text-blue-300">
                                        <span>Step {currentStep} of 7</span>
                                        <span>
                                            {Math.round(
                                                (steps.filter((step) => (formData[step.field as keyof typeof formData] || '').trim().length > 0)
                                                    .length /
                                                    7) *
                                                    100,
                                            )}
                                            % Complete
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                                            style={{
                                                width: `${
                                                    (steps.filter((step) => (formData[step.field as keyof typeof formData] || '').trim().length > 0)
                                                        .length /
                                                        7) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Current Step Form */}
                                {currentStepData && (
                                    <div className="rounded-xl border border-blue-500/20 bg-gray-800/50 p-8 backdrop-blur-sm">
                                        <div className="mb-6">
                                            <h2 className="mb-2 text-2xl font-bold text-white">
                                                {currentStep}. {currentStepData.title} <span className="text-red-400">*</span>
                                            </h2>
                                            <div className="flex justify-between text-sm">
                                                <div className="text-red-400">Required field</div>
                                                <div className="text-gray-400">
                                                    Character limit: {currentFieldValue.length}/{currentStepData.maxLength}
                                                </div>
                                            </div>
                                        </div>

                                        <textarea
                                            value={currentFieldValue}
                                            onChange={(e) => {
                                                if (e.target.value.length <= currentStepData.maxLength) {
                                                    handleInputChange(currentStepData.field, e.target.value);
                                                }
                                            }}
                                            placeholder={currentStepData.placeholder}
                                            className={`h-32 w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${
                                                !currentFieldValue.trim()
                                                    ? 'border-red-500 bg-red-900/20 focus:border-red-400'
                                                    : 'border-gray-600 bg-gray-700/50 focus:border-blue-500'
                                            }`}
                                            maxLength={currentStepData.maxLength}
                                        />

                                        {!currentFieldValue.trim() && (
                                            <div className="mt-2 text-sm text-red-400">This field is required to continue.</div>
                                        )}

                                        {/* Navigation Buttons */}
                                        <div className="mt-6 flex justify-between">
                                            <button
                                                onClick={handlePrevious}
                                                disabled={currentStep === 1}
                                                className="rounded-lg bg-gray-600 px-6 py-3 font-bold text-white transition-colors hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-500"
                                            >
                                                Previous
                                            </button>

                                            {currentStep < 7 ? (
                                                <button
                                                    onClick={handleNext}
                                                    disabled={!currentFieldValue.trim()}
                                                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600"
                                                >
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleGenerateResume}
                                                    disabled={isGenerating || !allFieldsFilled}
                                                    className="transform rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-700 disabled:scale-100 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600"
                                                >
                                                    {isGenerating
                                                        ? 'Generating with AI...'
                                                        : !allFieldsFilled
                                                          ? 'Fill all fields first'
                                                          : 'Generate AI Resume'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step Overview */}
                                <div className="mt-8 grid grid-cols-7 gap-2">
                                    {steps.map((step) => {
                                        const stepValue = formData[step.field as keyof typeof formData] || '';
                                        const isCompleted = stepValue.trim().length > 0;

                                        return (
                                            <div
                                                key={step.step}
                                                className={`rounded-lg p-3 text-center text-xs transition-all ${
                                                    step.step === currentStep
                                                        ? 'bg-blue-600 text-white'
                                                        : isCompleted
                                                          ? 'bg-green-600 text-white'
                                                          : 'bg-gray-700 text-gray-400'
                                                }`}
                                            >
                                                <div className="font-bold">{isCompleted && step.step !== currentStep ? '✓' : step.step}</div>
                                                <div className="mt-1 truncate">{step.title}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Jump to Step Buttons */}
                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {steps.map((step) => (
                                        <button
                                            key={step.step}
                                            onClick={() => setCurrentStep(step.step)}
                                            className={`rounded px-3 py-1 text-sm transition-colors ${
                                                step.step === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {step.step}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Live Preview */}
                            <div className="rounded-xl border border-green-500/20 bg-gray-800/50 p-6 backdrop-blur-sm">
                                <h2 className="mb-4 text-xl font-bold text-white">📄 Live Resume Preview</h2>

                                <div className="max-h-96 space-y-4 overflow-y-auto text-sm">
                                    {/* Personal Information Preview */}
                                    {formData.personalInformation && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Personal Information</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.personalInformation}</div>
                                        </div>
                                    )}

                                    {/* Target Description Preview */}
                                    {formData.targetDescription && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Target Description</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.targetDescription}</div>
                                        </div>
                                    )}

                                    {/* Summary Preview */}
                                    {formData.summaryOfQualifications && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Summary of Qualifications</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.summaryOfQualifications}</div>
                                        </div>
                                    )}

                                    {/* Education Preview */}
                                    {formData.education && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Education</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.education}</div>
                                        </div>
                                    )}

                                    {/* Technical Skills Preview */}
                                    {formData.technicalSkills && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Technical Skills</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.technicalSkills}</div>
                                        </div>
                                    )}

                                    {/* Experience Preview */}
                                    {formData.relatedExperience && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Related Experience</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.relatedExperience}</div>
                                        </div>
                                    )}

                                    {/* Honors Preview */}
                                    {formData.honorsAndActivities && (
                                        <div className="rounded-lg bg-gray-700/50 p-4">
                                            <h3 className="mb-2 font-bold text-blue-300">Honors & Activities</h3>
                                            <div className="whitespace-pre-wrap text-gray-300">{formData.honorsAndActivities}</div>
                                        </div>
                                    )}

                                    {/* Empty State */}
                                    {!Object.values(formData).some((value) => value.trim()) && (
                                        <div className="py-8 text-center text-gray-400">
                                            <div className="mb-2 text-4xl">📝</div>
                                            <p>Start filling out the form to see your resume preview here!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Success Modal */}
                        {showSuccessModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="mx-4 max-w-md rounded-xl border border-green-500/20 bg-gray-800 p-6 text-white shadow-2xl">
                                    <div className="text-center">
                                        <div className="mb-4 text-5xl">🎉</div>
                                        <h3 className="mb-4 text-2xl font-bold text-green-400">Success!</h3>
                                        <p className="mb-4 text-gray-300">We successfully generated your AI-powered resume!</p>
                                        <div className="mb-6 rounded-lg border border-green-500/20 bg-green-900/20 p-4">
                                            <div className="font-semibold text-green-400">ATS Score: {atsScore}%</div>
                                            <div className="mt-1 text-sm text-gray-400">Your resume is optimized for Applicant Tracking Systems</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleDownloadResume}
                                                className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-bold text-white transition-colors hover:bg-green-700"
                                            >
                                                📥 Download PDF
                                            </button>
                                            <button
                                                onClick={() => setShowSuccessModal(false)}
                                                className="flex-1 rounded-lg bg-gray-600 px-4 py-3 font-bold text-white transition-colors hover:bg-gray-500"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Welcome Modal */}
                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="mx-4 max-w-md rounded-xl bg-gray-800 p-6 text-white shadow-2xl">
                                    <h3 className="mb-4 text-xl font-bold">Welcome! 👋</h3>
                                    <p className="mb-4 text-gray-300">
                                        Reminder: I'm not storing your information in the database and in fact, this is open source! You can visit the
                                        source code here:
                                        <a
                                            href="https://github.com/PrinceSanguan/BIO_DATA_SAAS"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-1 text-blue-400 underline hover:text-blue-300"
                                        >
                                            https://github.com/PrinceSanguan
                                        </a>
                                    </p>
                                    <button
                                        onClick={handleCloseModal}
                                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
