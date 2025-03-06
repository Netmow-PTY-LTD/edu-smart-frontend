/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';

const Chat = ({ userID }) => {
  const [isActive, setIsActive] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [chatType, setChatType] = useState('user');
  const [chatData, setChatData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userChatList, setUserChatList] = useState([]);
  const [groupChatList, setGroupChatList] = useState([]);
  const [totalMessageCount, setTotalMessageCount] = useState([]);

  // const {
  //   data: userData,
  //   isLoading,
  //   error,
  // } = useSelector((state) => state.AdminDashboard.userInfo);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL_PROD + `/api/v1/chats`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${Cookies.get('token')}`,
            },
          }
        );
        if (res?.data?.length > 0) {
          let userChat = [];
          let groupChat = [];
          res?.data?.map((chat) => {
            if (chat?.user) {
              userChat.push(chat);
            }
            if (chat?.team) {
              groupChat.push(chat);
            }
          });
          setUserChatList(userChat);
          setGroupChatList(groupChat);
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setChatType('user');
    setChatData(user);
    setShowChatbox(true);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setChatType('group');
    setChatData(group);
    setShowChatbox(true);
  };

  const handleChatboxClose = () => {
    setSelectedUser(null);
    setSelectedGroup(null);
    setChatType(null);
    setChatData(null);
    setShowChatbox(false);
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const filteredUsers = userChatList?.filter(
    (user) =>
      user?.user?.first_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user?.user?.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groupChatList?.filter((group) =>
    group?.team?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle message count update

  useEffect(() => {
    const messageCount = userChatList?.reduce((acc, user) => {
      const userMessageCount = user?.message ? user?.message?.length : 0;
      return acc + userMessageCount;
    }, 0);

    setTotalMessageCount(messageCount);
  }, [userChatList]);

  return (
    <>
      <div className={`sdc-sidebar no-print ${isActive ? 'active' : ''} `}>
        <div className="sdc-sidebar-inner">
          <div id="sdctoggle" className="sdc-toggle" onClick={toggleSidebar}>
            <div className="sdc-toggle-line">
              {!isActive ? (
                <div className="sdc-toggle-icon toggle-icon-chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#092a67"
                      d="M5.821 4.91c3.899-2.765 9.468-2.539 13.073.535c3.667 3.129 4.168 8.238 1.152 11.898c-2.841 3.447-7.965 4.583-12.231 2.805l-.233-.101l-4.374.931l-.04.006l-.035.007h-.018l-.022.005h-.038L3.022 21l-.021-.001l-.023.001l-.033-.003H2.91l-.022-.004l-.022-.002l-.035-.007l-.034-.005l-.016-.004l-.024-.005l-.049-.016l-.024-.005l-.011-.005l-.022-.007l-.045-.02l-.03-.012l-.011-.006l-.014-.006l-.031-.018l-.045-.024l-.016-.011l-.037-.026l-.04-.027l-.002-.004l-.013-.009l-.043-.04l-.025-.02l-.006-.007l-.056-.062l-.013-.014l-.011-.014l-.039-.056l-.014-.019l-.005-.01l-.042-.073l-.007-.012l-.004-.008l-.007-.012l-.014-.038l-.02-.042l-.004-.016l-.004-.01l-.017-.061l-.007-.018l-.002-.015l-.005-.019l-.005-.033l-.008-.042l-.002-.031l-.003-.01v-.016L2 20.022l.001-.036l.001-.023l.002-.053l.004-.025v-.019l.008-.035l.005-.034l.005-.02l.004-.02l.018-.06l.003-.013l1.15-3.45l-.022-.037C.969 12.45 1.97 7.806 5.592 5.078z"
                    />
                  </svg>
                  {/* <span className="sdc-toggle-count">
                    {totalMessageCount > 9 ? 9 + '+' : totalMessageCount}
                  </span> */}
                </div>
              ) : (
                <div className="sdc-toggle-icon toggle-icon-close">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 15.99L8.745 8.245L16.49 15.99M16.49 0.5L8.74352 8.245L1 0.5"
                      stroke="#162A73"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="sdc-head-items">
            <h2 className="sdc-con">Chats</h2>
            <div className="sdc-search">
              <form>
                <input
                  type="text"
                  placeholder="Search chat"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.375 9.10937C7.79125 9.10937 9.75 7.19959 9.75 4.84375C9.75 2.48791 7.79125 0.578125 5.375 0.578125C2.95875 0.578125 1 2.48791 1 4.84375C1 7.19959 2.95875 9.10937 5.375 9.10937Z"
                      stroke="#162A73"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.25 11.5469L8.5 7.89062"
                      stroke="#162A73"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="sdc-items-wrap-upper">
            <div className="sdc-items-wrap">
              <div className="sdc-items-head">
                <a className="sdc-ih-title">
                  <span>Direct Message</span>
                </a>
              </div>
              <div className="sdc-items">
                {filteredUsers?.map((user) => {
                  return (
                    <div
                      className="sdc-item-single"
                      key={user._id}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="sdc-single-avater">
                        <img
                          src={
                            'userData'?.role === 'admin' &&
                            user?.user?.profile_image?.uploadedImage
                              ? user?.user?.profile_image?.uploadedImage
                              : 'userData'?.role !== 'admin' &&
                                  user?.created_by?.profile_image?.uploadedImage
                                ? user?.created_by?.profile_image?.uploadedImage
                                : '/assets/images/users/user-dummy-img.jpg'
                          }
                          alt=""
                        />
                        <div className="sdc-single-status online"></div>
                      </div>
                      <div className="sdc-single-name">
                        <div className="sdc-item-name">
                          <span className="sdc-single-name-txt">
                            {'userData'?.role === 'admin'
                              ? user?.user?.first_name
                              : user?.created_by?.first_name}
                          </span>
                          <div className="sdc-single-preview">
                            {'userData'?.role === 'admin'
                              ? user?.user?.role
                              : user?.created_by?.role}
                          </div>
                        </div>
                      </div>
                      <div className="sdc-single-meta">
                        <span className="sdc-single-time">
                          {user?.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sdc-items-head-group">
              <a className="sdc-ih-title">
                <span>Groups</span>
              </a>
            </div>
            <div className="sdc-items-wrap sdc-items-wrap2">
              <div className="sdc-items">
                {filteredGroups?.map((group) => {
                  return (
                    <div
                      className="sdc-item-single"
                      key={group._id}
                      onClick={() => {
                        handleGroupClick(group);
                      }}
                    >
                      <div className="sdc-single-avater">
                        <img
                          src={
                            group?.team?.image?.uploadedImage
                              ? group?.team?.image?.uploadedImage
                              : '/assets/images/users/user-dummy-img.jpg'
                          }
                          alt={group?.team?.name}
                        />
                        <div className="sdc-single-status online"></div>
                      </div>
                      <div className="sdc-single-name">
                        <div className="sdc-item-name">
                          <span className="sdc-single-name-txt">
                            {group?.team?.name}
                          </span>
                          <div className="sdc-single-preview">Group Chat</div>
                        </div>
                      </div>
                      <div className="sdc-single-meta">
                        <span className="sdc-single-time">
                          {group?.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChatbox && (
        <Chatbox type={chatType} data={chatData} onClose={handleChatboxClose} />
      )}
    </>
  );
};

export default Chat;
