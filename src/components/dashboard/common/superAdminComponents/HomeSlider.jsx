import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import DeleteModal from '../Modals/DeleteModal';
import HomeSliderModal from './superAdminModals/HomeSliderModal';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';

const HomeSlider = (data) => {
  const [addSlider, setAddSlider] = useState(false);
  const [editSlider, setEditSlider] = useState(false);
  const [deleteSlider, setDeleteSlider] = useState(false);
  const [sliderId, setSliderId] = useState('');

  const [formData, setFormData] = useState({
    intro: '',
    short_desc: '',
    offer: '',
    slider_code: '',
    image: null,
    status: '',
    bg_image: null,
  });

  const [errors, setErrors] = useState({});

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
    if (typeof selected === 'object' && !Array.isArray(selected)) {
      const selectedValue = selected ? selected.value : '';

      setFormData({
        ...formData,
        [name]: selectedValue,
      });
    }

    if (Array.isArray(selected)) {
      const selectedValue = selected.map((option) => option.value).join(', ');

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

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const addAllSliderData = {
      intro: formData?.intro,
      short_desc: formData?.short_desc,
      offer: formData?.offer,
      slider_code: formData?.slider_code,
      image: formData?.image,
      status: formData?.status,
      bg_image: formData?.bg_image,
    };

    const treamedData = new FormData();
    Object.entries(addAllSliderData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    const newErrors = {};

    if (!formData?.intro) {
      newErrors.intro = 'Introduction is required';
    }
    if (!formData?.short_desc) {
      newErrors.short_desc = 'Short Description is required';
    }
    if (!formData?.offer) {
      newErrors.offer = 'Offer is required';
    }
    if (!formData?.status) {
      newErrors.status = 'Status is required';
    }
    if (!formData?.slider_code) {
      newErrors.slider_code = 'Slider Code is required';
    }
    if (!formData?.image) {
      newErrors.image = 'Image is required';
    }
    if (!formData?.bg_image) {
      newErrors.bg_image = 'Backgrounf Image is required';
    }

    if (Object.keys(newErrors).length === 0) {
      //
    } else {
      setErrors(newErrors);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let editSliderData = {};

    if (formData?.intro) {
      editSliderData = { ...editSliderData, intro: formData.intro };
    }
    if (formData?.short_desc) {
      editSliderData = { ...editSliderData, short_desc: formData?.short_desc };
    }
    if (formData?.offer) {
      editSliderData = { ...editSliderData, offer: formData.offer };
    }
    if (formData?.slider_code) {
      editSliderData = { ...editSliderData, slider_code: formData.slider_code };
    }
    if (formData?.image) {
      editSliderData = { ...editSliderData, image: formData.image };
    }
    if (formData?.status) {
      editSliderData = { ...editSliderData, status: formData.status };
    }
    if (formData?.bg_image) {
      editSliderData = { ...editSliderData, bg_image: formData.bg_image };
    }
    if (sliderId) {
      editSliderData.id = sliderId;
    }

    const treamedData = new FormData();
    Object.entries(editSliderData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    if (
      editSliderData?.intro ||
      editSliderData?.short_desc ||
      editSliderData?.offer ||
      editSliderData?.slider_code ||
      editSliderData?.image ||
      editSliderData?.bg_image ||
      editSliderData?.status ||
      editSliderData?.id
    ) {
      // hesre dispatch occurs
    }
  };

  const togAddSlider = () => {
    setAddSlider(!addSlider);
  };

  const togEditSlider = () => {
    setEditSlider(!editSlider);
  };

  const togDeteleSlider = () => {
    setDeleteSlider(!deleteSlider);
  };

  const handleDelete = (Id) => {
    // dispatch(deleteSliderForSuperAdmin(Id));
    // dispatch(getAllSliderForSuperAdmin())
    togDeteleSlider();
  };

  const addFormReset = () => {
    setFormData({});
    setErrors({});
    setAddSlider(!addSlider);
  };
  const editFormReset = () => {
    setFormData({});
    setErrors({});
    setEditSlider(!editSlider);
  };

  return (
    <>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <div className="col-sm pe-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2">Slider List</h4>
            </div>
          </div>
          <div className="col-sm-auto ">
            <button
              onClick={() => togAddSlider()}
              type="button"
              className="button p-3 m-3 text-light"
            >
              <i className="ri-add-line align-bottom me-1"></i>
              Add New
            </button>
          </div>
          {
            <HomeSliderModal
              openModal={addSlider}
              title={'Add Home Slider'}
              resetForm={addFormReset}
              Btn={'Add New'}
              handleInputChange={handleInputChange}
              handleSelect={handleSelect}
              errors={errors}
              handleSubmit={handleAddSubmit}
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
                    Intro
                  </th>
                  <th scope="col" className="py-4">
                    Description
                  </th>

                  <th scope="col" className="py-4">
                    Offer
                  </th>
                  <th scope="col" className="py-4">
                    Background Image
                  </th>

                  <th scope="col" className="py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 &&
                  data?.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <div className="d-flex align-items-center py-0">
                          <div className="flex-shrink-0 me-4">
                            <Link
                              href={`/admin/manager-profile/${item?._id}`}
                              className="text-reset"
                            >
                              <Image
                                src={
                                  item?.profile_image?.uploadedImage
                                    ? item?.profile_image?.uploadedImage
                                    : `${userDummyImage}`
                                }
                                alt="User"
                                height={60}
                                width={60}
                                className="avatar-lg p-2 rounded-circle"
                              />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-medium text-uppercase">
                          <Link
                            href={`/admin/manager-profile/${item?._id}`}
                            className="text-reset"
                          >
                            {item?.first_name + ' ' + item?.last_name}
                          </Link>
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">
                          {item?.date_of_birth}
                        </h5>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">{item?.gender}</h5>
                      </td>

                      <td>
                        <span
                          className={`my-1 fw-bold badge text-uppercase ${
                            item?.status && item?.status === 'active'
                              ? 'text-success'
                              : 'text-danger'
                          }`}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td>
                        <h5 className="fs-14 my-1 fw-normal">Team Name</h5>
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
                                    onClick={() => togEditSlider(item?._id)}
                                    className=" text-primary p-2"
                                  >
                                    <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                    Edit
                                  </div>
                                </DropdownItem>

                                <DropdownItem>
                                  <div
                                    onClick={() => togDeteleSlider(item?._id)}
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
              <span className="">
                {"Don't found any Manager. "}
                Please Add
              </span>
            </div>
          )}

          {
            <DeleteModal
              Open={deleteSlider}
              close={togDeteleSlider}
              handleDelete={handleDelete}
              id={sliderId}
            />
          }

          {
            <HomeSliderModal
              openModal={editSlider}
              resetForm={editFormReset}
              title={'Edit Home Slider'}
              Btn={'Update'}
              handleInputChange={handleInputChange}
              handleSelect={handleSelect}
              handleSubmit={handleEditSubmit}
            />
          }
        </CardBody>
      </Card>
    </>
  );
};

export default HomeSlider;
