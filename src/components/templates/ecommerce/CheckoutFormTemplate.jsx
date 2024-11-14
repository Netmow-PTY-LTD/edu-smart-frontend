import React from 'react';
import { useEffect } from 'react';

const CheckoutFormTemplate = ({
  formData,
  handleChange,
  userInfoData,
  countries,
  setFormData,
}) => {
  useEffect(() => {
    if (userInfoData) {
      setFormData((prevData) => ({
        ...prevData,
        first_name: userInfoData?.first_name,
        last_name: userInfoData?.last_name,
        address_line_1: userInfoData?.address_line_1,
        address_line_2: userInfoData?.address_line_2,
        city: userInfoData?.city,
        state: userInfoData?.state,
        zip: userInfoData?.zip,
        country: userInfoData?.country,
        email: userInfoData?.email,
        phone: userInfoData?.phone,
      }));
    }
  }, [userInfoData, setFormData]);
  return (
    <>
      <div className="checkout-form">
        <div className="checkout-billing-address">
          <div className="form-heading">
            <h2>Billing Address</h2>
          </div>
          <div className="name-group">
            <div className="sd-row">
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="fname"
                    placeholder="First Name"
                    className="sd-form-control"
                    value={formData?.first_name || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    className="sd-form-control"
                    value={formData?.last_name || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="address-group">
            <div className="sd-row">
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="address_line_1">Address Line 1</label>
                  <input
                    type="text"
                    name="address_line_1"
                    id="address_line_1"
                    placeholder="123 Street"
                    className="sd-form-control"
                    value={formData?.address_line_1 || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="address_line_2">Address Line 2</label>
                  <input
                    type="text"
                    name="address_line_2"
                    id="address_line_2"
                    placeholder="123 Street"
                    className="sd-form-control"
                    value={formData?.address_line_2 || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-25">
                <div className="sd-form-group">
                  <label htmlFor="">Country</label>
                  <select
                    className="sd-form-select"
                    name="country"
                    value={formData?.country || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries?.map((country, i) => (
                      <option key={i} value={country?.value}>
                        {country?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-25">
                <div className="sd-form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="New York"
                    className="sd-form-control"
                    value={formData?.city || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-25">
                <div className="sd-form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="New York"
                    className="sd-form-control"
                    value={formData?.state || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-25">
                <div className="sd-form-group">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    placeholder="123"
                    className="sd-form-control"
                    value={formData?.zip || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="email-number-group">
            <div className="sd-row">
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="sd-form-control"
                    value={formData?.email || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-50">
                <div className="sd-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Mobile Number"
                    className="sd-form-control"
                    value={formData?.phone || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- <div className="checkbox-wrapper">
                  <input type="checkbox" name="input-checkbox" id="input-checkbox" checked="">
                  <label htmlFor="input-checkbox">Save this information for next time</label>
                </div> --> */}
        </div>
      </div>
    </>
  );
};

export default CheckoutFormTemplate;
