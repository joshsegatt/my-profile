export interface IntakeData {
    name: string;
    email: string;
    url?: string;
    bottleneck: string;
    description?: string;
}

export const submitIntake = async (data: IntakeData): Promise<boolean> => {
    try {
        const endpoint = 'https://formsubmit.co/ajax/josuesegatofilho@gmail.com'; 
        
        const payload = {
            ...data,
            _captcha: "false",
            _template: "box",
            _subject: "URGENTE - NOVO LEAD TECH SPRINT"
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        return result.success === 'true' || result.success === true;
    } catch (error) {
        console.error('Intake submission failed:', error);
        return false;
    }
};
