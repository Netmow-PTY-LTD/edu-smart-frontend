import {
  bgPrimary,
  bgSecondary,
  colorPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import { clientEventsAction } from '@/slices/home/actions/clientEventsActions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const seasonalGames = [
  {
    id: 1,
    name: 'Game 1',
    starts: '21 Mar, 2024',
    vanue: 'Suncorp Stadium, Australia',
    fees: 12,
  },

  {
    id: 1,
    name: 'Game 2',
    starts: '25 Mar, 2024',
    vanue: 'Suncorp Stadium, Australia',
    fees: 12,
  },
];

export default function HomeSeasonalGame({ eventShow, subdomain, eventsId }) {
  const dispatch = useDispatch();

  const [firstElementsData, setFirstElementsData] = useState([]);

  const { data: eventsdata, isLoading: eventsIsLoading } = useSelector(
    (state) => state.Home.clientEvents
  );

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    if (subdomain) {
      dispatch(clientEventsAction(subdomain));
    }
  }, [dispatch, subdomain]);

  useEffect(() => {
    if (eventsdata?.length > 0 || seasonalGames?.length > 0) {
      const foundEvent =
        eventsdata?.length > 0 &&
        eventsdata?.find((singleGame) => singleGame?._id === eventsId);

      if (foundEvent || eventsdata?.length > 0) {
        setFirstElementsData(foundEvent || eventsdata[0]);
      } else if (seasonalGames?.length > 0) {
        setFirstElementsData(seasonalGames[0]);
      }
    }
  }, [eventsId, eventsdata]);

  // console.log(firstElementsData);

  return (
    <section className="home-fixtures">
      <div className="container">
        <div className="sec-heading">
          <h2 style={colorSecondary(themeData)}>Seasonal Game</h2>
        </div>
        <div className="fixtures-content" style={bgSecondary(themeData)}>
          <div className="fixtures-content-left">
            <div
              className="fixtures-content-left-inner"
              style={{
                backgroundImage: "url('template1/assets/img/bg-shape.png')",
              }}
            >
              <h4>Club Fees for Seasonal Games: {firstElementsData?.fees}</h4>

              <div className="match-fixture">
                <div className="team team1">
                  <div
                    className="team-logo team1-logo"
                    style={bgSecondary(themeData)}
                  >
                    {/* <img
                      src="template1/assets/img/team1_logo.png"
                      alt="Team Logo"
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="145"
                      height="150"
                      viewBox="0 0 64 64"
                    >
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M12.7 31.7c-.5 0-1.1-.1-1.5-.4c-1.3-.7-2.9-2.5-2.9-7.3c0-10-5.4-15.8-5.4-15.8l-.9-1L6.7 2l.8 1.2c.1.1 2.6 3.7 6.5 2.7l.5 2.6c-3.9 1-6.7-1.1-8.1-2.6l-1 1.3c1.7 2.2 5.3 8 5.3 16.8c0 2.6.5 4.4 1.5 4.9c.7.4 1.8 0 2.8-1c2.6-2.6 4.5-9 4.5-9l2.2.8c-.1.3-2.1 7.2-5.2 10.2c-1.3 1.2-2.6 1.8-3.8 1.8m38.6 0c.5 0 1.1-.1 1.5-.4c1.3-.7 2.9-2.5 2.9-7.3c0-10.1 5.3-15.8 5.4-15.9l.9-.9L57.3 2l-.8 1.2c-.1.1-2.6 3.7-6.5 2.7l-.5 2.6c3.9 1 6.7-1.1 8.1-2.6l1.2 1.3c-1.7 2.2-5.3 8-5.3 16.8c0 2.6-.5 4.4-1.5 4.9c-.7.4-1.8 0-2.8-1c-2.6-2.6-4.5-9-4.5-9l-2.2.8c.1.3 2.1 7.2 5.2 10.2c1.1 1.2 2.4 1.8 3.6 1.8M29 24.9h6.1v24.5H29z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M30.2 24.9h3.6v24.5h-3.6z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M11.8 2C13.5 17.4 21.9 29.7 32 29.7S50.5 17.4 52.2 2z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M15.7 2c1.4 15.6 8.2 28 16.3 28S46.9 17.6 48.3 2z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M47.6 54H16.4s7-9 15.6-9s15.6 9 15.6 9"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M43.9 54H20.1s5.3-9.2 11.9-9.2S43.9 54 43.9 54"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M11.8 56h40.4v6H11.8z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M16.4 54h31.3v2H16.4z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M22 57.5h20v3H22z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M11.8 56h2v6h-2z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M50.2 56h2v6h-2z"
                      ></path>
                      <path
                        fill={`${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`}
                        d="M23 57.5h18v3H23z"
                      ></path>
                    </svg>
                  </div>
                  <h5 className="team-name">{firstElementsData?.name}</h5>
                </div>
                <div className="team team2">
                  <div className="team-logo team2-logo">
                    {/* <img
                      src="template1/assets/img/team2_logo.png"
                      alt="Team Logo"
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 1024 1536"
                    >
                      <path
                        fill={`${themeData?.branding?.primary_color?.trim() || '#9344E8'}`}
                        d="M768 512q0-106-75-181t-181-75t-181 75t-75 181t75 181t181 75t181-75t75-181m256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19t-67.5-19t-46.5-52L33 691Q0 621 0 512q0-212 150-362T512 0t362 150t150 362"
                      ></path>
                    </svg>
                  </div>
                  <h5 className="team-name">{firstElementsData?.vanue}</h5>
                </div>
              </div>
              <div className="match-schedule" style={bgPrimary(themeData)}>
                <div className="match-time">
                  {/* <svg
                    width="4rem"
                    height="4rem"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6944 16.5556C14.3206 16.5556 14.9212 16.3068 15.364 15.864C15.8068 15.4212 16.0556 14.8206 16.0556 14.1944C16.0556 13.5682 15.8068 12.9677 15.364 12.5249C14.9212 12.0821 14.3206 11.8333 13.6944 11.8333C13.0682 11.8333 12.4677 12.0821 12.0249 12.5249C11.5821 12.9677 11.3333 13.5682 11.3333 14.1944C11.3333 14.8206 11.5821 15.4212 12.0249 15.864C12.4677 16.3068 13.0682 16.5556 13.6944 16.5556ZM13.6944 17.5C14.5711 17.5 15.4119 17.1517 16.0318 16.5318C16.6517 15.9119 17 15.0711 17 14.1944C17 13.3178 16.6517 12.477 16.0318 11.8571C15.4119 11.2371 14.5711 10.8889 13.6944 10.8889C12.8178 10.8889 11.977 11.2371 11.3571 11.8571C10.7371 12.477 10.3889 13.3178 10.3889 14.1944C10.3889 15.0711 10.7371 15.9119 11.3571 16.5318C11.977 17.1517 12.8178 17.5 13.6944 17.5Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6944 12.5417C13.8197 12.5417 13.9398 12.5914 14.0284 12.68C14.1169 12.7685 14.1667 12.8887 14.1667 13.0139V13.999L14.5005 14.3328C14.5865 14.4219 14.6341 14.5412 14.6331 14.665C14.632 14.7888 14.5823 14.9072 14.4948 14.9948C14.4072 15.0823 14.2888 15.132 14.165 15.1331C14.0412 15.1342 13.9219 15.0866 13.8328 15.0005L13.2222 14.39V13.0139C13.2222 12.8887 13.272 12.7685 13.3605 12.68C13.4491 12.5914 13.5692 12.5417 13.6944 12.5417ZM3.77777 8.52779H2.83333V9.47223H3.77777V8.52779ZM2.83333 7.58334C2.58285 7.58334 2.34262 7.68285 2.16551 7.85997C1.98839 8.03708 1.88889 8.27731 1.88889 8.52779V9.47223C1.88889 9.72271 1.98839 9.96294 2.16551 10.1401C2.34262 10.3172 2.58285 10.4167 2.83333 10.4167H3.77777C4.02826 10.4167 4.26848 10.3172 4.4456 10.1401C4.62271 9.96294 4.72222 9.72271 4.72222 9.47223V8.52779C4.72222 8.27731 4.62271 8.03708 4.4456 7.85997C4.26848 7.68285 4.02826 7.58334 3.77777 7.58334H2.83333ZM7.55555 8.52779H6.61111V9.47223H7.55555V8.52779ZM6.61111 7.58334C6.36063 7.58334 6.1204 7.68285 5.94328 7.85997C5.76617 8.03708 5.66666 8.27731 5.66666 8.52779V9.47223C5.66666 9.72271 5.76617 9.96294 5.94328 10.1401C6.1204 10.3172 6.36063 10.4167 6.61111 10.4167H7.55555C7.80603 10.4167 8.04626 10.3172 8.22338 10.1401C8.40049 9.96294 8.5 9.72271 8.5 9.47223V8.52779C8.5 8.27731 8.40049 8.03708 8.22338 7.85997C8.04626 7.68285 7.80603 7.58334 7.55555 7.58334H6.61111ZM11.3333 8.52779H10.3889V9.47223H11.3333V8.52779ZM10.3889 7.58334C10.1384 7.58334 9.89818 7.68285 9.72106 7.85997C9.54395 8.03708 9.44444 8.27731 9.44444 8.52779V9.47223C9.44444 9.72271 9.54395 9.96294 9.72106 10.1401C9.89818 10.3172 10.1384 10.4167 10.3889 10.4167H11.3333C11.5838 10.4167 11.824 10.3172 12.0012 10.1401C12.1783 9.96294 12.2778 9.72271 12.2778 9.47223V8.52779C12.2778 8.27731 12.1783 8.03708 12.0012 7.85997C11.824 7.68285 11.5838 7.58334 11.3333 7.58334H10.3889ZM3.77777 12.3056H2.83333V13.25H3.77777V12.3056ZM2.83333 11.3611C2.58285 11.3611 2.34262 11.4606 2.16551 11.6377C1.98839 11.8149 1.88889 12.0551 1.88889 12.3056V13.25C1.88889 13.5005 1.98839 13.7407 2.16551 13.9178C2.34262 14.095 2.58285 14.1945 2.83333 14.1945H3.77777C4.02826 14.1945 4.26848 14.095 4.4456 13.9178C4.62271 13.7407 4.72222 13.5005 4.72222 13.25V12.3056C4.72222 12.0551 4.62271 11.8149 4.4456 11.6377C4.26848 11.4606 4.02826 11.3611 3.77777 11.3611H2.83333ZM7.55555 12.3056H6.61111V13.25H7.55555V12.3056ZM6.61111 11.3611C6.36063 11.3611 6.1204 11.4606 5.94328 11.6377C5.76617 11.8149 5.66666 12.0551 5.66666 12.3056V13.25C5.66666 13.5005 5.76617 13.7407 5.94328 13.9178C6.1204 14.095 6.36063 14.1945 6.61111 14.1945H7.55555C7.80603 14.1945 8.04626 14.095 8.22338 13.9178C8.40049 13.7407 8.5 13.5005 8.5 13.25V12.3056C8.5 12.0551 8.40049 11.8149 8.22338 11.6377C8.04626 11.4606 7.80603 11.3611 7.55555 11.3611H6.61111Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.944444 3.33332C0.944444 3.20808 0.994196 3.08797 1.08276 2.99941C1.17131 2.91085 1.29143 2.8611 1.41667 2.8611H3.77778V1.91666H1.41667C1.04094 1.91666 0.680609 2.06591 0.414932 2.33159C0.149256 2.59726 0 2.9576 0 3.33332V14.6667C0 15.0424 0.149256 15.4027 0.414932 15.6684C0.680609 15.9341 1.04094 16.0833 1.41667 16.0833H10.9815C10.7801 15.7949 10.6263 15.476 10.5258 15.1389H1.41667C1.29143 15.1389 1.17131 15.0891 1.08276 15.0006C0.994196 14.912 0.944444 14.7919 0.944444 14.6667V3.33332ZM13.2222 10.9219C13.5354 10.8771 13.8534 10.8771 14.1667 10.9219V3.33332C14.1667 2.9576 14.0174 2.59726 13.7517 2.33159C13.4861 2.06591 13.1257 1.91666 12.75 1.91666H11.3333V2.8611H12.75C12.8752 2.8611 12.9954 2.91085 13.0839 2.99941C13.1725 3.08797 13.2222 3.20808 13.2222 3.33332V10.9219ZM4.72222 2.8611H9.71031V1.91666H4.72222V2.8611Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.3889 1.91666H4.72223V3.33332C4.72223 3.45856 4.67248 3.57868 4.58392 3.66723C4.49536 3.75579 4.37525 3.80555 4.25001 3.80555C4.12477 3.80555 4.00465 3.75579 3.9161 3.66723C3.82754 3.57868 3.77778 3.45856 3.77778 3.33332V1.91666H1.41667C1.16619 1.91666 0.925968 2.01616 0.74885 2.19328C0.571733 2.3704 0.472229 2.61062 0.472229 2.8611V5.22221C0.472229 5.47269 0.571733 5.71292 0.74885 5.89003C0.925968 6.06715 1.16619 6.16666 1.41667 6.16666H12.75C13.0005 6.16666 13.2407 6.06715 13.4178 5.89003C13.5949 5.71292 13.6945 5.47269 13.6945 5.22221V2.8611C13.6945 2.61062 13.5949 2.3704 13.4178 2.19328C13.2407 2.01616 13.0005 1.91666 12.75 1.91666H11.3333V3.33332C11.3333 3.45856 11.2836 3.57868 11.195 3.66723C11.1065 3.75579 10.9864 3.80555 10.8611 3.80555C10.7359 3.80555 10.6158 3.75579 10.5272 3.66723C10.4386 3.57868 10.3889 3.45856 10.3889 3.33332V1.91666Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.1667 6.16667H0.944458V5.22223H14.1667V6.16667Z"
                      fill="white"
                    />
                    <path
                      d="M2.83334 0.972222C2.83334 0.846981 2.8831 0.72687 2.97165 0.638311C3.06021 0.549752 3.18032 0.5 3.30557 0.5C3.43081 0.5 3.55092 0.549752 3.63948 0.638311C3.72804 0.72687 3.77779 0.846981 3.77779 0.972222V2.86111C3.77779 2.98635 3.72804 3.10646 3.63948 3.19502C3.55092 3.28358 3.43081 3.33333 3.30557 3.33333C3.18032 3.33333 3.06021 3.28358 2.97165 3.19502C2.8831 3.10646 2.83334 2.98635 2.83334 2.86111V0.972222ZM9.44445 0.972222C9.44445 0.846981 9.49421 0.72687 9.58276 0.638311C9.67132 0.549752 9.79144 0.5 9.91668 0.5C10.0419 0.5 10.162 0.549752 10.2506 0.638311C10.3391 0.72687 10.3889 0.846981 10.3889 0.972222V2.86111C10.3889 2.98635 10.3391 3.10646 10.2506 3.19502C10.162 3.28358 10.0419 3.33333 9.91668 3.33333C9.79144 3.33333 9.67132 3.28358 9.58276 3.19502C9.49421 3.10646 9.44445 2.98635 9.44445 2.86111V0.972222Z"
                      fill="white"
                    />
                  </svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 24 18"
                    fill="white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M16 21V10H21V20C21 20.5523 20.5523 21 20 21H16ZM14 21H4C3.44772 21 3 20.5523 3 20V10H14V21ZM21 8H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V8Z"></path>
                  </svg>
                  <div className="match-date">{firstElementsData?.name}</div>
                  {/* {firstElementsData?.date?.map((d, i) => {
                    return (
                      <div className="match-date" key={i}>
                        {new Date(d.date).toLocaleString()}
                      </div>
                    );
                  })} */}
                  {/* <div className="match-date">
                    {' '}
                    {firstElementsData?.starts_time
                      ? firstElementsData?.starts_time +
                        ' - ' +
                        firstElementsData?.ends_time
                      : ''}
                  </div> */}
                </div>
                <Link
                  href="/auth/login"
                  className="btn-details"
                  style={colorPrimary(themeData)}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
          <div className="fixtures-content-right">
            <div className="fixtures-content-right-inner">
              <h4 style={colorSecondary(themeData)}>Upcoming Seasonal Game</h4>
              <div className="match-results">
                {(eventsdata && eventsdata?.length > 0
                  ? eventsdata
                  : seasonalGames
                )?.map((item, index) => {
                  const dateString =
                    Array.isArray(item?.date) &&
                    item?.date.length > 0 &&
                    item?.date?.map((d, i) => {
                      return d.date;
                    });

                  const dateObject = new Date(dateString);

                  const specificDate = `${dateObject.toLocaleDateString()}`;

                  return (
                    <div
                      style={{
                        cursor: 'pointer',
                      }}
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        eventShow(item?._id);
                      }}
                    >
                      <div className="single-result border border-2 p-4 mb-4">
                        <div className="single-match">
                          <div className="match-info">
                            <div className="tm-logo">
                              {/* <Image
                                src="/template1/assets/img/event-logo.png"
                                alt="Team Logo"
                                width={50}
                                height={60}
                              /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 64 64"
                              >
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M12.7 31.7c-.5 0-1.1-.1-1.5-.4c-1.3-.7-2.9-2.5-2.9-7.3c0-10-5.4-15.8-5.4-15.8l-.9-1L6.7 2l.8 1.2c.1.1 2.6 3.7 6.5 2.7l.5 2.6c-3.9 1-6.7-1.1-8.1-2.6l-1 1.3c1.7 2.2 5.3 8 5.3 16.8c0 2.6.5 4.4 1.5 4.9c.7.4 1.8 0 2.8-1c2.6-2.6 4.5-9 4.5-9l2.2.8c-.1.3-2.1 7.2-5.2 10.2c-1.3 1.2-2.6 1.8-3.8 1.8m38.6 0c.5 0 1.1-.1 1.5-.4c1.3-.7 2.9-2.5 2.9-7.3c0-10.1 5.3-15.8 5.4-15.9l.9-.9L57.3 2l-.8 1.2c-.1.1-2.6 3.7-6.5 2.7l-.5 2.6c3.9 1 6.7-1.1 8.1-2.6l1.2 1.3c-1.7 2.2-5.3 8-5.3 16.8c0 2.6-.5 4.4-1.5 4.9c-.7.4-1.8 0-2.8-1c-2.6-2.6-4.5-9-4.5-9l-2.2.8c.1.3 2.1 7.2 5.2 10.2c1.1 1.2 2.4 1.8 3.6 1.8M29 24.9h6.1v24.5H29z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M30.2 24.9h3.6v24.5h-3.6z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M11.8 2C13.5 17.4 21.9 29.7 32 29.7S50.5 17.4 52.2 2z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M15.7 2c1.4 15.6 8.2 28 16.3 28S46.9 17.6 48.3 2z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M47.6 54H16.4s7-9 15.6-9s15.6 9 15.6 9"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M43.9 54H20.1s5.3-9.2 11.9-9.2S43.9 54 43.9 54"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M11.8 56h40.4v6H11.8z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M16.4 54h31.3v2H16.4z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M22 57.5h20v3H22z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M11.8 56h2v6h-2z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M50.2 56h2v6h-2z"
                                ></path>
                                <path
                                  fill={`${
                                    themeData?.branding?.primary_color?.trim() ||
                                    '#9344E8'
                                  }`}
                                  d="M23 57.5h18v3H23z"
                                ></path>
                              </svg>
                            </div>
                            <div
                              className="tm-name"
                              style={colorSecondary(themeData)}
                            >
                              {item?.name}
                            </div>
                          </div>
                          <div className="number" style={bgPrimary(themeData)}>
                            {firstElementsData?.status}
                            {/* {specificDate} */}
                          </div>
                        </div>
                        <div className="single-match">
                          <div className="match-info">
                            <div className="tm-logo">
                              {/* <Image
                                src="/template1/assets/img/event-location.png"
                                alt="Team Logo"
                                width={50}
                                height={50}
                              /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 1024 1536"
                              >
                                <path
                                  fill={`${themeData?.branding?.primary_color?.trim() || '#9344E8'}`}
                                  d="M768 512q0-106-75-181t-181-75t-181 75t-75 181t75 181t181 75t181-75t75-181m256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19t-67.5-19t-46.5-52L33 691Q0 621 0 512q0-212 150-362T512 0t362 150t150 362"
                                ></path>
                              </svg>
                            </div>
                            <div
                              className="tm-name"
                              style={colorSecondary(themeData)}
                            >
                              {item?.vanue}
                            </div>
                          </div>
                          <div
                            className="number"
                            style={bgSecondary(themeData)}
                          >
                            {item?.fees}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
