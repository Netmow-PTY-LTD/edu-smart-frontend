import { searchDomainPointing } from '@/slices/dashboard/adminDashboard/Actions/businessSettingsActions';
import { emptySearchDomainPointing } from '@/slices/dashboard/adminDashboard/reducer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import DomainPricing from './DomainPricing';
import Loader from './Loader';

const DomainPointFirstStep = ({ step, setStep }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [tld, setTld] = useState('.com');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [selectedTld, setSelectedTld] = useState('');

  useEffect(() => {
    dispatch(emptySearchDomainPointing());
  }, [dispatch]);

  const {
    data: searchDomainPointingData,
    isLoading: searchDomainPointingIsLoading,
    error: searchDomainPointingError,
  } = useSelector((state) => state.AdminDashboard.searchDomainPointing);

  useEffect(() => {
    const domainName = searchDomainPointingData?.domain
      ? searchDomainPointingData?.domain?.domain_name
      : '';
    const parts = domainName.split('.');
    setSelectedTld(parts[1]);
  }, [dispatch, searchDomainPointingData?.domain]);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
  };

  const handleTldChange = (e) => {
    setTld(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const domainPattern = /^[a-zA-Z0-9-]+$/;

    if (!domainPattern.test(domain)) {
      setErrorMessage(
        'Incorrect domain name. Only hyphens, letters, and numbers are allowed in domain name.'
      );
      setIsAvailable(null);
      return;
    }

    if (domain + tld) {
      dispatch(searchDomainPointing(domain + tld));
    }

    // Simulate domain availability check
    const isDomainAvailable = domain !== 'taken';

    if (!isDomainAvailable) {
      setErrorMessage('This domain is not available');
      setIsAvailable(false);
    } else {
      setErrorMessage('');
      setIsAvailable(true);
    }
  };

  const selectedPricing =
    searchDomainPointingData?.pricing?.pricing[selectedTld];



  return (
    <>
      <ToastContainer />
      <div className="step step-3">
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
        <div className="mt-5">
          <h3>Register a new domain</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-lg-8 col-md-6 col-sm-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="domain_input"
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder="your domain name"
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4">
                <div className="form-group">
                  <select
                    className="form-select"
                    name="tld"
                    id="tld"
                    value={tld}
                    onChange={handleTldChange}
                  >
                    <option value=".com">.com</option>
                    <option value=".net">.net</option>
                    <option value=".org">.org</option>
                    <option value=".biz">.biz</option>
                    <option value=".info">.info</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4">
                <div className="form-group">
                  {searchDomainPointingIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={searchDomainPointingIsLoading}
                      className="btn btn-secondary btn-block btn-search w-100"
                      type="submit"
                      id="btn-search"
                    >
                      Search
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="domain-info">
              <div className="row">
                <div className="col-12">
                  {errorMessage && (
                    <p className="text-danger font-bold mt-5">{errorMessage}</p>
                  )}
                  {/* <div className="d-flex justify-content-center">
                                  <div className="progress email-sending-msg">
                                    <div
                                      className="progress-bar progress-bar-striped progress-bar-animated"
                                      role="progressbar"
                                    >
                                      <span>Proccessing ...</span>
                                    </div>
                                  </div>
                                </div> */}
                </div>
              </div>
            </div>
          </form>
          {searchDomainPointingData?.domain?.domain_name && (
            <div className="row dm-available mt-5">
              <div className="col-sm-6 d-flex align-items-center">
                <div className="domain-name">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.5rem"
                    height="1.8rem"
                    viewBox="0 0 25 18"
                    fill="none"
                  >
                    <path
                      d="M23.5744 4.49134L10.7626 16.8154C9.81391 17.7282 8.27493 17.7282 7.32531 16.8154L0.711812 10.4527C-0.237271 9.53987 -0.237271 8.05919 0.711812 7.14618C1.66107 6.23298 3.19993 6.23298 4.14878 7.14583L9.04448 11.8556L20.1368 1.18463C21.0861 0.271443 22.6251 0.272134 23.574 1.18463C24.5229 2.09765 24.5229 3.57781 23.5744 4.49134Z"
                      fill="var(--color--primary)"
                    />
                  </svg> */}
                  <span className="domain_name" id="domain_name_purchase">
                    {searchDomainPointingData?.domain?.domain_name}
                  </span>
                </div>
                <span
                  className={`badge ms-2 ${searchDomainPointingData?.domain?.status === 'available' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}  `}
                >
                  {searchDomainPointingData?.domain?.status}
                </span>
              </div>
              <div className="col-sm-6">
                <div className="domain-price">
                  <div className="domain-price-inner">
                    <span className="discounted_price">
                      <span className="font-bold">
                        {tld === '.com'
                          ? searchDomainPointingData?.pricing?.pricing?.com
                              ?.register['1']
                          : tld === '.net'
                            ? searchDomainPointingData?.pricing?.pricing?.net
                                ?.register['1']
                            : tld === '.org'
                              ? searchDomainPointingData?.pricing?.pricing?.org
                                  ?.register['1']
                              : tld === '.biz'
                                ? searchDomainPointingData?.pricing?.pricing
                                    ?.biz?.register['1']
                                : tld === '.info'
                                  ? searchDomainPointingData?.pricing?.pricing
                                      ?.info?.register['1']
                                  : ''}
                      </span>
                      <span>/yr</span>
                    </span>
                    {/* <span className="retail_price">
                          Retail:
                          <del>
                            <span className="retail_price_total">
                              {
                                searchDomainPointingData?.pricing?.pricing
                                  ?.register
                              }
                            </span>{' '}
                            <span className="retail_price_curency"></span>
                            /yr
                          </del>
                        </span> */}
                  </div>
                  {searchDomainPointingData?.domain?.status === 'available' ? (
                    <Link
                      href={`/admin/settings/payment-for-domain-pointing/${searchDomainPointingData?.domain?.domain_name}${'&'}${selectedPricing && selectedPricing?.register['1']}`}
                      // onClick={() => {
                      //   router.push({
                      //     pathname: '/admin/settings/payment-for-domain-pointing',
                      //     query: {
                      //       name: searchDomainPointingData?.domain?.domain_name,
                      //       price:
                      //         selectedPricing && selectedPricing?.register['1'],
                      //       tld: selectedTld,
                      //     },
                      //   });
                      // }}
                      className="btn-purchase"
                      id="btn-purchase"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="21"
                        viewBox="0 0 18 21"
                        fill="none"
                      >
                        <path
                          d="M17.7589 20.1229L16.4525 5.89195C16.4168 5.50331 16.0838 5.20563 15.685 5.20563H12.9909V4.01711C12.9909 1.80208 11.1487 0 8.88431 0C6.62003 0 4.77803 1.80208 4.77803 4.01711V5.20563H2.08211C1.68326 5.20563 1.35027 5.50331 1.31461 5.89195L0.00308119 20.1789C-0.0162348 20.3898 0.0558918 20.5987 0.201892 20.7549C0.347891 20.9111 0.554305 21 0.770582 21H16.9966C16.9972 21 16.998 21 16.9987 21C17.4243 21 17.7692 20.6625 17.7692 20.2462C17.7691 20.2043 17.7656 20.163 17.7589 20.1229ZM6.31919 4.01711C6.31919 2.63332 7.46993 1.50751 8.88441 1.50751C10.299 1.50751 11.4498 2.63332 11.4498 4.01711V5.20563H6.31919V4.01711ZM1.6135 19.4926L2.78663 6.71314H4.77803V8.06105C4.77803 8.47733 5.12294 8.81481 5.54861 8.81481C5.97428 8.81481 6.31919 8.47733 6.31919 8.06105V6.71314H11.4498V8.06105C11.4498 8.47733 11.7947 8.81481 12.2204 8.81481C12.6461 8.81481 12.991 8.47733 12.991 8.06105V6.71314H14.9805L16.1537 19.4926H1.6135Z"
                          fill="white"
                        />
                      </svg>
                      <span>Purchase Now</span>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DomainPricing data={searchDomainPointingData} />
    </>
  );
};

export default DomainPointFirstStep;
