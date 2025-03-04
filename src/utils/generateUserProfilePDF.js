// import { jsPDF } from 'jspdf';
// import { PDFDocument } from 'pdf-lib';

// export const generateUserProfilePDF = async (userData) => {
//   if (!userData) {
//     console.error('No user data available');
//     return;
//   }

//   try {
//     const { name, email, phone, address, profilePicture, documents } = userData;

//     const pdfDoc = await PDFDocument.create();
//     const jsPdfInstance = new jsPDF();

//     // Add title
//     jsPdfInstance.setFontSize(18);
//     jsPdfInstance.text('User Profile Information', 20, 20);

//     // Insert Profile Picture
//     if (profilePicture) {
//       const imgData = await fetch(profilePicture).then((res) => res.blob());
//       const reader = new FileReader();
//       reader.readAsDataURL(imgData);
//       // eslint-disable-next-line no-undef
//       await new Promise((resolve) => {
//         reader.onload = () => {
//           jsPdfInstance.addImage(reader.result, 'JPEG', 150, 20, 40, 40);
//           resolve();
//         };
//       });
//     }

//     // Insert User Details
//     jsPdfInstance.setFontSize(12);
//     jsPdfInstance.text(`Name: ${name}`, 20, 50);
//     jsPdfInstance.text(`Email: ${email}`, 20, 60);
//     jsPdfInstance.text(`Phone: ${phone}`, 20, 70);
//     jsPdfInstance.text(`Address: ${address}`, 20, 80);

//     // Convert jsPDF to pdf-lib format
//     const jsPdfBytes = jsPdfInstance.output('arraybuffer');
//     const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
//     const jsPdfPages = await pdfDoc.copyPages(
//       jsPdfDoc,
//       jsPdfDoc.getPageIndices()
//     );
//     jsPdfPages.forEach((page) => pdfDoc.addPage(page));

//     // Add Documents (Images/PDFs)
//     for (const fileUrl of documents) {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const fileType = fileUrl?.split('.').pop().toLowerCase();

//       if (['png', 'jpg', 'jpeg'].includes(fileType)) {
//         // Convert Image to Base64
//         // eslint-disable-next-line no-undef
//         const imgData = await new Promise((resolve) => {
//           const reader = new FileReader();
//           reader.onload = () => resolve(reader.result);
//           reader.readAsDataURL(blob);
//         });

//         // Add image page
//         const imgPdf = new jsPDF();
//         imgPdf.addImage(imgData, 'JPEG', 10, 10, 180, 160);
//         const imgPdfBytes = imgPdf.output('arraybuffer');
//         const imageDoc = await PDFDocument.load(imgPdfBytes);
//         const imagePages = await pdfDoc.copyPages(
//           imageDoc,
//           imageDoc.getPageIndices()
//         );
//         imagePages.forEach((page) => pdfDoc.addPage(page));
//       } else if (fileType === 'pdf') {
//         // Merge existing PDFs
//         const pdfBytes = await blob.arrayBuffer();
//         const existingPdf = await PDFDocument.load(pdfBytes);
//         const copiedPages = await pdfDoc.copyPages(
//           existingPdf,
//           existingPdf.getPageIndices()
//         );
//         copiedPages.forEach((page) => pdfDoc.addPage(page));
//       }
//     }

//     // Save and Download Final PDF
//     const finalPdfBytes = await pdfDoc.save();
//     const pdfBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = `${name}_Profile.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(pdfUrl);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//   }
// };

import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';

export const generateUserProfilePDF = async (userData) => {
  if (!userData) {
    console.error('No user data available');
    return;
  }

  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      role,
      status,
      address_line_1,
      address_line_2,
      city,
      state,
      country,
      zip,
      agent_package_parcentage,
      applications,
      students,
      universities,
      documents,
      course,
    } = userData;

    const pdfDoc = await PDFDocument.create();
    const jsPdfInstance = new jsPDF();

    // **Title**
    jsPdfInstance.setFontSize(18);
    jsPdfInstance.text('User Profile Information', 20, 20);

    // **Basic Details**
    jsPdfInstance.setFontSize(12);
    jsPdfInstance.text(`Name: ${first_name} ${last_name}`, 20, 40);
    jsPdfInstance.text(`Email: ${email}`, 20, 50);
    jsPdfInstance.text(`Phone: ${phone}`, 20, 60);
    jsPdfInstance.text(`Role: ${role}`, 20, 70);
    jsPdfInstance.text(`Status: ${status}`, 20, 80);

    // **Address**
    jsPdfInstance.text(`Address: ${address_line_1}, ${address_line_2}`, 20, 90);
    jsPdfInstance.text(`City: ${city}, State: ${state}`, 20, 100);
    jsPdfInstance.text(`Country: ${country} - ${zip}`, 20, 110);

    // **Agent Details**
    jsPdfInstance.text(
      `Agent Package Percentage: ${agent_package_parcentage}%`,
      20,
      120
    );

    // **Course Details (if available)**
    if (course) {
      jsPdfInstance.text(`Course: ${course?.name}`, 20, 130);
      jsPdfInstance.text(`Tuition Fee: ${course?.tuition_fee}`, 20, 140);
      jsPdfInstance.text(`Scholarship: ${course?.scholarship_amount}`, 20, 150);
      jsPdfInstance.text(
        `Free Accommodation: ${course?.free_accommodation ? 'Yes' : 'No'}`,
        20,
        160
      );
    }

    // **Application & Student Counts**
    jsPdfInstance.text(`Applications: ${applications?.length}`, 20, 170);
    jsPdfInstance.text(`Students: ${students?.length}`, 20, 180);
    jsPdfInstance.text(`Universities: ${universities?.length}`, 20, 190);

    // Convert jsPDF to pdf-lib format
    const jsPdfBytes = jsPdfInstance.output('arraybuffer');
    const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
    const jsPdfPages = await pdfDoc.copyPages(
      jsPdfDoc,
      jsPdfDoc.getPageIndices()
    );
    jsPdfPages.forEach((page) => pdfDoc.addPage(page));

    // **Add Documents (Images/PDFs)**
    for (const doc of documents || []) {
      const response = await fetch(doc.url);
      const blob = await response.blob();
      const fileType = doc?.url?.split('.').pop().toLowerCase();

      if (['png', 'jpg', 'jpeg'].includes(fileType)) {
        // Convert Image to Base64
        // eslint-disable-next-line no-undef
        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        // Add image page
        const imgPdf = new jsPDF();
        imgPdf.addImage(imgData, 'JPEG', 10, 10, 180, 160);
        const imgPdfBytes = imgPdf.output('arraybuffer');
        const imageDoc = await PDFDocument.load(imgPdfBytes);
        const imagePages = await pdfDoc.copyPages(
          imageDoc,
          imageDoc.getPageIndices()
        );
        imagePages.forEach((page) => pdfDoc.addPage(page));
      } else if (fileType === 'pdf') {
        // Merge existing PDFs
        const pdfBytes = await blob.arrayBuffer();
        const existingPdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(
          existingPdf,
          existingPdf.getPageIndices()
        );
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      }
    }

    // **Save & Download PDF**
    const finalPdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${first_name}_${last_name}_Profile.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
