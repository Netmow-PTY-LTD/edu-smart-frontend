import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import DomainGuide from './DomainGuide';
import DomainPointFirstStep from './DomainPointFirstStep';
import DomainPointingSecondStep from './DomainPointingSecondStep';

const DomainPointing = ({ tab, getDomainPointingData }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (getDomainPointingData?.domain_name) {
      setStep(2);
    }
  }, [getDomainPointingData?.domain_name]);

  useEffect(() => {
    if (tab === '3') {
      setStep(2);
    }
  }, [tab]);

  return (
    <Col lg={9}>
      <div className="sd-card">
        <div className="sd-card-body">
          {step === 0 && (
            <div className="step step-1">
              <div className="fs-1 fw-semibold text-primary mb-4">
                Your Current SubDomain Is :{' '}
                <span className="qoute_color">{window.location.host}</span>
              </div>
              <h3>Do you want to setup a custom domain?</h3>
              <small className="text-muted mb-3 d-block">
                "If no custom domain is configured, your website will load on
                the current domain."
              </small>
              <div className="btns">
                <button
                  type="button"
                  className="sd-btn-secondary"
                  onClick={() => setStep(step + 1)}
                >
                  Purchase A New One
                </button>
                <button
                  type="button"
                  className="sd-btn-primary"
                  onClick={() => setStep(step + 2)}
                >
                  Configure Your Own Domain
                </button>
              </div>
            </div>
          )}
          {step === 1 && <DomainPointFirstStep step={step} setStep={setStep} />}
          {step === 2 && (
            <DomainPointingSecondStep
              step={step}
              setStep={setStep}
              getDomainPointingData={getDomainPointingData}
            />
          )}
        </div>
      </div>
      {/* {step === 1 && <DomainPricing />} */}
      {step === 2 && <DomainGuide />}
    </Col>
  );
};

export default DomainPointing;
