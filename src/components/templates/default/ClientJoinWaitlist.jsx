import { getSubdomainHelperFunction } from '@/slices/helper/getSubdomain';
import { clientWaitlistAction } from '@/slices/home/actions/clientWaitlistAction';
import { emptyClientWaitlist } from '@/slices/home/reducer';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import TemplateLayout from '../TemplateLayout';
import TemplateBanner from './common/TemplateBanner';

import Loader from '@/components/dashboard/common/Loader';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientJoinWaitlist = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    player_first_name: '',
    player_last_name: '',
    player_email: '',
    player_dob: '',
    club_experience: '',
    most_recent_division_played: '',
    guardian_name: '',
    guardian_email: '',
    guardian_phone: '',
    additional_info: '',
  });

  const [playerDobError, setPlayerDobError] = useState(false);

  const {
    data: waitlistData,
    isLoading: waitlistIsLoading,
    error: waitlistError,
  } = useSelector((state) => state.Home.clientWaitlist);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    dispatch(emptyClientWaitlist());
  }, [dispatch]);

  useEffect(() => {
    if (waitlistData?.message && waitlistError === null) {
      toast.success(waitlistData?.message);
      dispatch(emptyClientWaitlist());
      resetWaitlistForm();
    }
    if (waitlistError) {
      toast.error(waitlistError);
    }
  }, [dispatch, waitlistData?.message, waitlistError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlayerDob = (dateStr) => {
    setFormData({
      ...formData,
      player_dob: dateStr,
    });
    setPlayerDobError(false);
  };

  const resetWaitlistForm = () => {
    setFormData({
      player_first_name: '',
      player_last_name: '',
      player_email: '',
      player_dob: '',
      club_experience: '',
      most_recent_division_played: '',
      guardian_name: '',
      guardian_email: '',
      guardian_phone: '',
      additional_info: '',
    });
  };

  const handleWaitlistFormSubmit = (e) => {
    e.preventDefault();
    if (formData.player_dob !== '') {
      const subdomain = getSubdomainHelperFunction();
      const waitistFormData = {
        formData,
        subdomain,
      };
      dispatch(clientWaitlistAction(waitistFormData));
      setPlayerDobError(false);
    } else {
      setPlayerDobError(true);
    }
  };

  console.log(formData);

  return (
    <Fragment>
      <Head>
        <meta
          name="author"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <meta
          property="og:title"
          content={`Join Waitlist | ${themeData?.organisation_name ? themeData?.organisation_name : 'Join Waitlist | SquadDeck'}`}
        />
        <meta
          property="og:description"
          content="Central Stars Basketball Club welcomes junior basketball players aged 5 to 19 and runs teams in all junior-age competitions."
        />
        <meta
          property="og:site_name"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          property="og:image"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <meta
          property=" og:image:secure_url"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <meta
          property="og:image:alt"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          name="twitter:title"
          content={`Join Waitlist | ${themeData?.organisation_name ? themeData?.organisation_name : 'Join Waitlist | SquadDeck'}`}
        />
        <meta
          name="twitter:description"
          content="Central Stars Basketball Club welcomes junior basketball players aged 5 to 19 and runs teams in all junior-age competitions."
        />
        <meta
          name="twitter:image"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <title>{`Join Waitlist | ${themeData?.organisation_name ? themeData?.organisation_name : 'Join Waitlist | SquadDeck'}`}</title>
      </Head>
      <TemplateLayout>
        <TemplateBanner
          title="Join Waitlist"
          subtitle="JOIN WAITLIST"
          bgImage="template1/assets/img/basketball/join_waitlist_bg.jpg"
        />
        <ToastContainer />
        <section className="joinWaitlist">
          <div className="container">
            <form onSubmit={handleWaitlistFormSubmit}>
              <div className="form-content">
                <div className="sd-row">
                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="player_first_name">
                        Player First Name
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="text"
                        id="player_first_name"
                        name="player_first_name"
                        value={formData.player_first_name}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="player_last_name">
                        Player Last name
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="text"
                        id="player_last_name"
                        name="player_last_name"
                        value={formData.player_last_name}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="player_email">
                        Player Email
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="email"
                        id="player_email"
                        name="player_email"
                        value={formData.player_email}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="player_dob">
                        Player Date of Birth
                        <span className="required-indication">*</span>
                      </label>
                      <Flatpickr
                        className="sd-form-control"
                        options={{
                          dateFormat: 'd M, Y',
                        }}
                        value={formData.player_dob}
                        name="player_dob"
                        onChange={(selectedDates, dateStr, instance) =>
                          handlePlayerDob(dateStr)
                        }
                      />
                      {playerDobError && (
                        <div className="error-message">
                          Player date of birth is required
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="sd-form-group">
                      <label htmlFor="club_experience">Club experience</label>
                      <input
                        name="club_experience"
                        value={formData.club_experience}
                        onChange={handleInputChange}
                        id="club_experience"
                        className="sd-form-control"
                      />
                      {/* <select
                        name="club_experience"
                        value={formData.club_experience}
                        onChange={handleInputChange}
                        id="club_experience"
                        className="sd-form-control"
                      >
                        <option value="New to club basketball">
                          New to club basketball
                        </option>
                        <option value="1-2 years club basketball">
                          1-2 years club basketball
                        </option>
                        <option value="3-5 years club basketball1">
                          3-5 years club basketball
                        </option>
                        <option value="6+ years club basketball">
                          6+ years club basketball
                        </option>
                      </select> */}
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="sd-form-group">
                      <label htmlFor="most_recent_division_played">
                        Most recent division played
                      </label>
                      <select
                        name="most_recent_division_played"
                        value={formData.most_recent_division_played}
                        onChange={handleInputChange}
                        id="most_recent_division_played"
                        className="sd-form-control"
                      >
                        <option value="Unknown">Unknown</option>
                        <option value="Division 1">Division 1</option>
                        <option value="Division 2">Division 2</option>
                        <option value="Division 4">Division 4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-100">
                    <div className="sd-form-group">
                      <label htmlFor="guardian_name">
                        Parent / Guardian Name
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="text"
                        id="guardian_name"
                        name="guardian_name"
                        value={formData.guardian_name}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="guardian_email">
                        Guardian Email
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="email"
                        id="guardian_email"
                        name="guardian_email"
                        value={formData.guardian_email}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-50">
                    <div className="sd-form-group">
                      <label htmlFor="guardian_phone">
                        Guardian Phone
                        <span className="required-indication">*</span>
                      </label>
                      <input
                        type="text"
                        id="guardian_phone"
                        name="guardian_phone"
                        value={formData.guardian_phone}
                        onChange={handleInputChange}
                        className="sd-form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-100">
                    <div className="sd-form-group">
                      <label htmlFor="additional_info">
                        Additional information
                      </label>
                      <textarea
                        type="text"
                        rows="10"
                        id="additional_info"
                        name="additional_info"
                        value={formData.additional_info}
                        onChange={handleInputChange}
                        placeholder="Please use this section to supply any further information"
                        className="sd-form-control"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-100 hstack">
                    {waitlistIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        className="btn btn-lg fw-semibold fs-2 px-4 py-2"
                        type="submit"
                        id="subbtn"
                        style={{
                          cursor: 'pointer',
                          backgroundColor: `${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          }`,
                          color: '#fff',
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </TemplateLayout>
    </Fragment>
  );
};

export default ClientJoinWaitlist;
