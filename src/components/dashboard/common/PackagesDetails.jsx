/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import LoaderSpiner from '@/components/constants/Loader/Loader';
import { emptyAddPackageForSuperAdmin } from '@/slices/dashboard/superAdminDashboard/reducer';
import {
  addPackageForSuperAdmin,
  allPackageForSuperAdmin,
  deletePackageForSuperAdmin,
  updatePackageForSuperAdmin,
} from '@/slices/dashboard/superAdminDashboard/superAdminActions/packagesActions';
import { countryToCurrencyData } from 'get-currency-by-country';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteModal from './Modals/DeleteModal';
import Pagination from './Pagination';
import PackageModal from './superAdminComponents/superAdminModals/PackageModal';

const PackagesDetails = () => {
  const dispatch = useDispatch();
  const [addPackageModal, setaddPackageModal] = useState(false);
  const [deletePackageModal, setDeletePackageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [packageId, setPackageId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  const [fieldCount, setFieldCount] = useState(0);
  const [editFieldCount, setEditFieldCount] = useState(0);
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 0,
      country: '',
      currency: '',
      price: '',
    },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    subscription_fees: [],
    price: '',
    num_of_team: '',
    num_of_player: '',
    domain: '',
    num_of_products: '',
    website: '',
    custom_website: '',
    icon: '',
    coach_management: true,
    manager_management: true,
    ads: true,
    serial_no: 0,
  });

  //  error state
  const [errors, setErrors] = useState({});

  const {
    data: addPackageForSuperAdminData,
    isLoading: addPackageForSuperAdminIsLoading,
    error: addPackageForSuperAdminError,
  } = useSelector((state) => state.SuperAdminDashboard.addPackageForSuperAdmin);

  const {
    data: allPackageForSuperAdminData,
    isLoading: allPackageForSuperAdminIsLoading,
    error: allPackageForSuperAdminError,
  } = useSelector((state) => state.SuperAdminDashboard.allPackageForSuperAdmin);

  useEffect(() => {
    if (
      addPackageForSuperAdminData?._id &&
      addPackageForSuperAdminError === null
    ) {
      toast.success('Package Added Successfully');
      dispatch(emptyAddPackageForSuperAdmin());
      dispatch(allPackageForSuperAdmin());
      resetForm();
    }
    if (addPackageForSuperAdminError) {
      toast.error(addPackageForSuperAdminError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addPackageForSuperAdminData?.message,
    addPackageForSuperAdminError,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(allPackageForSuperAdmin());
  }, [dispatch]);

  const handleInputChange = (e, index) => {
    const { name, value, type } = e.target;

    const packageIndex = parseInt(name.split('-')[1], 10);

    if (packageIndex >= 0) {
      setSubscriptions((prev) =>
        prev.map((packageItem, i) =>
          i === packageIndex ? { ...packageItem, price: value } : packageItem
        )
      );
    }

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0].name,
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

  const countryChangeHandler = async (value, index) => {
    const selectedCountry = value?.label;

    if (selectedCountry) {
      const updatedSubscriptions = await subscriptions.map((item) => {
        if (item?.id === index) {
          return {
            ...item,
            country: selectedCountry,
            currency: countryToCurrencyData[selectedCountry]?.currency || '',
          };
        }
        return item;
      });

      setSubscriptions(updatedSubscriptions);
    }

    setFieldCount(index);
    setEditFieldCount(index);
  };

  const handleSelect = (name, selected) => {
    if (
      name === 'coach_management' ||
      name === 'manager_management' ||
      name === 'ads'
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    }

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

  const togAddPackageModal = () => {
    setaddPackageModal(!addPackageModal);
  };
  const togEditPackageModal = async (id) => {
    if (id) {
      const filterData =
        allPackageForSuperAdminData?.packages?.length > 0 &&
        allPackageForSuperAdminData.packages.find(
          (item) => item && item._id === id
        );

      if (filterData) {
        setFormData({
          name: filterData?.name,
          subscription_fees: filterData?.subscription_fees,
          price: filterData?.price,
          num_of_team: filterData?.num_of_team,
          num_of_player: filterData?.num_of_player,
          domain: filterData?.domain,
          num_of_products: filterData?.num_of_products,
          website: filterData?.website,
          custom_website: filterData?.custom_website,
          icon: filterData?.icon,
          coach_management: filterData?.coach_management,
          manager_management: filterData?.manager_management,
          ads: filterData?.ads,
          serial_no: filterData?.serial_no,
        });

        const subscriptionsWithId =
          filterData?.subscription_fees?.map((fee, index) => ({
            ...fee,
            id: index,
          })) || [];

        setSubscriptions(subscriptionsWithId);
      }
    }

    setPackageId(id);
    setEditModal((prev) => !prev);
  };

  const togDeletePackageModal = (id) => {
    setPackageId(id);
    setDeletePackageModal(!deletePackageModal);
  };
  const handleDelete = async (Id) => {
    await dispatch(deletePackageForSuperAdmin(Id));
    dispatch(allPackageForSuperAdmin());
    togDeletePackageModal();
  };

  const handleAddPackage = (e) => {
    e.preventDefault();

    const addAllPackageData = {
      name: formData?.name,
      price: formData?.price,
      subscription_fees: subscriptions,
      // package_time: formData?.package_time,
      // order_unit: formData?.order_unit,
      num_of_team: formData?.num_of_team,
      num_of_player: formData?.num_of_player,
      domain: formData?.domain,
      num_of_products: formData?.num_of_products,
      website: formData?.website,
      custom_website: formData?.custom_website,
      icon: formData?.icon,
      coach_management: true,
      manager_management: true,
      ads: true,
      serial_no: formData?.serial_no,
    };

    const treamedData = new FormData();
    Object.entries(addAllPackageData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    dispatch(addPackageForSuperAdmin(addAllPackageData)).then((res) => {
      if (!res.error) {
        dispatch(allPackageForSuperAdmin());
        resetForm();
      }
    });
  };

  const handleEditPackage = (e) => {
    e.preventDefault();

    let editPackageData = {
      // name: formData?.name || '',
      price: formData?.price || '',
      subscription_fees: subscriptions || [],
      num_of_team: formData?.num_of_team || '',
      num_of_player: formData?.num_of_player || '',
      domain: formData?.domain || '',
      num_of_products: formData?.num_of_products || '',
      website: formData?.website || '',
      custom_website: formData?.custom_website || '',
      icon: formData?.icon || '',
      coach_management: formData?.coach_management || '',
      manager_management: formData?.manager_management || '',
      ads: formData?.ads || '',
      serial_no: formData?.serial_no || 0,
    };

    if (packageId) {
      editPackageData.id = packageId;
    }

    const treamedData = new FormData();
    Object.entries(editPackageData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });

    if (editPackageData?.subscription_fees?.length > 0) {
      editPackageData.subscription_fees.forEach((fee, i) => {
        treamedData.append(`subscription_fees[${i}][country]`, fee?.country);
        treamedData.append(`subscription_fees[${i}][currency]`, fee?.currency);
        treamedData.append(`subscription_fees[${i}][price]`, fee?.price);
      });
    }

    if (
      editPackageData?.name ||
      editPackageData?.price ||
      editPackageData?.subscription_fees ||
      editPackageData?.num_of_team ||
      editPackageData?.num_of_player ||
      editPackageData?.domain ||
      editPackageData?.num_of_products ||
      editPackageData?.website ||
      editPackageData?.custom_website ||
      editPackageData?.icon ||
      editPackageData?.coach_management ||
      editPackageData?.manager_management ||
      editPackageData?.ads ||
      editPackageData?.serial_no ||
      editPackageData?.id
    ) {
      dispatch(updatePackageForSuperAdmin(editPackageData)).then((res) => {
        if (!res.error) {
          dispatch(allPackageForSuperAdmin());
          editResetForm();
        }
      });
    }
  };

  const resetForm = () => {
    setFormData({});
    setErrors({});
    // setFieldCount(0);
    setSubscriptions([
      {
        id: 0,
      },
    ]);
    setaddPackageModal(!addPackageModal);
  };

  const editResetForm = () => {
    setFormData({});
    setErrors({});
    // setEditFieldCount(0);
    setSubscriptions([
      {
        id: 0,
      },
    ]);
    setEditModal(!editModal);
  };

  console.log(formData);
  console.log(subscriptions);

  return (
    <>
      <Card>
        <div className="d-flex align-items-center justify-content-between py-4 fw-semibold mx-4">
          <div>Subscription Packages</div>
          <button
            onClick={togAddPackageModal}
            style={{ cursor: 'pointer' }}
            className="button p-3 text-white"
          >
            <i className="ri-add-fill me-3"></i>Add New Packages
          </button>
          {
            <PackageModal
              openModal={addPackageModal}
              title={'Add New Package'}
              Btn={'Add New'}
              handleInputChange={handleInputChange}
              formData={formData}
              handleSelect={handleSelect}
              handleSubmit={handleAddPackage}
              errors={errors}
              resetForm={resetForm}
              isLoading={addPackageForSuperAdminIsLoading}
              countryChangeHandler={countryChangeHandler}
              fieldCount={fieldCount}
              subscriptions={subscriptions}
              setSubscriptions={setSubscriptions}
              setFieldCount={setFieldCount}
            />
          }
        </div>
        {allPackageForSuperAdminIsLoading ? (
          <LoaderSpiner />
        ) : (
          <CardBody style={{ position: 'relative' }}>
            <div className="table-responsive table-card mb-5">
              <table className="table table-hover table-centered align-middle table-nowrap ">
                <thead className="fs-2">
                  <tr>
                    <th scope="col" className="py-4">
                      SL No
                    </th>
                    {/* <th scope="col" className="py-4">
                      Image
                    </th> */}
                    <th scope="col" className="py-4">
                      Name
                    </th>
                    <th scope="col" className="py-4">
                      Custom Price(USD)
                    </th>
                    <th scope="col" className="py-4">
                      Teams
                    </th>
                    <th scope="col" className="py-4">
                      Players
                    </th>
                    <th scope="col" className="py-4">
                      Products
                    </th>
                    <th scope="col" className="py-4">
                      Coach
                    </th>
                    <th scope="col" className="py-4">
                      Manager
                    </th>
                    <th scope="col" className="py-4">
                      Domain
                    </th>
                    <th scope="col" className="py-4">
                      Website
                    </th>
                    <th scope="col" className="py-4">
                      Ads
                    </th>
                    <th scope="col" className="py-4">
                      Subscription Fees
                    </th>

                    <th scope="col" className="py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allPackageForSuperAdminData?.packages?.length > 0 &&
                    allPackageForSuperAdminData?.packages
                      ?.slice(
                        currentPage * perPageData,
                        allPackageForSuperAdminData?.packages?.length -
                          currentPage * perPageData >
                          perPageData
                          ? currentPage * perPageData + perPageData
                          : allPackageForSuperAdminData?.packages?.length
                      )
                      .map((item, key) => (
                        <tr key={key}>
                          <td>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              {item?.serial_no ? item.serial_no : key + 1}
                            </h5>
                          </td>
                          {/* <td>
                            <div className="d-flex align-items-center py-0">
                              <div className="flex-shrink-0 me-4">
                                <Image
                                  // src={`/${item?.icon}`}
                                  alt="User"
                                  height={60}
                                  width={60}
                                  className="avatar-lg p-2 rounded-circle"
                                />
                              </div>
                            </div>
                          </td> */}
                          <td>
                            <h5 className="fs-14 my-1 fw-medium text-uppercase">
                              {item?.name}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.price}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.num_of_team}
                            </h5>
                          </td>

                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.num_of_player}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.num_of_products}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 text-uppercase fw-normal">
                              {item?.coach_management === true ? 'yes' : 'no'}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 text-uppercase fw-normal">
                              {item?.manager_management === true ? 'yes' : 'no'}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.domain}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 fw-normal">
                              {item?.website}
                            </h5>
                          </td>
                          <td>
                            <h5 className="fs-14 my-1 text-uppercase fw-normal">
                              {item?.ads === true ? 'yes' : 'no'}
                            </h5>
                          </td>
                          <td>
                            {item?.subscription_fees?.map((s, i) => (
                              <h5
                                key={i}
                                className="fs-14 my-1 fw-normal text-wrap"
                              >
                                {s?.price === 'POA'
                                  ? 'POA'
                                  : `${s?.country ? s.country + ' - ' + (countryToCurrencyData[s.country]?.currency || '') : ''} ${s?.price}`}
                              </h5>
                            ))}
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
                                          togEditPackageModal(item?._id)
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
                                          togDeletePackageModal(item?._id)
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

            {allPackageForSuperAdminData?.length <= 0 && (
              <div className="empty-table-dialog-container">
                <span className="">{'No data found.'}</span>
              </div>
            )}

            {
              <PackageModal
                openModal={editModal}
                title={'Edit Package'}
                Btn={'Update'}
                handleInputChange={handleInputChange}
                formData={formData}
                handleSelect={handleSelect}
                handleSubmit={handleEditPackage}
                resetForm={editResetForm}
                id={packageId}
                countryChangeHandler={countryChangeHandler}
                editFieldCount={editFieldCount}
                setEditFieldCount={setEditFieldCount}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                // data={singlePackageData}
              />
            }

            {
              <DeleteModal
                Open={deletePackageModal}
                close={togDeletePackageModal}
                id={packageId}
                handleDelete={handleDelete}
              />
            }
          </CardBody>
        )}
        <CardFooter>
          <Pagination
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
            }}
            data={allPackageForSuperAdminData?.packages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default PackagesDetails;
