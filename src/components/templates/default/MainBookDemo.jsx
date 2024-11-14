import Footer from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
import validator from 'validator';

const MainBookDemo = () => {
  const [gameList, setGameList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [noWebsite, setNoWebsite] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [comment, setComment] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [sport, setSport] = useState('DEFAULT');
  const [companySize, setCompanySize] = useState('1-20');
  const [websiteAndHosting, setWebsiteAndHosting] = useState(false);
  const [teamAndMembership, setTeamAndMembership] = useState(false);
  const [salesAndEcommerce, setSalesAndEcommerce] = useState(false);
  const [teamChatroom, setTeamChatroom] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [teamNameError, setTeamNameError] = useState('');
  const [sportError, setSportError] = useState('');
  const [areaOfInterestError, setAreaOfInterestError] = useState('');
  const [dateTimeError, setDateTimeError] = useState('');

  const getAllGames = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL_PROD + `/public/api/v1/all-games`
      );
      setGameList(res.data);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name == 'firstName') {
      setFirstName(value);
    }
    if (name == 'lastName') {
      setLastName(value);
    }
    if (name == 'phone') {
      setPhone(value);
    }
    if (name == 'email') {
      setEmail(value);
    }
    if (name == 'website') {
      setWebsite(value);
    }
    if (name == 'teamName') {
      setTeamName(value);
    }
    if (name == 'comment') {
      setComment(value);
    }
  };

  const onInputBlur = (event) => {
    const { name, value } = event.target;
    if (name == 'firstName') {
      if (value?.trim() === '') {
        setFirstNameError('First name is required');
      } else {
        setFirstNameError('');
      }
    }
    if (name == 'lastName') {
      if (value?.trim() === '') {
        setLastNameError('Last name is required');
      } else {
        setLastNameError('');
      }
    }
    if (name == 'teamName') {
      if (value?.trim() === '') {
        setTeamNameError('Team name is required');
      } else {
        setTeamNameError('');
      }
    }
    if (name == 'email') {
      if (validator.isEmail(value)) {
        setEmailError('');
      } else {
        setEmailError('Invalid email');
      }
    }
    if (name == 'phone') {
      if (validator.isMobilePhone(value)) {
        setPhoneError('');
      } else {
        setPhoneError('Invalid phone number');
      }
    }
    if (name == 'website' && value?.trim() !== '') {
      if (validator.isURL(value, { protocols: ['http', 'https'] })) {
        setWebsiteError('');
      } else {
        setWebsiteError('Invalid URL');
      }
    }
  };

  const onCompanySizeOptionChange = (event) => {
    setCompanySize(event.target.value);
  };

  const onWebCheckboxChange = (event) => {
    if (event.target.checked) {
      setWebsite('');
    }
    setNoWebsite(!noWebsite);
  };

  const onSportChange = (event) => {
    setSport(event.target.value);
    setSportError('');
  };

  const onAreaInterestCheckboxChange = (event) => {
    if (event.target.name === 'websiteAndHosting') {
      setWebsiteAndHosting(!websiteAndHosting);
    } else if (event.target.name === 'teamAndMembership') {
      setTeamAndMembership(!teamAndMembership);
    } else if (event.target.name === 'salesAndEcommerce') {
      setSalesAndEcommerce(!salesAndEcommerce);
    } else if (event.target.name === 'teamChatroom') {
      setTeamChatroom(!teamChatroom);
    }

    if (event.target.checked) {
      setAreaOfInterestError('');
    }
  };

  const onDateTimeChange = (selectedDates) => {
    let dateObj = new Date(selectedDates[0]);
    setDateTime(dateObj.toISOString());
    setDateTimeError('');
  };

  const resetBookDemoForm = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setWebsite('');
    setNoWebsite(false);
    setTeamName('');
    setSport('DEFAULT');
    setCompanySize('1-20');
    setWebsiteAndHosting(false);
    setTeamAndMembership(false);
    setSalesAndEcommerce(false);
    setTeamChatroom(false);
    setDateTime('');
    setComment('');
  };

  const resetErrors = () => {
    setFirstNameError('');
    setLastNameError('');
    setPhoneError('');
    setEmailError('');
    setWebsiteError('');
    setTeamNameError('');
    setSportError('');
    setAreaOfInterestError('');
    setDateTimeError('');
  };

  const submitBookDemoForm = async (event) => {
    event.preventDefault();

    const formErrors = {};

    if (firstName === '') {
      setFirstNameError('First name is required.');
      formErrors.firstNameError = true;
    }
    if (lastName === '') {
      setLastNameError('Last name is required.');
      formErrors.lastNameError = true;
    }
    if (phone === '') {
      setPhoneError('Phone number is required.');
      formErrors.phoneError = true;
    }
    if (email === '') {
      setEmailError('Email is required.');
      formErrors.emailError = true;
    }
    if (teamName === '') {
      setTeamNameError('Team name is required.');
      formErrors.teamNameError = true;
    }
    if (sport === 'DEFAULT' || sport === '') {
      setSportError('Please select a sport.');
      formErrors.sportError = true;
    }
    if (
      !websiteAndHosting &&
      !teamAndMembership &&
      !salesAndEcommerce &&
      !teamChatroom
    ) {
      setAreaOfInterestError('Please select atleast one area of interest.');
      formErrors.areaOfInterestError = true;
    }
    if (dateTime === '') {
      setDateTimeError('Please select a date and time.');
      formErrors.dateTimeError = true;
    }
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const selectedMoment = moment(dateTime);
    const dateTimeWithTimezone = selectedMoment.toISOString(true);

    const data = {
      firstName,
      lastName,
      phone,
      email,
      website,
      teamName,
      sport,
      companySize,
      websiteAndHosting,
      teamAndMembership,
      salesAndEcommerce,
      teamChatroom,
      dateTime: dateTimeWithTimezone,
      comment,
    };

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL_PROD + '/public/api/v1/book-demo',
        data
      );
      if (res.status == 200) {
        toast.success(res.data.message);
        resetBookDemoForm();
        resetErrors();
      } else {
        if (res.status == 400 || res.status == 404) {
          toast.error(res.data.message);
        }
        if (res.status == 500) {
          toast.error('Something went wrong. Please try again later.');
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <section className="book-demo">
        <div className="container">
          <div className="sd-book-demo-content">
            <div className="sd-book-demo-text">
              <h1>Book A Demo</h1>
              <p>
                Schedule a live demo with one of our product specialists at your
                convenience. We can learn about your requirements, answer
                questions, and review way we can help you and your organization.
                Please submit your information below and we will be in touch
                shortly to setup live demo.
              </p>
            </div>
            <form onSubmit={submitBookDemoForm}>
              <div className="sd-row">
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="sqdk-form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      required
                    />
                    {firstNameError && (
                      <p className="demo-label error-message">
                        {firstNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="sqdk-form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      required
                    />
                    {lastNameError && (
                      <p className="demo-label error-message">
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      className="sqdk-form-control"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      required
                    />
                    {phoneError && (
                      <p className="demo-label error-message">{phoneError}</p>
                    )}
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="sqdk-form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      required
                    />
                    {emailError && (
                      <p className="demo-label error-message">{emailError}</p>
                    )}
                  </div>
                </div>
                <div className="col-100 website-field">
                  <div className="sqdk-form-group w-70">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      className="sqdk-form-control"
                      id="website"
                      name="website"
                      placeholder="Website"
                      value={website}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      disabled={noWebsite}
                    />
                    {websiteError && (
                      <p className="demo-label error-message">{websiteError}</p>
                    )}
                  </div>
                  <div className="sqdk-form-group mb-0">
                    <label htmlFor="noWebsite">
                      <input
                        type="checkbox"
                        id="noWebsite"
                        name="noWebsite"
                        className="no-website-checkbox"
                        value="No Website"
                        checked={noWebsite}
                        onChange={onWebCheckboxChange}
                      />
                      No Website
                    </label>
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="teamName">Team Name</label>
                    <input
                      type="text"
                      className="sqdk-form-control"
                      id="teamName"
                      name="teamName"
                      placeholder="Team name"
                      value={teamName}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      required
                    />
                    {teamNameError && (
                      <p className="demo-label error-message">
                        {teamNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="sport">Sports</label>
                    <select
                      id="sport"
                      name="sport"
                      defaultValue={sport}
                      onChange={onSportChange}
                      className="sqdk-form-control"
                      required
                    >
                      <option value="DEFAULT" disabled>
                        Select your game
                      </option>
                      {gameList.map((game) => (
                        <option key={game._id} value={game._id}>
                          {game.name}
                        </option>
                      ))}
                    </select>
                    {sportError && (
                      <p className="demo-label error-message">{sportError}</p>
                    )}
                  </div>
                </div>
                <div className="col-100">
                  <div className="radio-groups">
                    <label htmlFor="" className="demo-label">
                      Company Size
                    </label>
                    <div className="radio-group">
                      <label htmlFor="">
                        <input
                          type="radio"
                          name="companySize"
                          value="1-20"
                          checked={companySize === '1-20'}
                          onChange={onCompanySizeOptionChange}
                        />
                        1-20
                      </label>
                    </div>
                    <div className="radio-group">
                      <label htmlFor="">
                        <input
                          type="radio"
                          name="companySize"
                          value="21-50"
                          checked={companySize === '21-50'}
                          onChange={onCompanySizeOptionChange}
                        />
                        21-50
                      </label>
                    </div>
                    <div className="radio-group">
                      <label htmlFor="">
                        <input
                          type="radio"
                          name="companySize"
                          value="51-100"
                          checked={companySize === '51-100'}
                          onChange={onCompanySizeOptionChange}
                        />
                        51-100
                      </label>
                    </div>
                    <div className="radio-group">
                      <label htmlFor="">
                        <input
                          type="radio"
                          name="companySize"
                          value="100+"
                          checked={companySize === '100+'}
                          onChange={onCompanySizeOptionChange}
                        />
                        100+
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-100">
                  <div className="checkbox-groups">
                    <label htmlFor="" className="demo-label">
                      Area of Interest
                    </label>
                    <div className="checkbox-group">
                      <label htmlFor="websiteAndHosting">
                        <input
                          type="checkbox"
                          name="websiteAndHosting"
                          value="Website & Hosting"
                          checked={websiteAndHosting}
                          onChange={onAreaInterestCheckboxChange}
                        />
                        Website & Hosting
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label htmlFor="teamAndMembership">
                        <input
                          type="checkbox"
                          name="teamAndMembership"
                          value="Team & Membership Management"
                          checked={teamAndMembership}
                          onChange={onAreaInterestCheckboxChange}
                        />
                        Team & Membership Management
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label htmlFor="salesAndEcommerce">
                        <input
                          type="checkbox"
                          name="salesAndEcommerce"
                          value="Merch Sales / eCommerce"
                          checked={salesAndEcommerce}
                          onChange={onAreaInterestCheckboxChange}
                        />
                        Merch Sales / eCommerce
                      </label>
                    </div>
                    <div className="checkbox-group">
                      <label htmlFor="teamChatroom">
                        <input
                          type="checkbox"
                          name="teamChatroom"
                          value="Team Chatroom"
                          checked={teamChatroom}
                          onChange={onAreaInterestCheckboxChange}
                        />
                        Team Chatroom
                      </label>
                    </div>
                    {areaOfInterestError && (
                      <p className="demo-label error-message">
                        {areaOfInterestError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-50">
                  <div className="sqdk-form-group">
                    <label htmlFor="">Demo Date and Time</label>
                    <Flatpickr
                      className="sqdk-form-control"
                      options={{
                        dateFormat: 'd M, Y H:i',
                        enableTime: true,
                        minDate: new Date().fp_incr(1),
                      }}
                      value={dateTime}
                      name="dateTime"
                      onChange={(selectedDates, dateStr, instance) =>
                        onDateTimeChange(selectedDates)
                      }
                    />
                    {dateTimeError && (
                      <p className="demo-label error-message">
                        {dateTimeError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-100">
                  <div className="sqdk-form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      cols="30"
                      rows="10"
                      className="form-control"
                      id="comment"
                      name="comment"
                      placeholder="Write a Comment if any"
                      value={comment}
                      onChange={onInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-100">
                  <button type="submit" className="btn btn-common btn-primary">
                    Book Demo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default MainBookDemo;
