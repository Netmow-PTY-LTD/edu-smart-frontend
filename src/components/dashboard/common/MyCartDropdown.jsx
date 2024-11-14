/* eslint-disable no-constant-condition */
import React, { useState } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'reactstrap';

//SimpleBar

//import images
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import Image from 'next/image';
import Link from 'next/link';
import image1 from '../../../../public/assets/images/products/img-1.png';
import image2 from '../../../../public/assets/images/products/img-2.png';
import image3 from '../../../../public/assets/images/products/img-3.png';
import image5 from '../../../../public/assets/images/products/img-5.png';
import image6 from '../../../../public/assets/images/products/img-6.png';

const MyCartDropdown = () => {
  const cartData = [
    {
      id: 1,
      img: image1,
      product: 'Branded T-Shirts',
      quantity: 10,
      price: 32,
    },
    { id: 2, img: image2, product: 'Bentwood Chair', quantity: 5, price: 18 },
    {
      id: 3,
      img: image3,
      product: 'Borosil Paper Cup',
      quantity: 3,
      price: 250,
    },
    {
      id: 4,
      img: image6,
      product: 'Gray Styled T-Shirt',
      quantity: 1,
      price: 1250,
    },
    {
      id: 5,
      img: image5,
      product: 'Stillbird Helmet',
      quantity: 2,
      price: 495,
    },
  ];

  const [isCartDropdown, setIsCartDropdown] = useState(false);

  const [cartItem, setCartItem] = useState(cartData.length);

  const toggleCartDropdown = () => {
    setIsCartDropdown(!isCartDropdown);
    setCartItem(cartData.length);
  };

  const removeItem = (ele) => {
    var price = ele
      .closest('.dropdown-item-cart')
      .querySelector('.cart-item-price').innerHTML;
    var subTotal = document.getElementById('cart-item-total').innerHTML;
    document.getElementById('cart-item-total').innerHTML = subTotal - price;

    ele.closest('.dropdown-item-cart').remove();
    const element = document.querySelectorAll('.dropdown-item-cart').length;
    const ecart = document.getElementById('empty-cart');

    if (element === 0) {
      ecart.style.display = 'block';
    } else {
      ecart.style.display = 'none';
    }

    setCartItem(element);
  };

  return (
    <>
      <Dropdown
        isOpen={isCartDropdown}
        toggle={toggleCartDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-shopping-bag fs-22"></i>
          <span className="position-absolute cartitem-badge topbar-badge fs-10 translate-middle badge rounded-pill bg-info">
            {cartItem}
            <span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
          aria-labelledby="page-header-cart-dropdown"
        >
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
              </Col>
              <div className="col-auto">
                <span className="badge bg-warning-subtle  text-warning fs-13">
                  <span className="cartitem-badge"> {cartItem} </span> items
                </span>
              </div>
            </Row>
          </div>
          <Col>
            <div className="p-2">
              {cartData ? (
                cartData.map((item, key) => (
                  <div
                    className="d-block dropdown-item text-wrap dropdown-item-cart px-3 py-3"
                    key={key}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        priority={true}
                        src={item.img ? item?.img : `${userDummyImage}`}
                        className="me-3 rounded-circle avatar-lg p-2 bg-light"
                        alt="user-pic"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mt-0 mb-1 fs-14">
                          <Link href="" className="text-black">
                            {item.product}
                          </Link>
                        </h6>
                        <p className="mb-0 fs-3 text-muted">
                          Quantity:{' '}
                          <span>
                            {item.quantity} x ${item.price}
                          </span>
                        </p>
                      </div>
                      <div className="px-2 ">
                        <h5 className="m-0 fw-normal">
                          $
                          <span className="cart-item-price fs-3">
                            {item.quantity * item.price}
                          </span>
                        </h5>
                      </div>
                      <div className="ps-2">
                        <button
                          type="button"
                          className="btn btn-icon btn-sm btn-ghost-danger remove-item-btn"
                          onClick={(e) => {
                            removeItem(e.target);
                          }}
                        >
                          <i className="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-table-dialog-container">
                  <i className="bx bx-cart me-3 qoute_color fs-1 fw-bold"></i>
                  <span className="me-3">Your Cart is Empty!</span>
                  <Link
                    href={'/admin'}
                    className="qoute_color text-decoration-underline"
                  >
                    {' '}
                    Shop Now
                  </Link>
                </div>
              )}
            </div>
          </Col>
          <div
            className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
            id="checkout-elem"
          >
            <div className="d-flex justify-content-between align-items-center  mb-4">
              <h5 className="m-0 fs-2 text-muted">Total:</h5>
              <div className="px-2">
                <h5 className="m-0 fs-2">
                  $<span id="cart-item-total">3400</span>
                </h5>
              </div>
            </div>

            <Link
              href=""
              className="btn button text-light fs-2 fw-semibold pt-3 w-100"
            >
              Checkout
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default MyCartDropdown;
