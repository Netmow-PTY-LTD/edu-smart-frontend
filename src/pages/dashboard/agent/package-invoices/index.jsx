// pages/dashboard/superadmin/invoices.jsx or wherever

import React from 'react';
import Layout from '@/components/layout';
import PackageInvoiceTable from '@/components/common/PackageInvoiceTable';

const PackageInvoiceForSuperAdmin = () => {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <PackageInvoiceTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackageInvoiceForSuperAdmin;




// import CommonTableComponent from '@/components/common/CommonTableComponent';
// import PackageInvoiceComponent from '@/components/common/PackageInvoiceComponent';
// import SearchComponent from '@/components/common/SearchComponent';
// import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
// import Layout from '@/components/layout';
// import {
//   useGetPackagePaymentReportQuery,
//   useGetSinglePackagePaymentReportQuery,
// } from '@/slice/services/common/paymentReportServices';
// import DataObjectComponent, { brandlogo } from '@/utils/common/data';
// import React, { useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   UncontrolledDropdown,
// } from 'reactstrap';

// const PackageInvoiceForSuperAdmin = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(0);

//   const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
//   const [packageId, setPackageId] = useState('');
//   const perPageData = 10;

//   const { superAdminData, packagePaymentInvoieHeadersWithoutAction } =
//     DataObjectComponent();

//   const {
//     data: packagePaymentData,
//     error: packagePaymentDataError,
//     isLoading: packagePaymentDataLoading,
//     refetch: packagePaymentDataRefetch,
//   } = useGetPackagePaymentReportQuery();

//   const {
//     data: getSinglePackagePaymentReportData,
//     error: getSinglePackagePaymentReportDataError,
//     isLoading: getSinglePackagePaymentReportDataLoading,
//     refetch: getSinglePackagePaymentReportDataRefetch,
//   } = useGetSinglePackagePaymentReportQuery(packageId);

//   // search input change function
//   const handleSearchChange = (e) => setSearchTerm(e.target.value);

//   // Filter data for search option
//   const filteredData = packagePaymentData?.data?.filter((item) => {
//     const fullName =
//       `${item?.agent?.first_name || ''} ${item?.agent?.last_name || ''}`.toLowerCase();
//     return fullName?.includes(searchTerm.toLowerCase());
//   });

//   const ActionData = {
//     title: 'Action',
//     key: 'actions',
//     render: (item) => (
//       <UncontrolledDropdown direction="end">
//         <DropdownToggle
//           tag="a"
//           className="text-reset dropdown-btn"
//           role="button"
//         >
//           <span className="button px-3">
//             <i className="ri-more-fill align-middle"></i>
//           </span>
//         </DropdownToggle>
//         <DropdownMenu className="ms-2">
//           <DropdownItem>
//             <div
//               onClick={() => {
//                 if (item?._id) {
//                   setPackageId(item?._id);
//                   setOpenInvoiceModal(true);
//                   getSinglePackagePaymentReportDataRefetch(item?._id);
//                 }
//               }}
//               className="text-primary"
//             >
//               <i className="ri-eye-fill me-2"></i>
//               View Invoice
//             </div>
//           </DropdownItem>
//         </DropdownMenu>
//       </UncontrolledDropdown>
//     ),
//   };

//   const printInvoice = () => {
//     window.print();
//   };

//   console.log(filteredData);

//   return (
//     <Layout>
//       <div className="page-content">
//         <div className="container-fluid">
//           <div className="h-100">
//             <ToastContainer />
//             {packagePaymentDataLoading ? (
//               <LoaderSpiner />
//             ) : (
//               <Card>
//                 <CardHeader className="d-flex justify-content-between align-items-center">
//                   <div className="text-primary fw-semibold fs-2">
//                     Package Payment Invoices
//                   </div>
//                   <SearchComponent
//                     searchTerm={searchTerm}
//                     handleSearchChange={handleSearchChange}
//                   />
//                 </CardHeader>

//                 <CardBody>
//                   <CommonTableComponent
//                     headers={[
//                       ...packagePaymentInvoieHeadersWithoutAction,
//                       ActionData,
//                     ]}
//                     data={filteredData ? filteredData : []}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     perPageData={perPageData}
//                     searchTerm={searchTerm}
//                     handleSearchChange={handleSearchChange}
//                     emptyMessage="No Data found yet."
//                   />
//                 </CardBody>
//               </Card>
//             )}
//           </div>
//           {
//             <PackageInvoiceComponent
//               open={openInvoiceModal}
//               close={() => {
//                 setPackageId(''), setOpenInvoiceModal(false);
//               }}
//               loading={getSinglePackagePaymentReportDataLoading}
//               addressData={superAdminData}
//               billingAddressData={
//                 getSinglePackagePaymentReportData?.data?.agent
//               }
//               tableData={[getSinglePackagePaymentReportData?.data]}
//               printInvoice={printInvoice}
//               subtotal={
//                 getSinglePackagePaymentReportData?.data?.total_package_amount
//               }
//               total={getSinglePackagePaymentReportData?.data?.paid_amount}
//               currency={'MYR'}
//               payment_status={getSinglePackagePaymentReportData?.data?.status}
//               logoData={brandlogo}
//               invoice_no={getSinglePackagePaymentReportData?.data}
//               payment_method={
//                 getSinglePackagePaymentReportData?.data?.payment_method
//               }
//               paymentData={getSinglePackagePaymentReportData?.data}
//             />
//           }
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PackageInvoiceForSuperAdmin;
