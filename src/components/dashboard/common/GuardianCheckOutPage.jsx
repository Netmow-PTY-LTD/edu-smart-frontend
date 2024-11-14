import { createTransection } from '@/slices/dashboard/adminDashboard/Actions/chargesActions';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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
import Loader from './Loader';

const GuardianCheckOutPage = ({
  event_id,
  player_id,
  guardian_id,
  invoice_type,
  invoiceName,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);

  const { data: transactionData, error: transactionError } = useSelector(
    (state) => state.AdminDashboard.createTransection
  );

  useEffect(() => {
    if (transactionData?.length > 0) {
      toggleTab(2);

      if (invoiceName === 'game_fee_for_players_by_guardian') {
        router.push(
          `/guardian/seasonal-game-fee-for-single-player/${event_id},${player_id}`
        );
      } else if (invoiceName === 'player_reg_fee_by_guardian') {
        router.push(`/guardian/player-registration-fee-invoice/${player_id}`);
      } else if (invoiceName === 'game_fee_by_player') {
        router.push(
          `/player/seasonal-game-fee-for-single-player/${event_id},${player_id}`
        );
      } else if (invoiceName === 'player_reg_fee_by_player') {
        router.push(`/player/player-registration-fee-invoice/${player_id}`);
      }
    }
    if (transactionError) {
      toast.error('Payment Unsuccessfull');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    event_id,
    invoiceName,
    player_id,
    router,
    transactionData?.length,
    transactionError,
  ]);

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
          payment_method: firstCard,
        };

        if (guardian_id) {
          transactionData = {
            ...transactionData,
            guardian_id: guardian_id,
          };
        }
        if (event_id) {
          transactionData = {
            ...transactionData,
            event_id: event_id,
          };
        }
        if (invoice_type) {
          transactionData = {
            ...transactionData,
            invoice_type: invoice_type,
          };
        }
        if (player_id) {
          transactionData = {
            ...transactionData,
            player_id: player_id,
          };
        }

        try {
          await dispatch(createTransection(transactionData));
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

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  return (
    <>
      <Col xl="8">
        <Card>
          <CardBody>
            <ToastContainer />
            <div className="step-arrow-nav mt-n3 mx-n3 mb-3" tabs>
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
                    {/* <Col lg={6} sm={6}>
                      <div>
                        <div className="form-check card-radio">
                          <Input
                            id="paymentMethod01"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                          />
                          <Label
                            className="form-check-label p-4"
                            htmlFor="paymentMethod01"
                          >
                            <span className="fs-16 text-muted me-2">
                              <i className="ri-paypal-fill align-bottom "></i>
                            </span>
                            <span className="fs-14 text-wrap">Paypal</span>
                          </Label>
                        </div>
                      </div>
                    </Col> */}
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

                  <div className="collapse show" id="paymentmethodCollapse">
                    <Card className="p-5 border shadow-none mb-0 mt-5">
                      <form onSubmit={(e) => stripePayHandler(e)}>
                        <PaymentElement />

                        <div className="text-muted mt-4 fst-italic">
                          <i
                            data-feather="lock"
                            className="text-muted icon-xs"
                          ></i>
                          Your transaction is secured with SSL encryption
                        </div>
                        <div className="hstack d-flex align-items-start gap-3 mt-4">
                          <button
                            disabled={!stripe || loading}
                            type="submit"
                            className="button  text-light py-3 btn-label right ms-auto nexttab"
                          >
                            {loading ? <Loader /> : 'Complete Payment'}

                            <i className="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>
                          </button>
                        </div>
                        {errorMessage && (
                          <div className="text-danger fs-1">
                            *Ooops!...{errorMessage}
                          </div>
                        )}
                      </form>
                    </Card>
                  </div>
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
                      You will receive an confirmation email with details of
                      your order.
                    </p>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default GuardianCheckOutPage;
