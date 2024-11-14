import {
  bgPrimary,
  bgSecondary,
} from '@/components/constants/utils/themeUtils';
import { getAllNoticesAction } from '@/slices/dashboard/adminDashboard/Actions/noticeActions';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const trainingSchedulesdummy = [
  {
    id: 1,
    name: 'Training Season',
    vanue: 'Suncorp Stadium, Australia',
    date: '2020-01-01',
    from: '10:00 AM',
    to: '11:00 PM',
  },
  {
    id: 2,
    name: 'Training Season',
    vanue: 'Suncorp Stadium, Australia',
    date: '2020-01-01',
    from: '10:00 AM',
    to: '11:00 PM',
  },
];

export default function HomeNoticeBoard({ trainingSchedules }) {
  const [subdomain, setSubdomain] = React.useState('');

  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    setSubdomain(themeData?.subdomain);
  }, [dispatch, themeData?.subdomain]);

  const {
    data: noticeData,
    isLoading: isNoticeDataLoading,
    error: noticeDataError,
  } = useSelector((state) => state.AdminDashboard.allNotices);

  useEffect(() => {
    dispatch(getAllNoticesAction({ subdomain }));
  }, [dispatch, subdomain]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    const textContent = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  //console.log(noticeData);

  // const isImageFile = (filePath) => {
  //   return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  // };

  // const isPdfOrDocFile = (filePath) => {
  //   return /\.(pdf|doc|docx)$/i.test(filePath);
  // };

  const getFileType = (filePath) => {
    if (/\.(jpg|jpeg|png|gif)$/i.test(filePath)) {
      return 'image';
    } else if (/\.(pdf|doc|docx)$/i.test(filePath)) {
      return 'pdfOrDoc';
    } else {
      return 'other';
    }
  };

  return (
    <section className="home-notice notice-area">
      <div
        className="notice-bg-right"
        style={{
          backgroundImage: `url(${'/template1/assets/img/notice-bg-left.png'})`,
        }}
      ></div>
      <div className="container">
        <div className="notice-board-content">
          <div className="content-left">
            <div className="notice-board" style={bgSecondary(themeData)}>
              <div className="notice-board-header">
                <div className="nb-heading" style={bgPrimary(themeData)}>
                  <h3>Team Notice Board</h3>
                </div>
                <Link href="/notice/archive">
                  <span>View All</span>
                  <svg
                    width=".9rem"
                    height="1.4rem"
                    viewBox="0 0 9 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.989227 11.9972L2.07716 13.0851L8.16222 7.00007L2.07716 0.915009L0.989227 2.00294L5.98635 7.00007L0.989227 11.9972Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
              <div className="notice-board-body">
                {noticeData?.length > 0
                  ? [...noticeData]
                      ?.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .slice(0, 3)
                      .map((notice, i) => {
                        return (
                          <div className="notice-single" key={i}>
                            <div className="notice-single-img">
                              <img
                                src={
                                  notice?.attachment?.uploadedImage &&
                                  getFileType(
                                    notice?.attachment?.uploadedImage
                                  ) === 'image'
                                    ? notice?.attachment?.uploadedImage
                                    : '/template1/assets/img/notice-single-img.png'
                                }
                                alt={notice?.title}
                              />
                            </div>
                            <div className="notice-single-content">
                              <div className="notice-data-link">
                                <div className="notice-publish-date">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 35 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M27.75 16.9702C28.4141 17.4373 29.0062 17.9671 29.5264 18.5596C30.0465 19.152 30.4948 19.8014 30.8711 20.5078C31.2474 21.2142 31.5241 21.9604 31.7012 22.7466C31.8783 23.5327 31.9779 24.3359 32 25.1562C32 26.512 31.751 27.7881 31.2529 28.9844C30.7549 30.1807 30.0687 31.2231 29.1943 32.1118C28.32 33.0005 27.3073 33.7012 26.1562 34.2139C25.0052 34.7266 23.7656 34.9886 22.4375 35C21.4303 35 20.4564 34.8462 19.5156 34.5386C18.5749 34.231 17.7116 33.7866 16.9258 33.2056C16.14 32.6245 15.4427 31.9295 14.834 31.1206C14.2253 30.3117 13.7549 29.4173 13.4229 28.4375H0.125V2.1875H4.375V0H6.5V2.1875H21.375V0H23.5V2.1875H27.75V16.9702ZM2.25 4.375V8.75H25.625V4.375H23.5V6.5625H21.375V4.375H6.5V6.5625H4.375V4.375H2.25ZM12.9248 26.25C12.8916 25.8968 12.875 25.5322 12.875 25.1562C12.875 24.1764 13.0078 23.2251 13.2734 22.3022C13.5391 21.3794 13.943 20.5078 14.4854 19.6875H12.875V17.5H15V18.9697C15.4538 18.3887 15.9574 17.876 16.5107 17.4316C17.0641 16.9873 17.6618 16.6056 18.3037 16.2866C18.9456 15.9676 19.6152 15.7284 20.3125 15.5688C21.0098 15.4093 21.7181 15.3239 22.4375 15.3125C23.5443 15.3125 24.6068 15.5005 25.625 15.8765V10.9375H2.25V26.25H12.9248ZM22.4375 32.8125C23.4668 32.8125 24.4297 32.6131 25.3262 32.2144C26.2227 31.8156 27.0085 31.2687 27.6836 30.5737C28.3587 29.8787 28.89 29.0698 29.2773 28.147C29.6647 27.2241 29.8639 26.2272 29.875 25.1562C29.875 24.0967 29.6813 23.1055 29.2939 22.1826C28.9066 21.2598 28.3753 20.4508 27.7002 19.7559C27.0251 19.0609 26.2393 18.514 25.3428 18.1152C24.4463 17.7165 23.4779 17.5114 22.4375 17.5C21.4082 17.5 20.4453 17.6994 19.5488 18.0981C18.6523 18.4969 17.8665 19.0438 17.1914 19.7388C16.5163 20.4338 15.985 21.2427 15.5977 22.1655C15.2103 23.0884 15.0111 24.0853 15 25.1562C15 26.2158 15.1937 27.207 15.5811 28.1299C15.9684 29.0527 16.4997 29.8617 17.1748 30.5566C17.8499 31.2516 18.6357 31.7985 19.5322 32.1973C20.4287 32.596 21.3971 32.8011 22.4375 32.8125ZM23.5 24.0625H26.6875V26.25H21.375V19.6875H23.5V24.0625ZM4.375 17.5H6.5V19.6875H4.375V17.5ZM8.625 17.5H10.75V19.6875H8.625V17.5ZM8.625 13.125H10.75V15.3125H8.625V13.125ZM8.625 21.875H10.75V24.0625H8.625V21.875ZM15 15.3125H12.875V13.125H15V15.3125ZM19.25 15.3125H17.125V13.125H19.25V15.3125ZM4.375 13.125H6.5V15.3125H4.375V13.125Z"
                                      fill="var(--color--secondary)"
                                    />
                                  </svg>
                                  <span className="fs-14 my-1 fw-normal">
                                    Published:{' '}
                                    {new Date(notice?.date).toDateString(
                                      'en-GB',
                                      {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                      }
                                    )}
                                  </span>
                                </div>
                                {getFileType(
                                  notice?.attachment?.uploadedImage
                                ) === 'pdfOrDoc' && (
                                  <div className="notice-link">
                                    <a href={notice?.attachment?.uploadedImage}>
                                      <svg
                                        width="14"
                                        height="22"
                                        viewBox="0 0 14 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M13 4.25581V15.5C13 18.5376 10.3137 21 7 21C3.68629 21 1 18.5376 1 15.5V4.66667C1 2.64162 2.79086 1 5.00004 1C7.20913 1 8.99996 2.64162 8.99996 4.66667V15.4457C8.99996 16.4583 8.10455 17.2791 7 17.2791C5.89545 17.2791 5.00004 16.4583 5.00004 15.4457V5.65116"
                                          stroke="var(--color--secondary)"
                                          strokeWidth="1.8"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </a>
                                  </div>
                                )}
                              </div>
                              <h4>{notice?.title} </h4>
                              <div
                                className="notice-desc"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    truncateText(notice?.content, 50)
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                  : null}
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="notice-text-content">
              <h2>One team, One dream.</h2>
              <p>
                Working as a team is crucial for success, and during team
                training, it's important to motivate and inspire each other.
                Together, we can achieve more than we can alone, and it's
                essential to support and encourage one another to reach our full
                potential. Success is not just about individual accomplishments,
                but what we can achieve as a team. It's not going to be easy,
                but with hard work, dedication, and teamwork, we can overcome
                any challenges that come our way. Let's strive for excellence
                together and give it our all during this training. Remember, we
                are not just training as individuals, but as a team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="notice-bg-left"
        style={{
          backgroundImage: `url(${'/template1/assets/img/hero_bg.png'})`,
        }}
      ></div>
    </section>
  );
}
