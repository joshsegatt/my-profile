import { generateProjectBrief } from './pdfGenerator';

interface SubmissionData {
    name: string;
    email: string;
    subject?: string;
    message?: string;
    details?: Record<string, any>;
}

export const submitInquiry = async (data: SubmissionData) => {
    try {
        const formData = new FormData();
        
        // Add basic fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('_subject', data.subject || `New Inquiry from ${data.name}`);
        
        if (data.message) {
            formData.append('message', data.message);
        }

        // Add additional details as a string to the email body
        if (data.details) {
            const detailsSummary = Object.entries(data.details)
                .map(([k, v]) => `${k.toUpperCase().replace(/_/g, ' ')}: ${v}`)
                .join('\n');
            formData.append('details', detailsSummary);
            
            // Generate and attach PDF
            const pdfBlob = generateProjectBrief(data.details, data.subject || 'Project Brief');
            const file = new File([pdfBlob], `project_brief_${data.name.toLowerCase().replace(/\s/g, '_')}.pdf`, {
                type: 'application/pdf'
            });
            formData.append('attachment', file);
        }

        // Send to FormSubmit.co
        const response = await fetch('https://formsubmit.co/ajax/joshsegat@gmail.com', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Submission failed:', error);
        return false;
    }
};
