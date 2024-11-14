import {
  allcontactMessageForSAdmin,
  deletecontactMessageForSAdmin,
} from '@/slices/dashboard/superAdminDashboard/superAdminActions/contactMessageActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DeleteModal from '../Modals/DeleteModal';
import ContactMsgDetailsModal from './superAdminModals/ContactMsgDetailsModal';

const ContactMessageList = (data) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contactMsgId, setContactMsgId] = useState('');

  const { data: allContactMessageData, isLoading: allContactMessageIsLoading } =
    useSelector(
      (state) => state.SuperAdminDashboard.allcontactMessageForSAdmin
    );

  useEffect(() => {
    dispatch(allcontactMessageForSAdmin());
  }, [dispatch]);

  const togOpenModal = (id) => {
    setContactMsgId(id);
    setOpenModal(!openModal);
  };

  const togDeleteModal = (id) => {
    setContactMsgId(id);
    setDeleteModal(!deleteModal);
  };

  const handleDelete = async (Id) => {
    await dispatch(deletecontactMessageForSAdmin(Id));
    dispatch(allcontactMessageForSAdmin());
    togDeleteModal();
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                CONTACT MESSAGE
              </h4>
            </div>
          </div>
        </CardHeader>

        <CardBody style={{ position: 'relative' }}>
          <div className="table-responsive table-card mb-5">
            <table className="table table-hover table-centered align-middle table-nowrap ">
              <thead className="fs-2">
                <tr>
                  <th scope="col" className="py-4">
                    SL
                  </th>
                  <th scope="col" className="py-4">
                    Person
                  </th>
                  <th scope="col" className="py-4">
                    Subject
                  </th>
                  <th scope="col" className="py-4">
                    Phone
                  </th>
                  <th scope="col" className="py-4">
                    Date
                  </th>
                  <th scope="col text-center" className="py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allContactMessageData?.length > 0 &&
                  allContactMessageData?.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{key + 1}</h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          {item?.name}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.subject}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.phone}</h5>
                      </td>

                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {new Date(item?.createdAt).toLocaleDateString(
                            'en-US',
                            { year: 'numeric', month: 'short', day: '2-digit' }
                          ) +
                            ' ' +
                            new Date(item?.createdAt).toLocaleTimeString(
                              'en-US',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              }
                            )}
                        </h5>
                      </td>
                      <td>
                        <div className="d-flex justify-content-start align-items-center gap-3">
                          <button
                            onClick={() => togOpenModal(item._id)}
                            className="third-btn px-3 py-1 my-1"
                          >
                            View
                          </button>
                          <button
                            onClick={() => togDeleteModal(item._id)}
                            className="close-btn px-3 py-1 my-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {data?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">{"Don't found any Data. "}</span>
            </div>
          )}

          {
            <ContactMsgDetailsModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              id={contactMsgId}
            />
          }
          {
            <DeleteModal
              Open={deleteModal}
              close={togDeleteModal}
              id={contactMsgId}
              handleDelete={handleDelete}
            />
          }
        </CardBody>
      </Card>
    </>
  );
};

export default ContactMessageList;
