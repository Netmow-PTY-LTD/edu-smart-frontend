import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'react-toastify';

export const downloadFilesAsPDF = async (
  fileUrls,
  toastMessage = 'Downloading files as a single PDF...'
) => {
  if (!fileUrls || fileUrls.length === 0) {
    toast.error('No valid files found to download');
    return;
  }

  toast.success(toastMessage);

  try {
    const pdfDoc = await PDFDocument.create();
    const jsPdfInstance = new jsPDF();
    let firstPage = true; // Track first page for proper formatting

    for (const fileUrl of fileUrls) {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Extract file extension from URL
      const fileExtension = fileUrl.split('.').pop().toLowerCase();

      if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
        // Convert image to Base64
        // eslint-disable-next-line no-undef
        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        // If it's not the first page, add a new page
        if (!firstPage) {
          jsPdfInstance.addPage();
        }
        firstPage = false;

        // Add image to PDF
        jsPdfInstance.addImage(imgData, 'JPEG', 10, 10, 180, 160);
      } else if (fileExtension === 'pdf') {
        // Merge existing PDF files
        const pdfBytes = await blob.arrayBuffer();
        const existingPdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(
          existingPdf,
          existingPdf.getPageIndices()
        );
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      }
    }

    // Convert jsPDF (which contains images) to pdf-lib format and merge it
    const jsPdfBytes = jsPdfInstance.output('arraybuffer');
    const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
    const jsPdfPages = await pdfDoc.copyPages(
      jsPdfDoc,
      jsPdfDoc.getPageIndices()
    );
    jsPdfPages.forEach((page) => pdfDoc.addPage(page));

    // Save and download final merged PDF
    const finalPdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'all_documents.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    toast.error('Failed to download files as PDF');
    console.error('Error merging PDFs:', error);
  }
};
