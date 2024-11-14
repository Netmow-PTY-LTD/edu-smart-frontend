/* eslint-disable @next/next/no-img-element */
import {
  addProductSize,
  allProductSize,
} from '@/slices/dashboard/ecommerce/Actions/productSizeActions';
import {
  addShopCategory,
  allShopCategory,
} from '@/slices/dashboard/ecommerce/Actions/shopActions';
import ColorNamer from 'color-namer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Loader from '../Loader';
import ProductSizeModal from './ProductSizeModal';
import ShopCategoryModal from './ShopCategoryModal';

const ProductFormModal = ({
  title,
  submitBtn,
  formData,
  setFormData,
  loading,
  errors,
  setErrors,
  submitHandler,
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [fieldCount, setFieldCount] = useState(0);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const [colors, setColors] = useState([
    {
      id: 0,
    },
  ]);

  const { data: allProductCategory } = useSelector(
    (state) => state.Ecommerce.allShopCategory
  );
  const { data: allProductSizeData } = useSelector(
    (state) => state.Ecommerce.allProductSize
  );

  const {
    data: addShopCategoryData,
    isLoading: addShopCategoryIsLoading,
    error: addShopCategoryError,
  } = useSelector((state) => state.Ecommerce.addShopCategory);
  const {
    data: addProductSizeData,
    isLoading: addProductSizeIsLoading,
    error: addProductSizeError,
  } = useSelector((state) => state.Ecommerce.addProductSize);

  useEffect(() => {
    dispatch(allShopCategory()).then((res) => {
      if (res.error) {
        //
      } else {
        if (allProductCategory?.length > 0) {
          const categoryData = allProductCategory
            .filter((category) => category?.status === true)
            .map((category) => ({
              label: category?.name,
              value: category?._id,
            }));

          setCategory(categoryData);
        } else {
          setCategory([]);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProductCategory?.length, dispatch]);

  useEffect(() => {
    dispatch(allProductSize()).then((res) => {
      if (res.error) {
        // Handle error if necessary
      } else {
        if (allProductSizeData?.length > 0) {
          const productSizeData = allProductSizeData
            .filter((size) => size?.status === true)
            .map((size) => ({
              label: size?.name,
              value: size?._id,
            }));

          setSizes(productSizeData);
        } else {
          setSizes([]);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, allProductSizeData?.length]);

  const handleAddField = (e, name) => {
    e.preventDefault();

    if (name === 'colors') {
      setFieldCount(fieldCount + 1);

      const allColorsObject = [
        ...colors,
        {
          id: fieldCount + 1,
        },
      ];

      setColors(allColorsObject);
    }
  };

  const handleRemoveField = (e, name) => {
    if (fieldCount > 0 && name === 'colors') {
      setFieldCount(fieldCount - 1);
      const newArray = colors.slice(0, colors.length - 1);
      setColors(newArray);
    }
    if (name === 'rmvImg' && e !== undefined) {
      const newArray = formData.images.filter((d, idx) => {
        return idx !== e;
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        images: newArray,
      }));
    }
  };

  const handleChooseColors = (value, index) => {
    const updatedColors = colors.map((col) => {
      if (col.id === index) {
        return { ...col, color: value };
      }
      return col;
    });
    setColors(updatedColors);
    setFormData((prevData) => ({
      ...prevData,
      colors: updatedColors,
    }));

    setErrors((prevData) => ({
      ...prevData,
      colors: null,
    }));
  };

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData?.images ? [...prevFormData.images, ...files] : files,
    }));

    setErrors((prevData) => ({
      ...prevData,
      images: '',
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: '',
    }));
  };

  const renderFields = () => {
    const fields = [];
    for (let i = 0; i < fieldCount + 1; i++) {
      fields.push(
        <React.Fragment key={i}>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor={`colorsInput${i}`} className="form-label">
                Colors
              </Label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Color Code/Name"
                id={`colorsInput${i}`}
                // value={formData?.colors[i].value}
                onChange={(e) => handleChooseColors(e.target.value, i)}
              />
              {errors?.colors && (
                <div className="text-danger fs-3 mt-2">{errors?.colors}</div>
              )}
            </div>
          </Col>
          <Col lg={3}>
            <div className="d-flex flex-column text-nowrap fs-4">
              <p>
                {colors[i].color &&
                /^#([0-9A-F]{3}){1,2}$/i.test(colors[i].color)
                  ? ColorNamer(colors[i].color).ntc[0].name
                  : 'Name'}
              </p>
              <div
                className="rounded-circle"
                style={{
                  backgroundColor: colors ? colors[i].color : '',
                  width: '45px',
                  height: '45px',
                  border: '1px solid black',
                  marginTop: '10px',
                }}
              ></div>
            </div>
          </Col>
        </React.Fragment>
      );
    }
    return fields;
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: '',
    }));
  };

  const togOpenCategoryModal = () => {
    setOpenCategoryModal(!openCategoryModal);
  };

  const togOpenSizeModal = () => {
    setOpenSizeModal(!openSizeModal);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    const addCategoryData = {
      name: formData?.category_name,
      status: formData?.status,
    };

    const newErrors = {};

    if (!formData?.category_name) {
      newErrors.category_name = 'Category Name is required';
    }

    if (!formData?.status) {
      newErrors.status = 'Status is required';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addShopCategory(addCategoryData)).then((res) => {
        if (res.error) {
          toast.error('Something Went Wrong.Please Try Again');
        } else {
          dispatch(allShopCategory());
          toast.success('Category Added Successfully');
          togOpenCategoryModal();
        }
      });
    } else {
      setErrors(newErrors);
    }
  };
  const handleAddSize = (e) => {
    e.preventDefault();

    const addSizeData = {
      name: formData?.size_name,
      status: formData?.status,
    };

    const newErrors = {};

    if (!formData?.size_name) {
      newErrors.size_name = 'Size Name is required';
    }

    if (!formData?.status) {
      newErrors.status = 'Status is required';
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(addProductSize(addSizeData)).then((res) => {
        if (res.error) {
          toast.error('Something Went Wrong.Please Try Again');
        } else {
          dispatch(allProductSize());
          toast.success('Size Added Successfully');
          togOpenSizeModal();
        }
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card className="my-4">
        <CardHeader className="card-title fs-2 fw-semibold">{title}</CardHeader>
        <CardBody className="px-5 py-4">
          <Form>
            <Row>
              <Col lg={5}>
                <div className="mb-3">
                  <Label htmlFor="titleInput" className="form-label">
                    Title
                  </Label>
                  <span className="text-danger">*</span>
                  <Input
                    name="title"
                    type="text"
                    value={formData?.title}
                    className="form-control"
                    id="titleInput"
                    placeholder="Enter your Title"
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                  {errors?.title && (
                    <div className="text-danger fs-3 mt-2">{errors?.title}</div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="salePriceInput" className="form-label">
                    Sale Price
                  </Label>
                  <Input
                    name="sale_price"
                    type="number"
                    value={formData?.sale_price}
                    className="form-control"
                    id="salePriceInput"
                    placeholder="Enter Sale Price"
                    onChange={(e) =>
                      handleInputChange('sale_price', e.target.value)
                    }
                  />
                  {errors?.sale_price && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.sale_price}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label htmlFor="costPriceInput" className="form-label">
                    Cost Price
                  </Label>
                  <Input
                    name="cost_price"
                    type="number"
                    value={formData?.cost_price}
                    className="form-control"
                    id="costPriceInput"
                    placeholder="Enter Cost Price"
                    onChange={(e) =>
                      handleInputChange('cost_price', e.target.value)
                    }
                  />
                  {errors?.cost_price && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.cost_price}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="descriptionInput" className="form-label">
                    Description
                  </Label>
                  {/* <span className="text-danger">*</span> */}
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData?.description}
                    id="descriptionTextarea"
                    rows="15"
                    placeholder="Enter Description"
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                  ></textarea>

                  {errors?.description && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.description}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor={`imageInput`} className="form-label">
                    Product Image
                    <small className="mb-2 fs-10 text-danger me-3">
                      (Max. 300px X 300px, Max. 2MB, valid exts: png, jpg, jpeg)
                    </small>
                  </label>
                  <span className="mb-4 fs-3 text-danger text-center">
                    {formData?.images?.length > 5 && (
                      <div>You can only upload a maximum of 5 images</div>
                    )}
                  </span>
                  <Input
                    name="images"
                    id={`imageInput`}
                    type="file"
                    className="profile-img-file-input"
                    onChange={handleSelectImages}
                    multiple
                  />
                  {errors?.images && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.images}
                    </div>
                  )}
                  <div className="d-flex flex-wrap gap-4 ">
                    {formData?.images?.length > 0 &&
                      formData?.images.slice(0, 5).map((img, key) => (
                        <div className="position-relative" key={key}>
                          <span
                            onClick={(e) => handleRemoveField(key, 'rmvImg')}
                            style={{ cursor: 'pointer' }}
                            className="position-absolute text-danger top-0 end-0 mt-2"
                          >
                            <i className="ri-close-circle-line fs-1 fw-bold"></i>
                          </span>
                          <img
                            className="mt-3"
                            src={
                              img ? URL.createObjectURL(new Blob([img])) : ''
                            }
                            alt="img"
                            style={{ maxHeight: '70px' }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="skuCodeInput" className="form-label">
                    SKU Code
                  </Label>
                  <div className="input-group">
                    <Input
                      name="sku_code"
                      type="text"
                      value={formData?.sku_code}
                      id="skuCodeInput"
                      placeholder="Enter SKU Code"
                      onChange={(e) =>
                        handleInputChange('sku_code', e.target.value)
                      }
                    />
                  </div>
                  {errors?.sku_code && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.sku_code}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="lowStockInput" className="form-label">
                    Low Stock Quantity
                  </Label>
                  <Input
                    name="low_stock_quantity"
                    type="number"
                    value={formData?.low_stock_quantity}
                    className="form-control"
                    id="lowStockInput"
                    placeholder="Enter low Stock Quantity"
                    onChange={(e) =>
                      handleInputChange('low_stock_quantity', e.target.value)
                    }
                  />
                  {errors?.low_stock_quantity && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.low_stock_quantity}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="stovkQuantityInput" className="form-label">
                    Stock Quantity
                  </Label>
                  <Input
                    name="stock_quantity"
                    type="number"
                    value={formData?.stock_quantity}
                    className="form-control"
                    id="stovkQuantityInput"
                    placeholder="Enter Stock Quantity"
                    onChange={(e) =>
                      handleInputChange('stock_quantity', e.target.value)
                    }
                  />
                  {errors?.stock_quantity && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.stock_quantity}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="rrpInput" className="form-label">
                    RRP
                  </Label>
                  <Input
                    name="rrp"
                    type="number"
                    value={formData?.rrp}
                    className="form-control"
                    id="rrpInput"
                    placeholder="Enter RRP"
                    onChange={(e) => handleInputChange('rrp', e.target.value)}
                  />
                  {errors?.rrp && (
                    <div className="text-danger fs-3 mt-2">{errors?.rrp}</div>
                  )}
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="vatInput" className="form-label">
                    VAT(%)
                  </Label>

                  <Input
                    name="vat_percentage"
                    type="number"
                    value={formData?.vat_percentage}
                    className="form-control"
                    id="vatInput"
                    placeholder="Enter Vat Percentage"
                    onChange={(e) =>
                      handleInputChange('vat_percentage', e.target.value)
                    }
                  />
                  {errors?.vat_percentage && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.vat_percentage}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label htmlFor="vatInput" className="form-label">
                    Status
                  </Label>

                  <select
                    name="status"
                    placeholder="Please Select"
                    id="allMebmersInput"
                    value={formData?.status}
                    className="form-select mb-3"
                    onChange={(e) =>
                      handleInputChange('status', e.target.value)
                    }
                  >
                    <option value="">Please Select</option>
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </select>
                  {errors?.status && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.status}
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <Row>
                  {renderFields()}
                  <Col lg={3} className="d-flex justify-content-center mt-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={(e) => handleAddField(e, 'colors')}
                        className="btn-action d-flex align-items-center justify-content-center fs-1 fw-semibold third-btn"
                      >
                        +
                      </div>
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={(e) => handleRemoveField(e, 'colors')}
                        className="btn-action d-flex align-items-center justify-content-center fs-1 fw-semibold third-btn"
                      >
                        -
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col lg={4}>
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center justify-content-between pb-2">
                    <Label htmlFor="sizesInput" className="form-label">
                      Sizes
                      <span className="text-danger">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={togOpenSizeModal}
                      className="third-btn fs-4 fw-semibold"
                    >
                      Add Size
                    </button>
                  </div>
                  <Select
                    options={sizes}
                    placeholder="Please Select"
                    id="sizesInput"
                    name="sizes"
                    value={formData?.sizes}
                    className="mb-3"
                    isMulti
                    onChange={(value) => handleInputChange('sizes', value)}
                  />
                  {errors?.sizes && (
                    <div className="text-danger fs-3 mt-2">{errors?.sizes}</div>
                  )}
                </div>
              </Col>
              <Col lg={4}>
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center justify-content-between pb-2">
                    <Label htmlFor="categoryInput" className="form-label">
                      Category
                      <span className="text-danger">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={togOpenCategoryModal}
                      className="third-btn fs-4 fw-semibold"
                    >
                      Add Category
                    </button>
                  </div>
                  <Select
                    options={category}
                    placeholder="Please Select"
                    id="allMembersInput"
                    name="category"
                    value={formData?.category}
                    className="mb-3"
                    onChange={(value) => handleInputChange('category', value)}
                  />
                  {errors?.category && (
                    <div className="text-danger fs-3 mt-2">
                      {errors?.category}
                    </div>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={loading}
                      name="vanue"
                      value={formData?.vanue}
                      type="button"
                      className="button p-3 text-light"
                      onClick={submitHandler}
                    >
                      {submitBtn}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
          {/* category modal */}
          {
            <ShopCategoryModal
              open={openCategoryModal}
              close={togOpenCategoryModal}
              onChangeHandler={onChangeHandler}
              handleSubmit={handleAddCategory}
              loading={addShopCategoryIsLoading}
              errors={errors}
              setFormData={setFormData}
              formData={formData}
            />
          }

          {/* size modal */}
          {
            <ProductSizeModal
              open={openSizeModal}
              close={togOpenSizeModal}
              onChangeHandler={onChangeHandler}
              handleSubmit={handleAddSize}
              loading={addProductSizeIsLoading}
              errors={errors}
              setFormData={setFormData}
              formData={formData}
            />
          }
        </CardBody>
      </Card>
    </>
  );
};

export default ProductFormModal;
