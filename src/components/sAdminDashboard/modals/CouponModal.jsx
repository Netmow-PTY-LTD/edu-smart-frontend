// import MultipleSelectField from '@/components/common/formField/MultipleSelectField';
// import NumberField from '@/components/common/formField/NumberField';
// import SingleSelectField from '@/components/common/formField/SingleSelectField';
// import SubmitButton from '@/components/common/formField/SubmitButton';
// import TextField from '@/components/common/formField/TextField';
// import TimeField from '@/components/common/formField/TimeField';
// import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
// import { useGetAllPackageQuery } from '@/slice/services/public/package/publicPackageService';
// import { Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

// const CouponModal = ({
//   modalHeader,
//   submitButton,
//   open,
//   close,
//   initialValues,
//   validationSchema,
//   handleSubmit,
//   singleCouponIsLoading,
// }) => {
//   const [allPackages, setAllPackages] = useState(null);
//   const {
//     data: getAllPackageData,
//     isLoading: getAllPackageIsLoading,
//     refetch: getAllPackageRefetch,
//   } = useGetAllPackageQuery();

//   useEffect(() => {
//     if (getAllPackageData?.data?.length > 0) {
//       const mappedData = getAllPackageData.data.map((item) => ({
//         label: item.name,
//         value: item._id,
//       }));

//       // const allPackageIds = getAllPackageData.data.map((item) => item._id);

//       // const allPackageOption = {
//       //   label: 'Select All',
//       //   value: allPackageIds,
//       // };

//       // const allPackages = [allPackageOption, ...mappedData];

//       setAllPackages(mappedData);
//     }
//   }, [getAllPackageData?.data]);

//   const statusOptions = [
//     {
//       label: 'active',
//       value: 'active',
//     },
//     {
//       label: 'inactive',
//       value: 'inactive',
//     },
//   ];
//   const durationOptions = [
//     { label: '1 Month', value: '1_months' },
//     { label: '2 Months', value: '2_months' },
//     { label: '3 Months', value: '3_months' },
//     { label: '4 Months', value: '4_months' },
//     { label: '5 Months', value: '5_months' },
//     { label: '6 Months', value: '6_months' },
//     { label: '7 Months', value: '7_months' },
//     { label: '8 Months', value: '8_months' },
//     { label: '9 Months', value: '9_months' },
//     { label: '10 Months', value: '10_months' },
//     { label: '11 Months', value: '11_months' },
//     { label: '1 Year', value: '12_months' },
//   ];

//   console.log(initialValues.package_duration);

//   return (
//     <Modal isOpen={open} centered size="xl">
//       <ToastContainer />
//       <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
//       {singleCouponIsLoading ? (
//         <LoaderSpiner />
//       ) : (
//         <ModalBody>
//           <Card>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize={true}
//             >
//               {({ isSubmitting, values, setFieldValue }) => (
//                 <Form>
//                   <Row>
//                     <Col xl={6}>
//                       <TextField label="Coupon Code" name="name" />
//                     </Col>
//                     <Col xl={6}>
//                       <NumberField
//                         name={'discount_percentage'}
//                         label={'Discount Percentage'}
//                       />
//                     </Col>

//                     <Col xl={6}>
//                       <TimeField
//                         field={{
//                           name: 'start_date',
//                           value: initialValues.start_date,
//                         }}
//                         label="Start Date"
//                         form={{
//                           setFieldValue,
//                           values,
//                         }}
//                       />
//                     </Col>
//                     <Col xl={6}>
//                       <TimeField
//                         field={{
//                           name: 'end_date',
//                           value: initialValues.end_date,
//                         }}
//                         label="End Date"
//                         form={{
//                           setFieldValue,
//                           values,
//                         }}
//                       />
//                     </Col>
//                     <Col xl={6}>
//                       <MultipleSelectField
//                         field={{ name: 'package_id' }}
//                         label="Select Package"
//                         options={allPackages}
//                         form={{ setFieldValue, values }}
//                       />
//                     </Col>
//                     <Col xl={6}>
//                       <SingleSelectField
//                         name={'package_duration'}
//                         label={'Package Duration'}
//                         options={durationOptions}
//                       />
//                     </Col>
//                     <Col xl={6}>
//                       <SingleSelectField
//                         name={'coupon_status'}
//                         label={'Coupon Status'}
//                         options={statusOptions}
//                       />
//                     </Col>

