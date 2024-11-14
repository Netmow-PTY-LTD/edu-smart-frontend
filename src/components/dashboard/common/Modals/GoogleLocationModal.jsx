import axios from 'axios';
import React, { useEffect } from 'react';
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap';

const GoogleLocationModal = ({
  locationName,
  setLocationName,
  open,
  close,
  setLocationString,
  locationString,
}) => {
  const handleInputChange = async (e) => {
    const { value } = e.target;

    if (e.key === 'Enter' && value) {
      setLocationName(value);

      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL_PROD +
            `/public/api/v1/google-location-for-user?locationName=${value}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${localStorage.getItem('token')}`,
            },
          }
        );
        setLocationName(res?.data);
        // if (res?.data) {
        //   close();
        // }
      } catch (error) {
        //
      }
    }
  };

  // useEffect(() => {
  //   if (locationName?.formatted_address) {
  //     setLocationString(
  //       `https://www.google.com/maps/embed/v1/place?key=AIzaSyBj7s-6omZZa5NHTTFYa9s3l78e41GkypM&q=${locationName?.formatted_address.replace(
  //         /[^\w\s]/gi,
  //         ' '
  //       )}`
  //     );
  //   }
  // }, [locationName?.formatted_address, setLocationString]);

  return (
    <>
      <Modal isOpen={open} toggle={close} centered size="md">
        <ModalHeader toggle={close}>Please Enter Your Location</ModalHeader>
        <ModalBody>
          <div>
            <Input
              name="address_name"
              onKeyDown={handleInputChange}
              type="text"
              className="form-control fs-4"
              placeholder="Enter Location"
            />
          </div>
          <iframe
            src={
              locationName?.formatted_address
                ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBj7s-6omZZa5NHTTFYa9s3l78e41GkypM&q=${locationName?.formatted_address.replace(
                    /[^\w\s]/gi,
                    ' '
                  )}`
                : ''
            }
            width="100%"
            height="500"
            className="border-0 mt-4"
            allowFullScreen=""
            loading="fast"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default GoogleLocationModal;
