import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Brain,
    Zap,
    Shield,
    Rocket,
    Check,
    ChevronLeft,
    ChevronRight,
    X,
    Sparkles,
    Database,
    Lock,
    Users,
    Code,
    Layers,
    Settings
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// Types
type ProjectType = 'ai' | 'saas' | 'security' | 'custom';
type FormData = {
    projectType: ProjectType | null;
    features: string[];
    timeline: number;
    teamSize: 'solo' | 'small' | 'medium' | 'large';
    budgetRange: 'startup' | 'growing' | 'enterprise';
    description: string;
    successCriteria: string;
    name: string;
    email: string;
    company: string;
};

const ProjectLab: React.FC = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState<FormData>({
        projectType: null,
        features: [],
        timeline: 3,
        teamSize: 'small',
        budgetRange: 'growing',
        description: '',
        successCriteria: '',
        name: '',
        email: '',
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitSuccess, setSubmitSuccess] = React.useState(false);

    // Project type options
    const projectTypes = [
        { id: 'ai' as const, icon: Brain, title: 'AI Automation', description: 'Intelligent workflows' },
        { id: 'saas' as const, icon: Zap, title: 'SaaS Platform', description: 'Global infrastructure' },
        { id: 'security' as const, icon: Shield, title: 'Security', description: 'Military-grade encryption' },
        { id: 'custom' as const, icon: Rocket, title: 'Custom MVP', description: 'Bespoke solutions' }
    ];

    // Features based on project type
    const featuresByType: Record<ProjectType, Array<{ id: string; label: string; icon: any }>> = {
        ai: [
            { id: 'nlp', label: 'NLP', icon: Sparkles },
            { id: 'analytics', label: 'Analytics', icon: Database },
            { id: 'automation', label: 'Automation', icon: Settings },
            { id: 'ml-models', label: 'ML Models', icon: Code },
        ],
        saas: [
            { id: 'auth', label: 'Authentication', icon: Lock },
            { id: 'multi-tenant', label: 'Multi-tenancy', icon: Users },
            { id: 'payments', label: 'Payments', icon: Sparkles },
            { id: 'admin', label: 'Dashboard', icon: Layers },
            { id: 'api', label: 'API', icon: Code },
        ],
        security: [
            { id: 'encryption', label: 'Encryption', icon: Lock },
            { id: 'pen-test', label: 'Pen Testing', icon: Shield },
            { id: 'compliance', label: 'Compliance', icon: Check },
            { id: 'monitoring', label: 'Monitoring', icon: Database },
        ],
        custom: [
            { id: 'frontend', label: 'Frontend', icon: Code },
            { id: 'backend', label: 'Backend', icon: Database },
            { id: 'integrations', label: 'Integrations', icon: Layers },
            { id: 'deploy', label: 'CI/CD', icon: Rocket },
        ]
    };

    const handleProjectTypeSelect = (type: ProjectType) => {
        setFormData({ ...formData, projectType: type, features: [] });
        setCurrentStep(2);
    };

    const toggleFeature = (featureId: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(f => f !== featureId)
                : [...prev.features, featureId]
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setTimeout(() => {
            setFormData({
                projectType: null,
                features: [],
                timeline: 3,
                teamSize: 'small',
                budgetRange: 'growing',
                description: '',
                successCriteria: '',
                name: '',
                email: '',
                company: ''
            });
            setCurrentStep(1);
            setSubmitSuccess(false);
        }, 3000);
        setIsSubmitting(false);
    };

    const getComplexity = () => {
        const count = formData.features.length;
        if (count <= 2) return { label: 'Simple', color: 'text-green-600' };
        if (count <= 4) return { label: 'Medium', color: 'text-yellow-600' };
        return { label: 'Complex', color: 'text-red-600' };
    };

    return (
        <section className="bg-brand-hero min-h-screen flex flex-col pt-24 pb-12 px-4 sm:px-6 lg:px-12 overflow-x-hidden relative">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-start lg:pt-8 relative z-10">
                {/* Header Section */}
                <div className="mb-6 lg:mb-10 text-center px-4">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-brand-black leading-tight mb-2 md:mb-4">
                        project studio<br />
                        <span className="text-brand-textTertiary text-xl md:text-3xl lg:text-4xl mt-2 block font-medium tracking-tight">Build your vision in 5 steps.</span>
                    </h2>
                </div>

                {/* Close Button */}
                <Link
                    to="/"
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-[100] w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all text-brand-black hover:text-red-500"
                >
                    <X size={24} />
                </Link>

                {/* Progress Indicator */}
                <div className="mb-8 md:mb-12">
                    <div className="bg-white/80 backdrop-blur-xl border border-black/[0.03] rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-lg max-w-3xl mx-auto overflow-x-auto">
                        <div className="flex justify-center items-center gap-2 md:gap-4 min-w-max px-4">
                            {[1, 2, 3, 4, 5].map((step) => (
                                <div key={step} className="flex items-center gap-2 md:gap-4">
                                    <div
                                        className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 text-sm md:text-lg font-black ${step < currentStep
                                            ? 'bg-brand-black text-white shadow-md'
                                            : step === currentStep
                                                ? 'bg-brand-black text-white scale-110 shadow-xl ring-4 ring-brand-black/20'
                                                : 'bg-white border-2 border-black/10 text-brand-textTertiary'
                                            }`}
                                    >
                                        {step < currentStep ? <Check size={20} className="md:w-7 md:h-7" /> : <span>{step}</span>}
                                    </div>
                                    {step < 5 && (
                                        <div className={`w-8 md:w-16 h-1 md:h-1.5 rounded-full transition-all duration-500 ${step < currentStep ? 'bg-brand-black' : 'bg-black/10'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-start justify-center pb-12 w-full">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Project Vision */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full max-w-4xl flex flex-col"
                            >
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-3 md:mb-5 text-center tracking-tight px-4">
                                    What type of project do you envision?
                                </h3>
                                <p className="text-brand-textSecondary text-center mb-6 md:mb-10 text-sm md:text-lg opacity-80 px-4">
                                    Choose the category that best fits your idea
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-4">
                                    {projectTypes.map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => handleProjectTypeSelect(type.id)}
                                                className="group bg-white border-2 border-black/[0.03] rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-black/20 hover:-translate-y-1 transition-all duration-500 shadow-[0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] text-left flex flex-col h-full"
                                            >
                                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-brand-hero flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-black transition-all">
                                                    <Icon className="w-7 h-7 md:w-10 md:h-10 text-brand-black group-hover:text-white transition-colors" />
                                                </div>
                                                <h4 className="text-lg md:text-2xl font-bold text-brand-black mb-2 tracking-tight">
                                                    {type.title}
                                                </h4>
                                                <p className="text-brand-textSecondary text-sm md:text-base leading-snug opacity-80">
                                                    {type.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Feature Selection */}
                        {currentStep === 2 && formData.projectType && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full max-w-4xl flex flex-col"
                            >
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-2 md:mb-4 text-center tracking-tight px-4">
                                    Select the features you need
                                </h3>
                                <p className="text-brand-textSecondary text-center mb-5 md:mb-8 text-sm md:text-lg opacity-80 px-4">
                                    Choose all that apply
                                </p>

                                {/* Complexity */}
                                <div className="flex justify-center mb-6 md:mb-8">
                                    <div className="inline-flex items-center px-4 py-2 border-2 rounded-full bg-white shadow-sm border-black/5">
                                        <span className="text-xs md:text-sm font-bold text-brand-textTertiary mr-2 md:mr-3 uppercase tracking-wider">Complexity:</span>
                                        <span className={`text-sm md:text-base font-bold ${getComplexity().color}`}>
                                            {getComplexity().label}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 mb-8 md:mb-12 px-4">
                                    {featuresByType[formData.projectType].map((feature) => {
                                        const FeatureIcon = feature.icon;
                                        const isSelected = formData.features.includes(feature.id);
                                        return (
                                            <button
                                                key={feature.id}
                                                onClick={() => toggleFeature(feature.id)}
                                                className={`relative bg-white border-2 rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-300 text-left flex items-center gap-4 ${isSelected
                                                    ? 'border-brand-black bg-brand-hero shadow-[0_8px_16px_rgba(0,0,0,0.08)] scale-[1.01]'
                                                    : 'border-black/[0.03] hover:border-black/20 hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]'
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-black flex items-center justify-center shadow-md">
                                                        <Check size={16} className="text-white md:w-5 md:h-5" />
                                                    </div>
                                                )}
                                                <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-brand-black' : 'bg-brand-hero'
                                                    }`}>
                                                    <FeatureIcon size={24} className={`md:w-8 md:h-8 ${isSelected ? 'text-white' : 'text-brand-black'}`} />
                                                </div>
                                                <h5 className="text-base md:text-xl font-bold text-brand-black leading-tight flex-1 pr-6">
                                                    {feature.label}
                                                </h5>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex justify-between items-center w-full px-4 gap-4">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border-2 border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm md:text-lg font-bold"
                                    >
                                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        disabled={formData.features.length === 0}
                                        className="flex items-center gap-2 px-8 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl bg-brand-black text-white hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-xl text-sm md:text-lg font-bold"
                                    >
                                        <span>Continue</span>
                                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Timeline & Scale */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full max-w-3xl flex flex-col"
                            >
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-2 md:mb-4 text-center tracking-tight px-4">
                                    Timeline & Project Scale
                                </h3>
                                <p className="text-brand-textSecondary text-center mb-6 md:mb-10 text-sm md:text-lg opacity-80 px-4">
                                    Help us understand your expectations
                                </p>

                                <div className="space-y-8 md:space-y-12 bg-white border-2 border-black/[0.03] rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] mb-8 md:mb-12 mx-4">
                                    {/* Timeline */}
                                    <div>
                                        <label className="flex items-center justify-between text-base md:text-xl font-bold text-brand-black mb-4 md:mb-6">
                                            <span>Timeline</span>
                                            <span className="bg-brand-hero px-4 py-1.5 rounded-full text-brand-black border border-black/5">
                                                {formData.timeline} months
                                            </span>
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="12"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: parseInt(e.target.value) })}
                                            className="w-full h-2 md:h-3 bg-black/10 rounded-full appearance-none cursor-pointer accent-brand-black hover:accent-gray-800 transition-all"
                                        />
                                        <div className="flex justify-between text-xs md:text-sm text-brand-textSecondary mt-3 font-bold uppercase tracking-wider opacity-80">
                                            <span>Urgent</span>
                                            <span>Long-term</span>
                                        </div>
                                    </div>

                                    {/* Team Size */}
                                    <div>
                                        <label className="block text-base md:text-xl font-bold text-brand-black mb-4 md:mb-6">Team Size Required</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                            {['solo', 'small', 'medium', 'large'].map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setFormData({ ...formData, teamSize: size as any })}
                                                    className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-bold capitalize transition-all duration-300 border-2 ${formData.teamSize === size
                                                        ? 'bg-brand-black border-brand-black text-white shadow-lg scale-[1.02]'
                                                        : 'bg-white border-black/10 text-brand-textSecondary hover:border-black/30 hover:bg-brand-hero'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-base md:text-xl font-bold text-brand-black mb-4 md:mb-6">Investment Range</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                                            {['startup', 'growing', 'enterprise'].map((budget) => (
                                                <button
                                                    key={budget}
                                                    onClick={() => setFormData({ ...formData, budgetRange: budget as any })}
                                                    className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg font-bold capitalize transition-all duration-300 border-2 ${formData.budgetRange === budget
                                                        ? 'bg-brand-black border-brand-black text-white shadow-lg scale-[1.02]'
                                                        : 'bg-white border-black/10 text-brand-textSecondary hover:border-black/30 hover:bg-brand-hero'
                                                        }`}
                                                >
                                                    {budget}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center w-full px-4 gap-4">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border-2 border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm md:text-lg font-bold"
                                    >
                                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="flex items-center gap-2 px-8 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl bg-brand-black text-white hover:-translate-y-1 active:scale-95 transition-all shadow-xl text-sm md:text-lg font-bold"
                                    >
                                        <span>Continue</span>
                                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Project Details */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full max-w-3xl flex flex-col"
                            >
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-2 md:mb-4 text-center tracking-tight px-4">
                                    Tell us about your vision
                                </h3>
                                <p className="text-brand-textSecondary text-center mb-6 md:mb-10 text-sm md:text-lg opacity-80 px-4">
                                    The more detail, the better
                                </p>

                                <div className="space-y-6 md:space-y-8 bg-white border-2 border-black/[0.03] rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] mb-8 md:mb-12 mx-4">
                                    <div>
                                        <label className="block text-xs md:text-sm font-bold text-brand-textTertiary mb-3 md:mb-4 uppercase tracking-wider">
                                            Project Description *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Describe the core problem you are solving, your target audience, and main goals..."
                                            rows={5}
                                            className="w-full px-5 py-4 border-2 border-black/10 rounded-xl md:rounded-2xl focus:border-brand-black focus:ring-4 focus:ring-black/5 focus:outline-none resize-none text-base md:text-lg bg-brand-hero/50 transition-all placeholder:text-black/30"
                                        />
                                        <div className="flex justify-between items-center mt-2 px-1">
                                            <div className="text-xs md:text-sm font-semibold text-brand-textTertiary">
                                                Minimum 50 characters
                                            </div>
                                            <div className={`text-xs md:text-sm font-bold ${formData.description.length >= 50 ? 'text-green-600' : 'text-brand-textTertiary'}`}>
                                                {formData.description.length} / 50
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs md:text-sm font-bold text-brand-textTertiary mb-3 md:mb-4 uppercase tracking-wider">
                                            Success Criteria
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.successCriteria}
                                            onChange={(e) => setFormData({ ...formData, successCriteria: e.target.value })}
                                            placeholder="e.g., Reach 10k users, 99.9% uptime, Process 1M transactions"
                                            className="w-full px-5 py-4 border-2 border-black/10 rounded-xl md:rounded-2xl focus:border-brand-black focus:ring-4 focus:ring-black/5 focus:outline-none text-base md:text-lg bg-brand-hero/50 transition-all placeholder:text-black/30"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center w-full px-4 gap-4">
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border-2 border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm md:text-lg font-bold"
                                    >
                                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(5)}
                                        disabled={formData.description.length < 50}
                                        className="flex items-center gap-2 px-8 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl bg-brand-black text-white hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-xl text-sm md:text-lg font-bold"
                                    >
                                        <span>Continue</span>
                                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Review & Submit */}
                        {currentStep === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full max-w-4xl flex flex-col"
                            >
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-2 md:mb-4 text-center tracking-tight px-4">
                                    Review & Send Proposal
                                </h3>
                                <p className="text-brand-textSecondary text-center mb-6 md:mb-10 text-sm md:text-lg opacity-80 px-4">
                                    Double-check before submitting
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 px-4">
                                    {/* Summary */}
                                    <div className="bg-white border-2 border-black/[0.03] rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] h-full">
                                        <div className="flex justify-between items-center mb-6 md:mb-8 pb-4 border-b-2 border-black/5">
                                            <h4 className="text-lg md:text-2xl font-bold text-brand-black">Summary</h4>
                                            <button
                                                onClick={() => setCurrentStep(1)}
                                                className="text-xs md:text-sm font-bold text-brand-textTertiary hover:text-brand-black uppercase tracking-wider bg-brand-hero px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Edit steps
                                            </button>
                                        </div>
                                        <div className="space-y-4 md:space-y-6">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-brand-textTertiary text-xs md:text-sm uppercase tracking-wider w-1/3">Type</span>
                                                <p className="text-brand-black font-semibold text-base md:text-lg capitalize text-right">{formData.projectType}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-brand-textTertiary text-xs md:text-sm uppercase tracking-wider w-1/3">Features</span>
                                                <p className="text-brand-black font-semibold text-base md:text-lg text-right bg-brand-hero px-3 py-1 rounded-lg">{formData.features.length} selected</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-brand-textTertiary text-xs md:text-sm uppercase tracking-wider w-1/3">Timeline</span>
                                                <p className="text-brand-black font-semibold text-base md:text-lg text-right">{formData.timeline} months</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-brand-textTertiary text-xs md:text-sm uppercase tracking-wider w-1/3">Scale</span>
                                                <p className="text-brand-black font-semibold text-base md:text-lg capitalize text-right">{formData.teamSize} team</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    <div className="bg-white border-2 border-black/[0.03] rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] h-full">
                                        <h4 className="text-lg md:text-2xl font-bold text-brand-black mb-6 md:mb-8 pb-4 border-b-2 border-black/5">Contact Info</h4>
                                        <div className="space-y-5 md:space-y-6">
                                            <div>
                                                <label className="block text-xs md:text-sm font-bold text-brand-textTertiary mb-2 uppercase tracking-wider">Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Full name"
                                                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl md:rounded-2xl focus:border-brand-black focus:ring-4 focus:ring-black/5 focus:outline-none text-base md:text-lg bg-brand-hero/50 transition-all font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-bold text-brand-textTertiary mb-2 uppercase tracking-wider">Email *</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="your@email.com"
                                                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl md:rounded-2xl focus:border-brand-black focus:ring-4 focus:ring-black/5 focus:outline-none text-base md:text-lg bg-brand-hero/50 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center w-full px-4 gap-4">
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl border-2 border-black/10 hover:bg-black/5 hover:border-black/20 transition-all text-sm md:text-lg font-bold"
                                    >
                                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                        <span>Back</span>
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.name || !formData.email || isSubmitting}
                                        className="flex items-center justify-center gap-3 px-8 py-3 md:px-12 md:py-4 rounded-xl md:rounded-2xl bg-brand-black text-white hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-xl text-sm md:text-lg font-bold"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Proposal</span>
                                                <Sparkles size={20} className="md:w-6 md:h-6" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-white/60"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white border-2 border-black/5 rounded-[32px] p-8 md:p-12 max-w-md w-full shadow-2xl text-center"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100/50 flex items-center justify-center mx-auto mb-6">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <Check size={40} className="text-white md:w-12 md:h-12" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
                                Proposal Sent!
                            </h3>
                            <p className="text-brand-textSecondary text-base md:text-lg leading-relaxed mb-6">
                                I'll review your proposal and get back within 24 hours.
                            </p>
                            <div className="inline-flex items-center gap-2 bg-brand-hero px-4 py-2 rounded-full">
                                <div className="w-4 h-4 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                                <span className="text-sm md:text-base font-bold text-brand-black">
                                    Redirecting to home...
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectLab;
