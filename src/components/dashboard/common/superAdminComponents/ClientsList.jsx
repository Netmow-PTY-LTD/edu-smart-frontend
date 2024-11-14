import {
  emptyAddClientsForSuperAdmin,
  emptyEditClientsForSuperAdmin,
} from '@/slices/dashboard/superAdminDashboard/reducer';
import {
  addClientsForSuperAdmin,
  allClientsForSuperAdmin,
  deleteClientsForSuperAdmin,
  updateClientsForSuperAdmin,
} from '@/slices/dashboard/superAdminDashboard/superAdminActions/clientsActions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import DeleteModal from '../Modals/DeleteModal';
import Pagination from '../Pagination';
import SponsorClientsModal from './superAdminModals/SponsorClientsModal';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const ClientsList = ({ data }) => {
  const dispatch = useDispatch();
  const [addSpoensorClients, setAddSopsorClients] = useState(false);
  const [editSpoensorClients, setEditSopsorClients] = useState(false);
  const [deleteSpoensorClients, setDeleteSopsorClients] = useState(false);
  const [sponsorClientsId, setSponsorClientsId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  const {
    data: addClientsData,
    isLoading: addClientsIsLoading,
    error: addClientsError,
  } = useSelector((state) => state.SuperAdminDashboard.addClientsForSuperAdmin);

  const {
    data: allClientsData,
    isLoading: allClientsIsLoading,
    error: allClientsError,
  } = useSelector((state) => state.SuperAdminDashboard.allClientsForSuperAdmin);

  const {
    data: updateClientsData,
    isLoading: updateClientsIsLoading,
    error: updateClientsError,
  } = useSelector(
    (state) => state.SuperAdminDashboard.updateClientsForSuperAdmin
  );

  useEffect(() => {
    dispatch(allClientsForSuperAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (addClientsData?.message && addClientsError === null) {
      toast.success(addClientsData?.message);
      dispatch(allClientsForSuperAdmin());
      dispatch(emptyAddClientsForSuperAdmin());
      resetAddForm();
    } else if (addClientsError) {
      toast.error(addClientsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addClientsData?.message, addClientsError, dispatch]);

  useEffect(() => {
    if (updateClientsData?.message && updateClientsError === null) {
      toast.success(updateClientsData?.message);
      dispatch(allClientsForSuperAdmin());
      dispatch(emptyEditClientsForSuperAdmin());
      resetEditForm();
    } else if (updateClientsError) {
      toast.error(updateClientsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateClientsData?.message, updateClientsError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addAllClientsData = {
      name: formData?.name,
      image: formData?.image,
    };

    const treamedData = new FormData();
    Object.entries(addAllClientsData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    const newErrors = {};

    if (!formData?.name) {
      newErrors.name = 'Company Name is Required';
    }
    if (!formData?.image) {
      newErrors.image = 'Image is Required';
    }
    if (Object.keys(newErrors).length === 0) {
      await dispatch(addClientsForSuperAdmin(treamedData));
    } else {
      setErrors(newErrors);
    }
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();

    let editClientsData = {};

    if (formData?.name) {
      editClientsData = {
        ...editClientsData,
        name: formData?.name,
      };
    } else {
      editClientsData = {
        ...editClientsData,
        name: ' ',
      };
    }
    if (formData?.image) {
      editClientsData = { ...editClientsData, image: formData?.image };
    } else {
      editClientsData = {
        ...editClientsData,
        image: ' ',
      };
    }
    if (sponsorClientsId) {
      editClientsData.id = sponsorClientsId;
    }

    const editTreamedData = new FormData();
    Object.entries(editClientsData).forEach(([key, value]) => {
      editTreamedData.append(key, value);
    });

    if (editClientsData?.name || editClientsData?.image || editClientsData.id) {
      await dispatch(updateClientsForSuperAdmin(editTreamedData));
    }
  };

  const togAddSpoensorClients = () => {
    setAddSopsorClients(!addSpoensorClients);
  };

  const togEditSponsorClients = (id) => {
    const filteredData =
      allClientsData?.length > 0 &&
      allClientsData?.find((client) => client?._id === id);

    setFormData({
      name: filteredData?.name,
    });

    const fetchAndConvertImage = async (imageProp, fileName) => {
      if (
        filteredData?._id &&
        filteredData?.[imageProp] &&
        filteredData?.[imageProp].uploadedImage
      ) {
        try {
          const response = await fetch(filteredData?.[imageProp].uploadedImage);
          const blob = await response.blob();
          const file = new File([blob], `${fileName}.jpg`, {
            type: 'image/jpeg',
          });
          return file;
        } catch (error) {
          console.error('Error fetching and converting image:', error);
          return null;
        }
      }
    };

    const updateFormData = async () => {
      try {
        const imageFile = await fetchAndConvertImage('image', 'image');

        setFormData((prevState) => ({
          ...prevState,
          image: imageFile,
        }));
      } catch (error) {
        console.error('Error updating form data:', error);
      }
    };

    updateFormData();
    setSponsorClientsId(id);
    setEditSopsorClients(!editSpoensorClients);
  };

  const togDeleleSponsorClients = (id) => {
    setSponsorClientsId(id);
    setDeleteSopsorClients(!deleteSpoensorClients);
  };

  const handleDelete = async (Id) => {
    await dispatch(deleteClientsForSuperAdmin(Id));
    dispatch(allClientsForSuperAdmin());
    togDeleleSponsorClients();
  };

  const resetAddForm = () => {
    setFormData({});
    setErrors({});
    setAddSopsorClients(!addSpoensorClients);
  };

  const resetEditForm = () => {
    setFormData({});
    setErrors({});
    setEditSopsorClients(!editSpoensorClients);
  };



  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">Clients List</h4>
            </div>
          </div>
          <div className="col-sm-auto ">
            <button
              onClick={() => togAddSpoensorClients()}
              type="button"
              className="button p-3 m-3 text-light"
            >
              <i className="ri-add-line align-bottom me-1"></i>
              Add New
            </button>
          </div>
          {
            <SponsorClientsModal
              openModal={addSpoensorClients}
              title={'Add New Sponsor Clients'}
              Btn={'Add New'}
              formData={formData}
              handleInputChange={handleInputChange}
              resetForm={resetAddForm}
              errors={errors}
              handleSubmit={handleSubmit}
              isLoading={addClientsIsLoading}
            />
          }
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
                    Image
                  </th>
                  <th scope="col" className="py-4">
                    Name
                  </th>

                  <th scope="col" className="py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allClientsData?.length > 0 &&
                  allClientsData
                    ?.slice(
                      currentPage * perPageData,
                      allClientsData?.length - currentPage * perPageData >
                        perPageData
                        ? currentPage * perPageData + perPageData
                        : allClientsData?.length
                    )
                    .map((item, key) => (
                      <tr key={key}>
                        <td>
                          <h5 className="fs-14 my-1 fw-medium text-uppercase">
                            {key + 1}
                          </h5>
                        </td>
                        <td>
                          <div className="d-flex align-items-center py-0">
                            <div className="flex-shrink-0 me-4">
                              <Image
                                src={
                                  item?.image?.uploadedImage
                                    ? item?.image?.uploadedImage
                                    : `${userDummyImage}`
                                }
                                alt="User"
                                height={60}
                                width={60}
                                className="avatar-lg p-2 rounded-circle"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-medium text-uppercase">
                            {item?.name}
                          </h5>
                        </td>

                        {/* Action */}
                        <td>
                          <div className="d-flex gap-3">
                            <div className="flex-shrink-0">
                              <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle
                                  tag="a"
                                  className="text-reset dropdown-btn"
                                  role="button"
                                >
                                  <span className="button text-light p-2">
                                    <i className="ri-more-fill align-middle"></i>
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        togEditSponsorClients(item?._id)
                                      }
                                      className=" text-primary p-2"
                                    >
                                      <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                      Edit
                                    </div>
                                  </DropdownItem>

                                  <DropdownItem>
                                    <div
                                      onClick={() =>
                                        togDeleleSponsorClients(item?._id)
                                      }
                                      className=" text-primary p-2"
                                    >
                                      <i className="ri-delete-bin-fill align-start me-2 text-muted"></i>
                                      Delete
                                    </div>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {data?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span>{"Don't found any Data. "}</span>
            </div>
          )}

          {
            <SponsorClientsModal
              openModal={editSpoensorClients}
              resetForm={resetEditForm}
              title={'Edit Sponsor Clients'}
              Btn={'Update'}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={submitEditHandler}
              isLoading={updateClientsIsLoading}
            />
          }

          {
            <DeleteModal
              Open={deleteSpoensorClients}
              close={togDeleleSponsorClients}
              id={sponsorClientsId}
              handleDelete={handleDelete}
            />
          }
        </CardBody>
        <CardFooter>
          <Pagination
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
            }}
            data={allClientsData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default ClientsList;
