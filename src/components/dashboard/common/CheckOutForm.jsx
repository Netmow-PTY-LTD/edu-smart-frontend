import { createTransactionByAdminForSuperadmin } from '@/slices/dashboard/adminDashboard/Actions/paymentActions';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import StripeForm from './StripeForm';

const CheckOutForm = ({
  activeTab,
  toggleTab,
  loading,
  setErrorMessage,
  setLoading,
  errorMessage,
  event_id,
  player_id,
  guardian_id,
  chargesIds,
  invoiceId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const stripePayHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage('Stripe is not initialized.');
      return;
    }
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error?.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const firstCard =
          paymentIntent?.payment_method_types &&
          paymentIntent.payment_method_types[0];

        let transactionData = {
          charge_ids: chargesIds,
          invoice_id: invoiceId,
          payment_method: firstCard,
        };

        try {
          await dispatch(
            createTransactionByAdminForSuperadmin(transactionData)
          );
          toggleTab(activeTab + 1);
          setTimeout(() => {
            router.push(`/admin/charges`);
          }, 1500);
        } catch (dispatchError) {
          setErrorMessage(dispatchError?.message);
        }
      } else {
        setErrorMessage('Unexpected State');
      }
    } catch (error) {
      setErrorMessage(error?.message);
    }

    setLoading(false);
  };
  return (
    <Col xl="8">
      <Card>
        <CardBody>
          <>
            <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
              <Nav
                pills
                className="nav nav-pills nav-justified custom-nav"
                role="tablist"
              >
                <NavItem role="presentation">
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames(
                      {
                        active: activeTab === 1,
                        done: activeTab <= 2 && activeTab > 0,
                      },
                      'p-3 fs-15'
                    )}
                    // onClick={() => {
                    //   toggleTab(1);
                    // }}
                  >
                    <i className="ri-bank-card-line fs-16 rounded-circle align-middle me-2">
                      {' '}
                    </i>
                    Payment Info
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    style={{ cursor: 'pointer' }}
                    className={classnames(
                      {
                        active: activeTab === 2,
                        done: activeTab <= 3 && activeTab > 1,
                      },
                      'p-3 fs-15'
                    )}
                    // onClick={() => {
                    //   toggleTab(2);
                    // }}
                  >
                    <i className="ri-checkbox-circle-line fs-16  rounded-circle align-middle me-2"></i>
                    Finish
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <TabContent activeTab={activeTab}>
              {/* Payment info Form */}
              <TabPane tabId={1} className="p-3">
                <div>
                  <h5 className="mb-2 fs-3">Payment Selection</h5>
                  <p className="text-muted fs-3 mb-4">
                    Please select and enter your billing information
                  </p>
                </div>

                <Row className="g-5 mt-2">
                  <Col lg={6} sm={6}>
                    <div>
                      <div className="form-check card-radio ">
                        <Input
                          id="paymentMethod02"
                          name="paymentMethod"
                          type="radio"
                          className="form-check-input"
                          defaultChecked
                        />
                        <Label
                          className="form-check-label p-4"
                          htmlFor="paymentMethod02"
                        >
                          <span className="fs-16 text-muted me-2">
                            <i className="ri-bank-card-fill align-bottom "></i>
                          </span>
                          <span className="fs-14 text-wrap">
                            Stripe Payment
                          </span>
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>

                <StripeForm
                  stripePayHandler={stripePayHandler}
                  stripe={stripe}
                  loading={loading}
                  errorMessage={errorMessage}
                />
              </TabPane>

              {/* Payment Finished Message   */}
              <TabPane tabId={2} id="pills-finish">
                <div className="text-center py-5 ">
                  <div className="mb-4">
                    <Script src="https://cdn.lordicon.com/bhenfmcm.js"></Script>
                    <lord-icon
                      src="https://cdn.lordicon.com/lupuorrc.json"
                      trigger="loop"
                      style={{
                        width: '150px',
                        height: '150px',
                      }}
                    ></lord-icon>
                  </div>
                  <h5 className="fs-2">
                    Thank you ! Your Payment is Completed !
                  </h5>
                  <p className="text-muted">
                    You will receive an confirmation email with details of your
                    order.
                  </p>
                </div>
              </TabPane>
            </TabContent>
          </>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CheckOutForm;
