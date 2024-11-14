import {
  emptyAddTestimonialForSuperAdmin,
  emptyEditTestimonialForSuperAdmin,
} from '@/slices/dashboard/superAdminDashboard/reducer';
import {
  addTestimonialForSuperAdmin,
  allTestimonialForSuperAdmin,
  deleteTestimonialForSuperAdmin,
  updateTestimonialForSuperAdmin,
} from '@/slices/dashboard/superAdminDashboard/superAdminActions/testimonialActions';
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
import TestimonialModal from './superAdminModals/TestimonialModal';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const SuperAdminTestimonial = ({ data }) => {
  const dispatch = useDispatch();
  const [addTestimonials, setAddTestimonials] = useState(false);
  const [editTestimonials, setEditTestimonials] = useState(false);
  const [deleteTestimonials, setDeleteTestimonials] = useState(false);
  const [testimonialsId, setTestimonialsId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    comment: '',
    image: null,
    // date: '',
  });

  const [errors, setErrors] = useState({});

  const {
    data: addTestimonialData,
    isLoading: addTestimonialIsLoading,
    error: addTestimonialError,
  } = useSelector(
    (state) => state.SuperAdminDashboard.addTestimonialForSuperAdmin
  );

  const {
    data: allTestimonialData,
    isLoading: allTestimonialIsLoading,
    error: allTestimonialError,
  } = useSelector(
    (state) => state.SuperAdminDashboard.allTestimonialForSuperAdmin
  );

  const {
    data: updateTestimonialData,
    isLoading: updateTestimonialIsLoading,
    error: updateTestimonialError,
  } = useSelector(
    (state) => state.SuperAdminDashboard.updateTestimonialForSuperAdmin
  );

  useEffect(() => {
    dispatch(allTestimonialForSuperAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (addTestimonialData?.message && addTestimonialError === null) {
      toast.success(addTestimonialData?.message);
      dispatch(allTestimonialForSuperAdmin());
      dispatch(emptyAddTestimonialForSuperAdmin());
      addFormReset();
    } else if (addTestimonialError) {
      toast.error(addTestimonialError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTestimonialData?.message, addTestimonialError, dispatch]);

  useEffect(() => {
    if (updateTestimonialData?.message && updateTestimonialError === null) {
      toast.success(updateTestimonialData?.message);
      dispatch(allTestimonialForSuperAdmin());
      dispatch(emptyEditTestimonialForSuperAdmin());
      editFormReset();
    } else if (updateTestimonialError) {
      toast.error(updateTestimonialError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTestimonialData?.message, updateTestimonialError, dispatch]);

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

  const handleSelect = (name, selected) => {
    if (Array.isArray(selected)) {
      const selectedValue = selected[0].toString();

      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedValue,
      }));
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const addAllTestimonialData = {
      name: formData?.name,
      address: formData?.address,
      comment: formData?.comment,
      // date: formData?.date,
      image: formData?.image,
    };

    const treamedData = new FormData();
    Object.entries(addAllTestimonialData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    const newErrors = {};

    if (!formData?.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData?.address) {
      newErrors.address = 'address is required';
    }
    if (!formData?.comment) {
      newErrors.comment = 'comment is required';
    }
    // if (!formData?.date) {
    //   newErrors.date = 'date is required';
    // }

    if (!formData?.image) {
      newErrors.image = 'Image is required';
    }

    if (Object.keys(newErrors).length === 0) {
      await dispatch(addTestimonialForSuperAdmin(treamedData));
    } else {
      setErrors(newErrors);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    let editTestimonialData = {};

    if (formData?.name) {
      editTestimonialData = { ...editTestimonialData, name: formData.name };
    } else {
      editTestimonialData = {
        ...editTestimonialData,
        name: ' ',
      };
    }
    if (formData?.address) {
      editTestimonialData = {
        ...editTestimonialData,
        address: formData?.address,
      };
    } else {
      editTestimonialData = {
        ...editTestimonialData,
        address: ' ',
      };
    }
    if (formData?.comment) {
      editTestimonialData = {
        ...editTestimonialData,
        comment: formData.comment,
      };
    } else {
      editTestimonialData = {
        ...editTestimonialData,
        comment: ' ',
      };
    }
    // if (formData?.date) {
    //   editTestimonialData = { ...editTestimonialData, date: formData.date };
    // }
    if (formData?.image) {
      editTestimonialData = { ...editTestimonialData, image: formData.image };
    } else {
      editTestimonialData = {
        ...editTestimonialData,
        image: ' ',
      };
    }

    if (testimonialsId) {
      editTestimonialData.id = testimonialsId;
    }

    const editTreamedData = new FormData();
    Object.entries(editTestimonialData).forEach(([key, value]) => {
      editTreamedData.append(key, value);
    });

    if (
      editTestimonialData?.name ||
      editTestimonialData?.address ||
      editTestimonialData?.comment ||
      // editTestimonialData?.date ||
      editTestimonialData?.image ||
      editTestimonialData?.id
    ) {
      await dispatch(updateTestimonialForSuperAdmin(editTreamedData));
    }
  };

  const togAddTestimonial = () => {
    setAddTestimonials(!addTestimonials);
  };

  const togEditTestimonial = (id) => {
    const filteredData =
      allTestimonialData?.length > 0 &&
      allTestimonialData?.find((client) => client?._id === id);

    setFormData({
      name: filteredData?.name,
      address: filteredData?.address,
      comment: filteredData?.comment,
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
    setTestimonialsId(id);
    setEditTestimonials(!editTestimonials);
  };

  const togDeleteTestimonial = (id) => {
    setTestimonialsId(id);
    setDeleteTestimonials(!deleteTestimonials);
  };

  const handleDelete = async (Id) => {
    await dispatch(deleteTestimonialForSuperAdmin(Id));
    dispatch(allTestimonialForSuperAdmin());
    togDeleteTestimonial();
  };

  const addFormReset = () => {
    setFormData({});
    setErrors({});
    setAddTestimonials(!addTestimonials);
  };

  const editFormReset = () => {
    setFormData({});
    setErrors({});
    setEditTestimonials(!editTestimonials);
  };



  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">
                TESTIMONIAL LIST
              </h4>
            </div>
          </div>
          <div className="col-sm-auto ">
            <button
              onClick={() => togAddTestimonial()}
              type="button"
              className="button p-3 m-3 text-light"
            >
              <i className="ri-add-line align-bottom me-1"></i>
              Add New
            </button>
          </div>
          {
            <TestimonialModal
              openModal={addTestimonials}
              resetForm={addFormReset}
              title={'New Testimonial Information'}
              Btn={'Add New'}
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSubmit={handleAddSubmit}
              handleSelect={handleSelect}
              isLoading={addTestimonialIsLoading}
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
                    Designation
                  </th>
                  <th scope="col" className="py-4">
                    Comment
                  </th>

                  {/* <th scope="col" className="py-4">
                    Date
                  </th> */}

                  <th scope="col" className="py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTestimonialData?.length > 0 &&
                  allTestimonialData
                    ?.slice(
                      currentPage * perPageData,
                      allTestimonialData?.length - currentPage * perPageData >
                        perPageData
                        ? currentPage * perPageData + perPageData
                        : allTestimonialData?.length
                    )
                    .map((item, key) => (
                      <tr key={key}>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{key + 1}</h5>
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
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item?.address}
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal text-wrap">
                            {item?.comment}
                          </h5>
                        </td>
                        {/* <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {new Date(item?.date).toDateString()}
                        </h5>
                      </td> */}

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
                                        togEditTestimonial(item?._id)
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
                                        togDeleteTestimonial(item?._id)
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

          {allTestimonialData?.length <= 0 && (
            <div className="empty-table-dialog-container">
              <span className="">
                {"Don't found any Manager. "}
                Please Add
              </span>
            </div>
          )}

          {
            <TestimonialModal
              openModal={editTestimonials}
              resetForm={editFormReset}
              title={'Edit Testimonial Information'}
              Btn={'Update'}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleEditSubmit}
              handleSelect={handleSelect}
              isLoading={updateTestimonialIsLoading}
            />
          }

          {
            <DeleteModal
              Open={deleteTestimonials}
              close={togDeleteTestimonial}
              id={testimonialsId}
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
            data={allTestimonialData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default SuperAdminTestimonial;
