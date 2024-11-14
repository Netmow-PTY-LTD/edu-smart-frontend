/* eslint-disable react/no-unescaped-entities */
import {
  formBuilderAdvancedWidgets,
  formBuilderBasicWidgets,
} from '@/utils/common/data/dashboardEcommerce';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from 'reactstrap';

const FormBuilder = ({
  form_fields,
  setFormField,
  handleAddNewField,
  handleUpdateForm,
}) => {
  return (
    <>
      <Col xl={12}>
        <Col xl={12}>
          <Card>
            <CardHeader
              className=" align-items-center d-flex"
              style={{ backgroundColor: '#F3F3F9' }}
            >
              <CardTitle className="fw-medium mb-0 flex-grow-1 my-2">
                Form Builder
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="grid g-5 p-3">
                <Col xl={4}>
                  <Card className="p-3">
                    {/* Basic Widgets */}
                    <CardHeader className="mb-3 fw-semibold">
                      Basic Widgets
                    </CardHeader>
                    <CardBody>
                      <Row xl={12} className="gap-3 justify-content-center">
                        {(formBuilderBasicWidgets || []).map((item, key) => (
                          <Col
                            key={'key'}
                            style={{ backgroundColor: '#F3F3F9' }}
                            className="p-2 text-center"
                            xl={3}
                            onClick={() => handleAddNewField(item?.label)}
                          >
                            <div className="py-3">
                              <div className="fs-1">
                                <i className={`${item.icon}`}></i>
                              </div>
                              <div className="fs-2">{item.label}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </CardBody>

                    {/* Advanced Widgets */}
                    <CardHeader className="mb-3 fw-semibold">
                      Advanced Widgets
                    </CardHeader>
                    <CardBody>
                      <Row xl={12} className="gap-3 justify-content-center">
                        {(formBuilderAdvancedWidgets || []).map((item, key) => (
                          <Col
                            key={'key'}
                            style={{ backgroundColor: '#F3F3F9' }}
                            className="p-2 text-center"
                            xl={3}
                            onClick={() => handleAddNewField(item?.label)}
                          >
                            <div className="py-3">
                              <div className="fs-1">
                                <i className={`${item.icon}`}></i>
                              </div>
                              <div className="fs-2">{item.label}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </CardBody>

                    {/* update button */}
                    <CardFooter>
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="button p-3 text-light"
                          onClick={handleUpdateForm}
                        >
                          Update
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xl={8}>
                  <Card className="p-4">
                    <Row className="g-5">
                      <CardHeader lg={12} className="mb-3 fw-semibold">
                        Form
                      </CardHeader>
                      {/* form fields  */}
                      {form_fields?.length > 0 &&
                        form_fields?.map((f, i) => (
                          <Col key={i} lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlfor="firstnameInput"
                                className="form-label"
                              >
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder={f?.label}
                                  onBlur={(e) => {
                                    const newFormField = form_fields.map(
                                      (o, u) => {
                                        if (u === i) {
                                          let current = { ...o };
                                          current.label = e?.target?.value;
                                          return current;
                                        } else {
                                          return o;
                                        }
                                      }
                                    );
                                    setFormField(newFormField);
                                  }}
                                />
                              </Label>
                              {f?.type === 'radio' ? (
                                <>
                                  <div>
                                    {/* <label htmlFor={`${f.type + i + 1}`}>
                                      <input
                                        // className="form-check-input"
                                        type={f.type}
                                        id={`${f.type + i + 1}`}
                                        name={`${f.type + i}`}
                                        // value="huey"
                                        checked
                                      />
                                      <input
                                        type="text"
                                        // value={'Enter Option'}
                                        placeholder={f.label}
                                        onBlur={(e) => {
                                          const newFormField = form_fields.map(
                                            (o, u) => {
                                              if (u === i) {
                                                let current = { ...o };
                                                current.label =
                                                  e?.target?.value;
                                                return current;
                                              } else {
                                                return o;
                                              }
                                            }
                                          );
                                          setFormField(newFormField);
                                        }}
                                      />
                                    </label> */}
                                    {f?.option &&
                                      f?.option?.length > 0 &&
                                      f?.option?.map((so, j) => (
                                        <>
                                          <input
                                            type="text"
                                            placeholder={so}
                                            onChange={(e) => {
                                              // setNewTypedOption(e.target.value)
                                              const newOption = f?.option?.map(
                                                (s, l) => {
                                                  if (l === j && s === so) {
                                                    return e.target.value;
                                                  } else {
                                                    return s;
                                                  }
                                                }
                                              );

                                              const newFormField =
                                                form_fields.map((o, u) => {
                                                  if (u === i) {
                                                    let current = { ...o };
                                                    current.option = newOption;
                                                    return current;
                                                  } else {
                                                    return o;
                                                  }
                                                });
                                              setFormField(newFormField);
                                            }}
                                          />
                                          <button
                                            onClick={() => {
                                              const newOption =
                                                f?.option?.filter(
                                                  (s, l) => l !== j
                                                );
                                              const newFormField =
                                                form_fields.map((o, u) => {
                                                  if (u === i) {
                                                    let current = { ...o };
                                                    current.option = newOption;
                                                    return current;
                                                  } else {
                                                    return o;
                                                  }
                                                });
                                              setFormField(newFormField);
                                            }}
                                          >
                                            Remove
                                          </button>
                                          <br />
                                          {(j > f?.option?.length - 2 ||
                                            f?.option?.length <= 0) && (
                                            <>
                                              <button
                                                className=""
                                                onClick={() => {
                                                  let newOption = f?.option;
                                                  newOption = [
                                                    ...newOption,
                                                    'new option',
                                                  ];

                                                  const newFormField =
                                                    form_fields.map((o, u) => {
                                                      if (u === i) {
                                                        let current = { ...o };
                                                        current.option =
                                                          newOption;
                                                        return current;
                                                      } else {
                                                        return o;
                                                      }
                                                    });
                                                  setFormField(newFormField);
                                                }}
                                              >
                                                Add
                                              </button>
                                            </>
                                          )}
                                          <br />
                                        </>
                                      ))}
                                    {f?.option?.length <= 0 && (
                                      <>
                                        <button
                                          className=""
                                          onClick={() => {
                                            let newOption = f?.option;
                                            newOption = [
                                              ...newOption,
                                              'new option',
                                            ];

                                            const newFormField =
                                              form_fields.map((o, u) => {
                                                if (u === i) {
                                                  let current = { ...o };
                                                  current.option = newOption;
                                                  return current;
                                                } else {
                                                  return o;
                                                }
                                              });
                                            setFormField(newFormField);
                                          }}
                                        >
                                          Add
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : f?.type == 'textarea' ? (
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea5"
                                  rows="3"
                                  desabled={true}
                                ></textarea>
                              ) : f?.type == 'select' ? (
                                <div>
                                  <select
                                    className="form-select mb-3"
                                    aria-label="Default select example"
                                    disabled={true}
                                  >
                                    <option value="" selected>
                                      Add some options for select input
                                    </option>
                                  </select>
                                  {f?.option &&
                                    f?.option?.length > 0 &&
                                    f?.option?.map((so, j) => (
                                      <>
                                        <input
                                          type="text"
                                          placeholder={so}
                                          onChange={(e) => {
                                            // setNewTypedOption(e.target.value)
                                            const newOption = f?.option?.map(
                                              (s, l) => {
                                                if (l === j && s === so) {
                                                  return e.target.value;
                                                } else {
                                                  return s;
                                                }
                                              }
                                            );

                                            const newFormField =
                                              form_fields.map((o, u) => {
                                                if (u === i) {
                                                  let current = { ...o };
                                                  current.option = newOption;
                                                  return current;
                                                } else {
                                                  return o;
                                                }
                                              });
                                            setFormField(newFormField);
                                          }}
                                        />
                                        <button
                                          onClick={() => {
                                            const newOption = f?.option?.filter(
                                              (s, l) => l !== j
                                            );
                                            const newFormField =
                                              form_fields.map((o, u) => {
                                                if (u === i) {
                                                  let current = { ...o };
                                                  current.option = newOption;
                                                  return current;
                                                } else {
                                                  return o;
                                                }
                                              });
                                            setFormField(newFormField);
                                          }}
                                        >
                                          Remove
                                        </button>
                                        <br />
                                        {(j > f?.option?.length - 2 ||
                                          f?.option?.length <= 0) && (
                                          <>
                                            <button
                                              className=""
                                              onClick={() => {
                                                let newOption = f?.option;
                                                newOption = [
                                                  ...newOption,
                                                  'new option',
                                                ];

                                                const newFormField =
                                                  form_fields.map((o, u) => {
                                                    if (u === i) {
                                                      let current = { ...o };
                                                      current.option =
                                                        newOption;
                                                      return current;
                                                    } else {
                                                      return o;
                                                    }
                                                  });
                                                setFormField(newFormField);
                                              }}
                                            >
                                              Add
                                            </button>
                                          </>
                                        )}
                                        <br />
                                      </>
                                    ))}
                                  {f?.option?.length <= 0 && (
                                    <>
                                      <button
                                        className=""
                                        onClick={() => {
                                          let newOption = f?.option;
                                          newOption = [
                                            ...newOption,
                                            'new option',
                                          ];

                                          const newFormField = form_fields.map(
                                            (o, u) => {
                                              if (u === i) {
                                                let current = { ...o };
                                                current.option = newOption;
                                                return current;
                                              } else {
                                                return o;
                                              }
                                            }
                                          );
                                          setFormField(newFormField);
                                        }}
                                      >
                                        Add
                                      </button>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <input
                                  type={f?.type}
                                  placeholder={
                                    f?.placeholder ? f?.placeholder : ''
                                  }
                                />
                              )}
                            </div>
                          </Col>
                        ))}
                      <CardFooter className="m-4"></CardFooter>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Col>
    </>
  );
};

export default FormBuilder;
