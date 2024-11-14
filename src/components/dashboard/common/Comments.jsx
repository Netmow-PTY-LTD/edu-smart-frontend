import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col } from 'reactstrap';

//Import Scrollbar
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useSelector } from 'react-redux';

const Comments = ({
  pusherComments,
  setPusherComments,
  handleSubmitPusherComment,
  setText,
  text,
}) => {
  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  const [messageBox, setMessageBox] = useState(null);

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if ((pusherComments || [])?.length > 1) {
      scrollToBottom();
    }
  }, [pusherComments, scrollToBottom]);

  return (
    <>
      <Col xl={11} className="mt-5">
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <CardTitle className="fw-medium my-3 mx-2 flex-grow-1">
              Comments
            </CardTitle>
          </CardHeader>

          <CardBody className="p-0">
            <div id="users-chat">
              <PerfectScrollbar
                className="chat-conversation p-3 ps-4"
                id="chat-conversation"
                style={{ marginBottom: '1rem', maxHeight: '400px' }}
                containerRef={(ref) => setMessageBox(ref)}
              >
                <ul
                  className="list-unstyled chat-conversation-list chat-sm"
                  id="users-conversation"
                >
                  {(pusherComments || [])?.map((item, key) => (
                    <li
                      className={
                        item.user === userInfoData?._id
                          ? 'chat-list right '
                          : 'chat-list left'
                      }
                      key={key}
                    >
                      <div className="conversation-list">
                        <div className="user-chat-content">
                          {item.user === userInfoData?._id ? (
                            <div className="ctext-wrap">
                              <React.Fragment>
                                <div className="ctext-wrap-content">
                                  <p className="mb-0 ctext-content">
                                    {item?.comment_body}
                                  </p>
                                </div>
                                {/* <UncontrolledDropdown className="align-self-start message-box-drop">
                                  <DropdownToggle tag="a" role="button">
                                    <i className="ri-more-2-fill"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem>
                                      <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                      Reply
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                      Forward
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                      Copy
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                      Bookmark
                                    </DropdownItem>
                                    <DropdownItem className="delete-item">
                                      <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown> */}
                              </React.Fragment>
                              <div className={`chat-avatar `}>
                                <Image
                                  src={
                                    item?.user_avatar
                                      ? item?.user_avatar
                                      : '/assets/images/users/user-dummy-img.jpg'
                                  }
                                  alt={item?.user_name}
                                  width={500}
                                  height={500}
                                />
                                <p className="fs-5">
                                  {item?.user_name
                                    ? item?.user_name
                                    : 'User Name'}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="ctext-wrap">
                              <div className={`chat-avatar `}>
                                <Image
                                  src={
                                    item?.user_avatar
                                      ? item?.user_avatar
                                      : '/assets/images/users/user-dummy-img.jpg'
                                  }
                                  alt={item?.user_name}
                                  width={500}
                                  height={500}
                                />
                                <p className="fs-5">
                                  {item?.user_name
                                    ? item?.user_name
                                    : 'User Name'}
                                </p>
                              </div>
                              <React.Fragment>
                                <div className="ctext-wrap-content">
                                  <p className="mb-0 ctext-content">
                                    {item?.comment_body}
                                  </p>
                                </div>
                                {/* <UncontrolledDropdown className="align-self-start message-box-drop">
                                  <DropdownToggle tag="a" role="button">
                                    <i className="ri-more-2-fill"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem>
                                      <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                      Reply
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                      Forward
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                      Copy
                                    </DropdownItem>
                                    <DropdownItem>
                                      <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                      Bookmark
                                    </DropdownItem>
                                    <DropdownItem className="delete-item">
                                      <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown> */}
                              </React.Fragment>
                            </div>
                          )}

                          {item.user === userInfoData?._id ? (
                            <div
                              className={`d-flex justify-content-end align-items-center gap-2 fs-5`}
                            >
                              {item?.time}
                              <i className="ri-check-double-line fs-2 text-success"></i>
                            </div>
                          ) : (
                            <div
                              className={`d-flex justify-content-start align-items-center gap-2 fs-5`}
                            >
                              <i className="ri-check-double-line fs-2 text-success"></i>
                              {item?.time}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </PerfectScrollbar>
            </div>
            <div className="border-top border-top-dashed">
              <div className="row mx-3 mt-3 mb-4">
                <div className="col">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control border-light bg-light"
                      placeholder="Enter Message..."
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      onKeyDown={(e) =>
                        e.key === 'Enter' ? handleSubmitPusherComment(e) : ''
                      }
                    />
                  </div>
                </div>
                <div className="col-auto d-flex">
                  <button
                    type="submit"
                    className="button p-2 align-items-center text-light "
                    onClick={(e) => handleSubmitPusherComment(e)}
                  >
                    <span className="d-none d-sm-inline-block me-2">Send</span>{' '}
                    <i className="mdi mdi-send float-end"></i>
                  </button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Comments;
