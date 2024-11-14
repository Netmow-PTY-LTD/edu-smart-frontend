import {
  checkDns,
  createDomainPointing,
  getDomainPointing,
} from '@/slices/dashboard/adminDashboard/Actions/businessSettingsActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';

const DomainPointingSecondStep = ({ step, setStep, getDomainPointingData }) => {
  const dispatch = useDispatch();
  const [dnsDomain, setDnsDomain] = useState('');
  const [dnsErrorMessage, setDnsErrorMessage] = useState('');
  const [dnsVerificationMessage, setDnsVerificationMessage] = useState('');
  const [dnsPointed, setDnsPointed] = useState(false);

  const {
    data: createDomainPointingData,
    isLoading: createDomainPointingIsLoading,
    error: createDomainPointingError,
  } = useSelector((state) => state.AdminDashboard.createDomainPointing);

  const {
    data: checkDnsData,
    isLoading: checkDnsIsLoading,
    error: checkDnsError,
  } = useSelector((state) => state.AdminDashboard.checkDns);

  useEffect(() => {
    if (
      createDomainPointingData?.domain_name &&
      createDomainPointingError === null
    ) {
      toast.success('Domain Pointing Successful');
      dispatch(getDomainPointing());
      setDnsDomain('');
      setDnsErrorMessage('');
      setDnsPointed(true);
    }
    if (createDomainPointingError) {
      toast.error(createDomainPointingError);
    }
  }, [
    createDomainPointingData?.domain_name,
    createDomainPointingError,
    dispatch,
  ]);

  useEffect(() => {
    if (checkDnsData?.Status === 0) {
      toast.success('Your DNS setup is successful.');
      setDnsVerificationMessage('Your DNS setup is successful.');
      setDnsDomain('');
      setDnsErrorMessage('');
    }
    if (checkDnsData?.Status != 0) {
      // toast.error('Your verification has been failed.');
      setDnsVerificationMessage('Your verification has been failed.');
    }
  }, [checkDnsData?.Status, checkDnsError, dispatch]);

  const handleDnsCheck = (event) => {
    event?.preventDefault();

    const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    if (!domainPattern.test(dnsDomain)) {
      setDnsErrorMessage('Invalid domain name.');
      setDnsPointed(false);
      return;
    } else {
      const data = {
        domain: dnsDomain,
        nameservers: [
          'ns1.digitalocean.com',
          'ns2.digitalocean.com',
          'ns3.digitalocean.com',
        ],
      };
      dispatch(createDomainPointing(data));
    }
  };

  const handleDnsDomainChange = (event) => {
    setDnsDomain(event?.target.value);

    if (dnsDomain) {
      setDnsErrorMessage('');
    }
  };

  const handleDnsVerify = (event) => {
    event.preventDefault();

    if (getDomainPointingData?.domain_name) {
      dispatch(checkDns(getDomainPointingData?.domain_name)).then((res) => {
        if (checkDnsData?.Status != 0) {
          toast.error('Your verification has been failed.');
        }
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="step step-2">
        {getDomainPointingData?.domain_name ||
        createDomainPointingData?.domain_name ? (
          ''
        ) : (
          <button onClick={() => setStep(0)} className="btn-back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6rem"
              height="1.6rem"
              viewBox="0 0 16 16"
            >
              <path fill="white" d="M15 7v2H4v2L1 8l3-3v2z"></path>
            </svg>
            <span>Back</span>
          </button>
        )}
        <div className="dns-status mt-5" id="step-3">
          <div className="row">
            {getDomainPointingData?.domain_name ||
            createDomainPointingData?.domain_name ? (
              ''
            ) : (
              <div className="col-12">
                <h3>Enter Your Domain</h3>
                <form method="post" id="domain_form" onSubmit={handleDnsCheck}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="domain_validation"
                          name="domain_validation"
                          placeholder="yoursite.com"
                          value={dnsDomain}
                          onChange={(e) => handleDnsDomainChange(e)}
                          onInput={(e) => handleDnsDomainChange(e)}
                          onFocus={(e) => handleDnsDomainChange(e)}
                        />
                        <div className="input-group-append">
                          {createDomainPointingIsLoading ? (
                            <Loader />
                          ) : (
                            <button
                              style={{
                                cursor: 'pointer',
                              }}
                              disabled={createDomainPointingIsLoading}
                              className="btn btn-secondary btn-search"
                              type="submit"
                              id="btn-check"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                      {dnsErrorMessage && (
                        <p className="text-danger font-bold mt-3">
                          {dnsErrorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
            {getDomainPointingData?.domain_name ? (
              <div className="search-content">
                <p className="vf_to_hide">
                  Currently your domain{' '}
                  <span className="bold-text domain_name">
                    {getDomainPointingData?.domain_name}
                  </span>{' '}
                  is pointed to other ip <span className="bold-text"></span>{' '}
                  address. Please follow the instruction below to update domain
                  pointing:
                </p>
                <div className="instruction-steps">
                  <ul>
                    <li className="vf_to_hide">
                      Open a browser and go to your domain provider site.
                    </li>
                    <li className="vf_to_hide">Login with your account</li>
                    <li className="vf_to_hide">
                      Find your domain settings page
                    </li>
                    <li className="vf_to_hide">Find your DNS records</li>
                    <li>
                      <span className="vf_to_hide">
                        Update your A records by this:{' '}
                      </span>

                      <div className="dns-table">
                        <div className="tr th">
                          <div className="th-cell">Type</div>
                          <div className="th-cell">Hostname</div>
                          <div className="th-cell pointed">Re-direct to</div>
                          <div className="th-cell">TTL(Second)</div>
                        </div>
                        {getDomainPointingData?.ns_record?.length > 0 &&
                          getDomainPointingData?.ns_record?.map(
                            (nsrecord, index) => (
                              <div key={index} className="tr">
                                <div className="tr-cell">ns</div>
                                <div className="tr-cell">
                                  {/* www. */}
                                  <span className="domain_name">
                                    {getDomainPointingData?.domain_name}
                                  </span>
                                </div>
                                <div className="tr-cell">
                                  <span className="wwwpointedip">
                                    {nsrecord?.ns}
                                  </span>
                                </div>
                                <div className="tr-cell">
                                  <span>3600</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="yes_vf"
                                    width="2rem"
                                    height="1.4rem"
                                    viewBox="0 0 20 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M19.4142 3.28699L8.86334 13.4362C8.08204 14.1879 6.81465 14.1879 6.03261 13.4362L0.586198 8.19635C-0.195399 7.4446 -0.195399 6.22522 0.586198 5.47332C1.36794 4.72128 2.63524 4.72128 3.41664 5.47304L7.4484 9.35164L16.5833 0.563816C17.365 -0.188224 18.6324 -0.187654 19.4139 0.563816C20.1953 1.31571 20.1953 2.53466 19.4142 3.28699Z"
                                      fill="#2FE583"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </li>
                    <li>
                      <span className="not_vf">
                        Come back here & verify your A records
                      </span>
                      <div className="dns-verify mt-4">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="verify_domain"
                            placeholder="yoursite.com"
                            readOnly
                            value={
                              dnsDomain || getDomainPointingData?.domain_name
                            }
                          />
                          <div className="input-group-append">
                            {checkDnsIsLoading ? (
                              <Loader />
                            ) : (
                              <button
                                disabled={checkDnsIsLoading}
                                className="btn btn-primary btn-verify"
                                id="btn-verify"
                                type="submit"
                                onClick={handleDnsVerify}
                              >
                                Verify DNS
                              </button>
                            )}
                          </div>
                        </div>
                        {checkDnsData?.Status === 0 ? (
                          <div className="yes_vf verify-success-msg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="2.2rem"
                              height="1.5rem"
                              viewBox="0 0 22 15"
                              fill="none"
                            >
                              <path
                                d="M20.8009 3.52177L9.49644 14.3959C8.65933 15.2014 7.30141 15.2014 6.46351 14.3959L0.628069 8.78181C-0.209357 7.97635 -0.209357 6.66988 0.628069 5.86427C1.46565 5.05852 2.82347 5.05852 3.66069 5.86397L7.98042 10.0196L17.7678 0.604089C18.6054 -0.201668 19.9633 -0.201058 20.8006 0.604089C21.6378 1.40969 21.6378 2.71571 20.8009 3.52177Z"
                                fill="#2FE583"
                              />
                            </svg>
                            <span>{dnsVerificationMessage}</span>
                          </div>
                        ) : (
                          <div className="not_vf text-danger mt-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ec536c"
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10ZM12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{dnsVerificationMessage}</span>
                          </div>
                        )}

                        {!dnsVerificationMessage && (
                          <div className="not_vf text-danger mt-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#ec536c"
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10ZM12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75ZM12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              Your verification has not been confirmed yet.
                            </span>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainPointingSecondStep;
