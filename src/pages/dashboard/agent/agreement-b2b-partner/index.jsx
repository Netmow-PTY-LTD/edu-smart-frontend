import Layout from '@/components/layout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Button} from 'reactstrap';

const AgreementB2bPartner = () => {
  const pdfUrl = 'https://edu-smart.sgp1.cdn.digitaloceanspaces.com/B2B%20Agreement-Final%20without%20University%20(PSR%20GLOBAL)-2406-2025.pdf';

  const handleDownload = async () => {
  const response = await fetch(pdfUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'B2B_Agreement.pdf');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};


  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">B2B Partner Agreement</h2>
              <Button className="button px-3 py-2" onClick={handleDownload}>
                Download PDF
              </Button>
            </div>

            <div style={{ height: '80vh' }}>
              <iframe
                src={pdfUrl}
                title="B2B Agreement PDF"
                width="100%"
                height="100%"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgreementB2bPartner;
