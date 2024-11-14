import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import { MyDocument } from './MyDocument';

export const DownloadPDFButton = () => {
  return (
    <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
      {({ blob, url, Loading, error }) =>
        Loading ? 'Loading ... ' : 'Download'
      }
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
