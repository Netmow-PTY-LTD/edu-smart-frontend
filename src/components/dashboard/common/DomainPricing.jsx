import React from 'react';

const DomainPricing = ({ data }) => {
  console.log(data);
  return (
    <div className="domain-pricing my-5">
      {data?.domain?.status === 'unavailable' ? (
        <div className="text-center fs-1 text-danger fw-semibold">
          {'"' +
            data?.domain?.domain_name +
            '" domain is ' +
            data?.domain?.status}
        </div>
      ) : data?.pricing?.pricing ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="sd-card">
              <div className="sd-card-body">
                <h3>Domain Pricing</h3>
                <div className="dns-table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>TLD</th>
                        <th>Price</th>
                        <th>Transfer</th>
                        <th>Renew</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.pricing?.pricing &&
                        Object?.keys(data?.pricing?.pricing).map((tld) => {
                          const { register, transfer, renew } =
                            data.pricing.pricing[tld];
                          return (
                            <tr key={tld}>
                              <td>{tld}</td>
                              <td>${register['1']} USD / 1 year</td>
                              <td>${transfer['1']} USD / 1 year</td>
                              <td>${renew['1']} USD / 1 year</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DomainPricing;
