import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = () => {
  const element = document.getElementById('layout-wrapper');

  html2canvas(element, {
    onclone: (document) => {
      document.getElementById('layout-wrapper').style.margin = '0px';
      document.getElementById('layout-wrapper').style.padding = '0px';
      document.getElementById('payNOwDiv').style.visibility = 'hidden';
      document.getElementById('dashboardFooter').style.visibility = 'hidden';
      document.getElementById('page-topbar').style.visibility = 'hidden';
      document.getElementById('dashboardSidebar').style.visibility = 'hidden';
    },
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [canvas.width, canvas.height],
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  });
};
