import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import RegistrationInvoicesList from './RegistrationInvoicesList';
import SeasonalGameInvoicesList from './SeasonalGameInvoicesList';

const Invoices = ({
  invoiceData,
  id,
  goToInvoice,
  paidByCashIsLoading,
  seasonalGameData,
  userInfoData,
  singlePlayerForGuardianData,
  Tog_add_success_modal,
  redirectToInvoice,
  setAdd_success_modal,
  add_success_modal,
  guardianProfile,
  playerProfile,
  userId,
  Tog_game_add_success_modal,
  add_game_success_modal,
  setAdd_game_success_modal,
  playerPaidByCashIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  // file modal state
  const [file_modal, setFile_modal] = useState(false);
  const Tog_file_modal = () => {
    setFile_modal(!file_modal);
  };

  return (
    <>
      <Row xxl={12}>
        <Col xxl={5}>
          {userInfoData?.role === 'admin' ? (
            <RegistrationInvoicesList
              invoiceData={invoiceData}
              goToInvoice={goToInvoice}
              paidByCashIsLoading={playerPaidByCashIsLoading}
              id={id}
              Tog_file_modal={Tog_file_modal}
              file_modal={file_modal}
              setFile_modal={setFile_modal}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              Tog_add_success_modal={Tog_add_success_modal}
              redirectToInvoice={redirectToInvoice}
              setAdd_success_modal={setAdd_success_modal}
              add_success_modal={add_success_modal}
              userInfoData={userInfoData}
            />
          ) : userInfoData?.role === 'player' ? (
            <RegistrationInvoicesList
              invoiceData={invoiceData}
              goToInvoice={goToInvoice}
              paidByCashIsLoading={paidByCashIsLoading}
              id={id}
              Tog_file_modal={Tog_file_modal}
              file_modal={file_modal}
              setFile_modal={setFile_modal}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              userInfoData={userInfoData}
            />
          ) : userInfoData?.role === 'guardian' ? (
            <RegistrationInvoicesList
              invoiceData={invoiceData}
              goToInvoice={goToInvoice}
              paidByCashIsLoading={paidByCashIsLoading}
              id={id}
              Tog_file_modal={Tog_file_modal}
              file_modal={file_modal}
              setFile_modal={setFile_modal}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              userInfoData={userInfoData}
              Tog_add_success_modal={Tog_add_success_modal}
              add_success_modal={add_success_modal}
              setAdd_success_modal={setAdd_success_modal}
            />
          ) : (
            ''
          )}
        </Col>
        <Col xxl={7}>
          {userInfoData?.role === 'admin' && guardianProfile === 'yes' ? (
            <SeasonalGameInvoicesList
              seasonalGameData={seasonalGameData}
              guardianProfile={guardianProfile}
              Tog_add_success_modal={Tog_game_add_success_modal}
              setAdd_success_modal={setAdd_game_success_modal}
              add_success_modal={add_game_success_modal}
              id={id}
              goToInvoice={redirectToInvoice}
              userInfoData={userInfoData}
              paidByCashIsLoading={paidByCashIsLoading}
              userId={userId}
            />
          ) : userInfoData?.role === 'admin' && playerProfile === 'yes' ? (
            <SeasonalGameInvoicesList
              seasonalGameData={seasonalGameData}
              playerProfile={playerProfile}
              goToInvoice={redirectToInvoice}
              userInfoData={userInfoData}
              Tog_add_success_modal={Tog_add_success_modal}
              setAdd_success_modal={setAdd_success_modal}
              add_success_modal={add_success_modal}
              id={id}
              userId={userId}
              paidByCashIsLoading={paidByCashIsLoading}
            />
          ) : userInfoData?.role === 'guardian' && playerProfile === 'yes' ? (
            <SeasonalGameInvoicesList
              seasonalGameData={seasonalGameData}
              goToInvoice={goToInvoice}
              redirectToInvoice={redirectToInvoice}
              paidByCashIsLoading={paidByCashIsLoading}
              id={id}
              Tog_file_modal={Tog_file_modal}
              file_modal={file_modal}
              setFile_modal={setFile_modal}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              singlePlayerForGuardianData={singlePlayerForGuardianData}
              userInfoData={userInfoData}
              playerProfile={'yes'}
              Tog_add_success_modal={Tog_add_success_modal}
            />
          ) : userInfoData?.role === 'player' ? (
            <SeasonalGameInvoicesList
              seasonalGameData={seasonalGameData}
              goToInvoice={redirectToInvoice}
              paidByCashIsLoading={paidByCashIsLoading}
              id={id}
              Tog_file_modal={Tog_file_modal}
              file_modal={file_modal}
              setFile_modal={setFile_modal}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              singlePlayerForGuardianData={singlePlayerForGuardianData}
              userInfoData={userInfoData}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>

      {/* <Col xl={6} className="pt-4">
        <InvoicesList />
      </Col> */}
    </>
  );
};

export default Invoices;
