import jsPDF from 'jspdf';

export const exportTXT = (text: string, filename: string = 'document.txt') => {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const exportPDF = (text: string, filename: string = 'document.pdf') => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 7;
    const fontSize = 11;

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica');

    // Split text into lines that fit the page width
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    let yPosition = margin;

    lines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};
