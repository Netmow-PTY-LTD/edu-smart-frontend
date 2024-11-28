/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Chatbox = ({ type, data, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [pusherMessages, setPusherMessages] = useState([]);

  const {
    data: userData,
    isLoading,
    error,
  } = useSelector((state) => state.AdminDashboard.userInfo);

  useEffect(() => {
    const fetchAllMessges = async (id) => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/chats/' + id,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${Cookies.get('token')}`,
          },
        }
      );
      if (res?.data) {
        setPusherMessages(res?.data);
      }
    };
    fetchAllMessges(data?._id);
  }, [data?._id]);

  useEffect(() => {
    const channel = Pusher.subscribe(`chat_${data?._id}`);
    channel.bind('message', (data) => {
      setPusherMessages((prevComments) => [...prevComments, data]);
    });

    return () => {
      channel.unbind();
      Pusher.unsubscribe('message');
    };
  }, [data?._id, pusherMessages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = async () => {
    await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_PROD + '/api/v1/message/send/',
      {
        chat_id: data?._id,
        text: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${Cookies.get('token')}`,
        },
      }
    );
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  useEffect(() => {
    const chatboxElement = document.querySelector('.sd-chatbox-frame-inner');
    if (chatboxElement) {
      chatboxElement.scrollTop = chatboxElement.scrollHeight;
    }
  }, [pusherMessages]);

  return (
    <div className="sd-chatbox">
      <div className="sd-chatbox-head">
        {type === 'user' ? (
          <div className="sdcb-head-info">
            <div className="sdc-single-avater">
              <img
                src={
                  userData?.role === 'admin'
                    ? data?.user?.profile_image?.uploadedImage
                    : data?.created_by?.profile_image?.uploadedImage
                      ? data?.created_by?.profile_image?.uploadedImage
                      : '/assets/images/users/user-dummy-img.jpg'
                }
                alt={
                  userData?.role === 'admin'
                    ? data?.user?.first_name
                    : data?.created_by?.first_name
                }
              />
              <div className="sdc-single-status online"></div>
            </div>
            <div className="sdcb-head-info-name">
              <h4>
                <span>
                  {userData?.role === 'admin'
                    ? data?.user?.first_name + ' ' + data?.user?.last_name
                    : data?.created_by?.first_name +
                      ' ' +
                      data?.created_by?.last_name}
                </span>
                <div className="icon">
                  <svg
                    width="9"
                    height="5"
                    viewBox="0 0 9 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L4.5 4.5L8 1"
                      stroke="white"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </h4>
              <div className="sdcb-head-info-stat">Active Now</div>
            </div>
          </div>
        ) : (
          <div className="sdcb-head-info">
            <div className="sdc-single-avater">
              <img
                src={
                  data?.user?.profile_image?.uploadedImage ||
                  data?.team?.image?.uploadedImage
                }
                alt={data?.user?.first_name || data?.team?.name || 'user'}
              />
              <div className="sdc-single-status online"></div>
            </div>
            <div className="sdcb-head-info-name">
              <h4>
                <span>
                  {data?.user
                    ? data?.user?.first_name + ' ' + data?.user?.last_name
                    : data?.team?.name}
                </span>
                <div className="icon">
                  <svg
                    width="9"
                    height="5"
                    viewBox="0 0 9 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L4.5 4.5L8 1"
                      stroke="white"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </h4>
              <div className="sdcb-head-info-stat">Active Now</div>
            </div>
          </div>
        )}

        <a
          href="#"
          className="sdcb-head-close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 16.49L8.745 8.745L16.49 16.49M16.49 1L8.74352 8.745L1 1"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <div className="sd-chatbox-frame">
        <div className="sd-chatbox-frame-inner">
          {pusherMessages.map((message, index) => {
            const date = new Date(message.createdAt);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';

            // Convert hours to 12-hour format
            const formattedHours = hours % 12 || 12;
            // Pad minutes with leading zero if necessary
            const formattedMinutes = minutes.toString().padStart(2, '0');

            const time = `${formattedHours}:${formattedMinutes} ${period}`;

            return (
              <>
                {userData?._id === message?.user?._id ? (
                  <div
                    className="sd-chatbox-line sd-chatbox-line-right"
                    key={index}
                  >
                    <div className="avater">
                      <img
                        src={
                          message?.user.profile_image?.uploadedImage
                            ? message?.user.profile_image?.uploadedImage
                            : '/assets/images/users/user-dummy-img.jpg'
                        }
                        alt={
                          message?.user?.first_name ||
                          data?.team?.name ||
                          'user'
                        }
                      />
                    </div>
                    <div className="sd-chatbox-message">
                      <div className="sdcm-time">{time}</div>
                      <div className="sdcm-text">{message?.text}</div>
                    </div>
                  </div>
                ) : (
                  <div className="sd-chatbox-line" key={index}>
                    <div className="avater">
                      <img
                        src={
                          message?.user.profile_image?.uploadedImage
                            ? message?.user.profile_image?.uploadedImage
                            : '/assets/images/users/user-dummy-img.jpg'
                        }
                        alt={
                          message?.user?.first_name ||
                          data?.team?.name ||
                          'user'
                        }
                      />
                    </div>
                    <div className="sd-chatbox-message">
                      <div className="sdcm-time">{time}</div>
                      <div className="sdcm-text">{message?.text}</div>
                      <div className="sccm-stst">Seen</div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="sd-chatbox-sent-area">
        <div className="sd-chatbox-sent">
          <input
            type="text"
            className="sdcb-textarea"
            placeholder="Type message here..."
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
          />
          <div className="sdcb-sent-btns">
            <button className="sdcb-send" onClick={handleMessageSend}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.973911 0.0529389C0.887783 0.00980172 0.791028 -0.00753833 0.69528 0.00300359C0.599532 0.0135455 0.508868 0.0515206 0.434188 0.112363C0.359508 0.173205 0.303993 0.254324 0.274318 0.345966C0.244643 0.437607 0.242071 0.53587 0.266911 0.628939L1.76491 6.24694C1.78966 6.33958 1.84053 6.42315 1.91145 6.48769C1.98237 6.55223 2.07035 6.59501 2.16491 6.61094L9.01991 7.75294C9.29891 7.79994 9.29891 8.19994 9.01991 8.24694L2.16591 9.38894C2.07117 9.40469 1.98297 9.4474 1.91186 9.51195C1.84075 9.5765 1.78973 9.66016 1.76491 9.75294L0.266911 15.3709C0.242071 15.464 0.244643 15.5623 0.274318 15.6539C0.303993 15.7456 0.359508 15.8267 0.434188 15.8875C0.508868 15.9484 0.599532 15.9863 0.69528 15.9969C0.791028 16.0074 0.887783 15.9901 0.973911 15.9469L15.9739 8.44694C16.0569 8.40537 16.1266 8.34154 16.1753 8.2626C16.2241 8.18366 16.2499 8.09271 16.2499 7.99994C16.2499 7.90716 16.2241 7.81622 16.1753 7.73728C16.1266 7.65833 16.0569 7.59451 15.9739 7.55294L0.973911 0.0529389Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
