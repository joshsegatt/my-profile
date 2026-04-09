import { jsPDF } from 'jspdf';

export const generateProjectBrief = (data: Record<string, any>, title: string = 'Project Brief') => {
    const doc = new jsPDF();
    const margin = 20;
    let y = 25;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(title.toUpperCase(), margin, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, margin, y);
    y += 15;

    // Separator line
    doc.setDrawColor(255, 193, 7); // Brand Yellow #FFC107
    doc.setLineWidth(1.5);
    doc.line(margin, y, 190, y);
    y += 20;

    // Content
    doc.setTextColor(30);
    Object.entries(data).forEach(([key, value]) => {
        if (!value) return;

        // Label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        const label = key.replace(/_/g, ' ').toUpperCase();
        doc.text(label, margin, y);
        y += 8;

        // Value
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(80);
        
        // Multi-line support for long values
        const splitValue = doc.splitTextToSize(String(value), 170);
        doc.text(splitValue, margin, y);
        y += (splitValue.length * 7) + 10;

        // Page break if needed
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(180);
    doc.text('© 2026 Josh Segatt | AI-Powered Senior Developer', margin, 285);

    return doc.output('blob');
};
