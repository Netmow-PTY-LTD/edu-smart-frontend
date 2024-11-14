import {
  bgPrimary,
  bgSecondary,
} from '@/components/constants/utils/themeUtils';
import React from 'react';
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

export default function HomeTrainingSchedule({ trainingSchedules }) {
  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <section className="home-notice home-training-schedule">
      <div
        className="notice-bg-left"
        style={{
          backgroundImage: `url(${
            themeData.sports_category === 'Basketball'
              ? '/template1/assets/img/basketball/notice_bg_csb.png'
              : themeData.sports_category === 'Football'
                ? '/template1/assets/img/football/notice_bg2_football.jpg'
                : themeData.sports_category === 'Cricket'
                  ? '/template1/assets/img/cricket/notice_bg.png'
                  : themeData.sports_category === 'Volleyball'
                    ? '/template1/assets/img/volleyball/notice_bg.jpg'
                    : themeData.sports_category === 'Baseball'
                      ? '/template1/assets/img/baseball/notice_bg.png'
                      : themeData.sports_category === 'Netball'
                        ? '/template1/assets/img/netball/notice_bg.png'
                        : '/template1/assets/img/notice_bg.png'
          })`,
        }}
      ></div>
      <style>
        {`
        .home-training-schedule .notice-single::after{
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 1rem;
        }
        `}
      </style>
      <div className="container">
        <div className="notice-board-content">
          <div className="content-left">
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
          <div className="content-right">
            <div className="notice-board" style={bgSecondary(themeData)}>
              <div className="notice-board-header">
                <div className="nb-heading" style={bgPrimary(themeData)}>
                  <h3>Training Schedules</h3>
                </div>
                {/* <a href="#">
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
                </a> */}
              </div>
              <div className="notice-board-body">
                {(trainingSchedules && trainingSchedules.length > 0
                  ? trainingSchedules
                  : trainingSchedulesdummy
                )?.map((schedule, index) => (
                  <div
                    key={index}
                    className="notice-single"
                    style={bgSecondary(themeData)}
                  >
                    <div className="notice-single-text">
                      {Array.isArray(schedule?.date) &&
                        schedule.date.length > 0 &&
                        schedule.date.map((d, i) => (
                          <div key={i}>
                            <span className="fs-14 my-1 fw-normal text-white">{`${new Date(d?.date).toLocaleDateString()} `}</span>{' '}
                            <br />
                            <span className="fs-14 my-1 fw-normal text-white mb-4 d-inline-block">{`From ${d?.start_time} to ${d?.end_time}`}</span>
                          </div>
                        ))}

                      {/* {Array.isArray(schedule?.date) &&
                        schedule.date.length > 0 &&
                        schedule.date.map((d, i) => (
                          <div key={i}>
                            <h5 className="fs-14 my-1 fw-normal">{`${d?.start_time} `}</h5>
                            <span className="mx-1">To</span>
                            <h5 className="fs-14 my-1 fw-normal">{`${d?.end_time} `}</h5>
                          </div>
                        ))} */}
                    </div>
                    <div className="notice-time-date">
                      <div className="notice-time-date-inner">
                        <div className="date">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="#fff"
                              d="M12.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m5 .5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-13 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 9.25C6 8.56 6.56 8 7.25 8h5.5c.69 0 1.25.56 1.25 1.25V14a4 4 0 0 1-8 0zm-1 0c0-.463.14-.892.379-1.25H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 0 0 3.404 2.973A4.983 4.983 0 0 1 5 14zM15 14c0 .7-.144 1.368-.404 1.973A3 3 0 0 0 18 13V9.25C18 8.56 17.44 8 16.75 8h-2.129c.24.358.379.787.379 1.25z"
                            ></path>
                          </svg>
                          <span>{schedule.name}</span>
                        </div>
                        <div className="time">
                          <svg
                            width="20"
                            height="25"
                            viewBox="0 0 20 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.3618 0.899414C7.85855 0.902353 5.45865 1.89334 3.68857 3.655C1.91849 5.41665 0.922763 7.80512 0.91981 10.2965C0.916812 12.3324 1.58503 14.3131 2.82195 15.9347C2.82195 15.9347 3.07946 16.2722 3.12152 16.3208L10.3618 24.8192L17.6056 16.3166C17.6433 16.2713 17.9017 15.9347 17.9017 15.9347L17.9026 15.9322C19.1389 14.3113 19.8068 12.3315 19.8038 10.2965C19.8009 7.80512 18.8052 5.41665 17.0351 3.655C15.265 1.89334 12.8651 0.902353 10.3618 0.899414ZM10.3618 13.7136C9.68275 13.7136 9.01893 13.5132 8.4543 13.1377C7.88967 12.7622 7.44959 12.2285 7.18972 11.6041C6.92985 10.9798 6.86186 10.2927 6.99434 9.62983C7.12682 8.96698 7.45382 8.3581 7.934 7.88021C8.41418 7.40232 9.02596 7.07687 9.69199 6.94502C10.358 6.81317 11.0484 6.88084 11.6758 7.13947C12.3031 7.39811 12.8394 7.83609 13.2166 8.39803C13.5939 8.95997 13.7953 9.62064 13.7953 10.2965C13.7941 11.2024 13.432 12.0709 12.7884 12.7115C12.1447 13.3521 11.2721 13.7125 10.3618 13.7136Z"
                              fill="white"
                            ></path>
                          </svg>
                          <span>{schedule.vanue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="notice-bg-right"
        style={{
          backgroundImage: `url(${
            themeData.sports_category === 'Basketball'
              ? '/template1/assets/img/basketball/notice_bg.png'
              : themeData.sports_category === 'Football'
                ? '/template1/assets/img/football/notice_bg2_football.jpg'
                : themeData.sports_category === 'Cricket'
                  ? '/template1/assets/img/cricket/notice_bg2.png'
                  : '/template1/assets/img/notice-bg2.png'
          })`,
        }}
      ></div>
    </section>
  );
}