//                     <div className="hstck mx-auto d-flex align-items-center justify-content-center my-5">
//                       <Col xl={12}>
//                         <SubmitButton
//                           //   isSubmitting={isSubmitting}
//                           formSubmit={submitButton}
//                         />
//                       </Col>
//                     </div>
//                   </Row>
//                 </Form>
//               )}
//             </Formik>
//           </Card>
//         </ModalBody>
//       )}
//     </Modal>
//   );
// };

// export default CouponModal;


import PackageMultipleSelectField from '@/components/common/formField/PackageMultipleSelectField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import NumberField from '@/components/common/formField/NumberField';
import NewSingleSelectField from '@/components/common/formField/NewSingleSelectField'; // Import the new component
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import TimeField from '@/components/common/formField/TimeField';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetAllPackageQuery } from '@/slice/services/public/package/publicPackageService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';


const CouponModal = ({
  modalHeader,
  submitButton,
  open,
  close,
  initialValues,
  validationSchema,
  handleSubmit,
  singleCouponIsLoading,
}) => {
  const [allPackages, setAllPackages] = useState(null);
  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  useEffect(() => {
    if (getAllPackageData?.data?.length > 0) {
      const mappedData = getAllPackageData.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));

      setAllPackages(mappedData);
    }
  }, [getAllPackageData?.data]);

  const statusOptions = [
    {
      label: 'active',
      value: 'active',
    },
    {
      label: 'inactive',
      value: 'inactive',
    },
  ];
  const durationOptions = [
    { label: '1 Month', value: '1_months' },
    { label: '2 Months', value: '2_months' },
    { label: '3 Months', value: '3_months' },
    { label: '4 Months', value: '4_months' },
    { label: '5 Months', value: '5_months' },
    { label: '6 Months', value: '6_months' },
    { label: '7 Months', value: '7_months' },
    { label: '8 Months', value: '8_months' },
    { label: '9 Months', value: '9_months' },
    { label: '10 Months', value: '10_months' },
    { label: '11 Months', value: '11_months' },
    { label: '1 Year', value: '12_months' },
  ];

  console.log('Initial Values:', initialValues);
  console.log('All Packages:', allPackages);

  return (
    <Modal isOpen={open} centered size="xl">
      <ToastContainer />
      <ModalHeader toggle={close}>{modalHeader}</ModalHeader>
      {singleCouponIsLoading ? (
        <LoaderSpiner />
      ) : (
        <ModalBody>
          <Card>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col xl={6}>
                      <TextField label="Coupon Code" name="name" />
                    </Col>
                    <Col xl={6}>
                      <NumberField
                        name={'discount_percentage'}
                        label={'Discount Percentage'}
                      />
                    </Col>

                    <Col xl={6}>
                      <TimeField
                        field={{
                          name: 'start_date',
                          value: initialValues.start_date,
                        }}
                        label="Start Date"
                        form={{
                          setFieldValue,
                          values,
                        }}
                      />
                    </Col>
                    <Col xl={6}>
                      <TimeField
                        field={{
                          name: 'end_date',
                          value: initialValues.end_date,
                        }}
                        label="End Date"
                        form={{
                          setFieldValue,
                          values,
                        }}
                      />
                    </Col>
                    <Col xl={6}>
                      <PackageMultipleSelectField
                        field={{ name: 'package_id' }}
                        label="Select Package"
                        options={allPackages}
                        form={{ setFieldValue, values }}
                      />
                    </Col>
                    <Col xl={6}>
                      <NewSingleSelectField
                        name={'package_duration'}
                        label={'Package Duration'}
                        options={durationOptions}
                        value={values.package_duration || ''} // Ensure it's always controlled
                        onChange={(option) => setFieldValue('package_duration', option.value)}
                      />
                    </Col>
                    <Col xl={6}>
                      <SingleSelectField
                        name={'coupon_status'}
                        label={'Coupon Status'}
                        options={statusOptions}
                      />
                    </Col>

                    <div className="hstck mx-auto d-flex align-items-center justify-content-center my-5">
                      <Col xl={12}>
                        <SubmitButton
                          //   isSubmitting={isSubmitting}
                          formSubmit={submitButton}
                        />
                      </Col>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card>
        </ModalBody>
      )}
    </Modal>
  );
};

export default CouponModal;
