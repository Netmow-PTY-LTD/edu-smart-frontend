/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import Select from 'react-select';
import { TagsInput } from 'react-tag-input-component';
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
import Loader from '../../Loader';

const FeatureForSAdmin = ({
  formData,
  handleInputChange,
  errors,
  handleSelect,
  Btn,
  handleSubmit,
  isLoading,
  setMetaTitle,
  setMetaKeywords,
  setMetaDescription,
  metaTitle,
  metaKeywords,
  metaDescription,
}) => {
  // const [optionsList, setOptionsList] = useState([]);
  // const [bannerImage, setBannerImage] = useState(
  //   formData?.banner_image || null
  // );
  // const [section1Image, setSection1Image] = useState('');
  // const [section2Image, setSection2Image] = useState('');
  // const [ctaImage, setCtaImage] = useState('');

  const featureIcons = [
    { label: 'Clubs', value: '/images/features/clubs_management.png' },
    { label: 'Website', value: '/images/features/custom-website.png' },
    { label: 'Event', value: '/images/features/event_management.png' },
    { label: 'Chat', value: '/images/features/live-chat.png' },
    { label: 'Mobile App', value: '/images/features/mobile_app.png' },
    { label: 'Sports', value: '/images/features/sports-management.png' },
    { label: 'Team', value: '/images/features/team_management.png' },
  ];
  const highlight1Icons = [
    { label: 'icon1', value: '/images/features/fa_paper-plane-o.png' },
    { label: 'icon2', value: '/images/features/gg_website.png' },
    { label: 'icon3', value: '/images/features/ic_outline-app-shortcut.png' },
    { label: 'icon4', value: '/images/features/ri_team-line.png' },
    { label: 'icon5', value: '/images/features/fluent-mdl2_team-favorite.png' },
    { label: 'icon6', value: '/images/features/fluent-mdl2_date-time.png' },
    {
      label: 'icon7',
      value: '/images/features/ic_outline-mark-unread-chat-alt.png  ',
    },
  ];
  const highlight2Icons = [
    { label: 'icon1', value: '/images/features/ic_round-security.png' },
    {
      label: 'icon2',
      value: '/images/features/eos-icons_system-ok-outlined.png',
    },
    { label: 'icon3', value: '/images/features/ic_round-security.png' },
    { label: 'icon4', value: '/images/features/fluent-mdl2_team-favorite.png' },
    { label: 'icon5', value: '/images/features/carbon_id-management.png' },
    { label: 'icon6', value: '/images/features/material-symbols_push-pin.png' },
    { label: 'icon7', value: '/images/features/ic_sharp-update.png' },
  ];
  const highlight3Icons = [
    { label: 'icon1', value: '/images/features/bx_like.png' },
    { label: 'icon2', value: '/images/features/mdi_responsive.png' },
    { label: 'icon3', value: '/images/features/bx_like.png' },
    { label: 'icon4', value: '/images/features/bx_like.png' },
    { label: 'icon5', value: '/images/features/bx_like.png' },
    {
      label: 'icon6',
      value:
        '/images/features/material-symbols_circle-notifications-rounded.png ',
    },
    { label: 'icon7', value: '/images/features/fluent_news-16-regular.png' },
  ];

  // useEffect(() => {
  //   setOptionsList(
  //     optionData.map((item) => ({
  //       label: item.label,
  //       value: item.value,
  //     }))
  //   );
  // }, []);

  const formatOption = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src={value}
        alt={label}
        height={40}
        width={50}
        style={{ width: '24px', height: '24px', marginRight: '5px' }}
      />
      <span>{label}</span>
    </div>
  );

  return (
    <>
      <Form>
        <Row>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="nameInput" className="form-label fs-3">
                Feature Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Enter a name"
                name="name"
                value={formData?.name}
                onChange={handleInputChange}
              />
              {errors?.name && (
                <div className="text-danger fs-3 my-2">{errors?.name}</div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="iconInput" className="form-label fs-3">
                Feature Icon
              </Label>
              <Select
                options={featureIcons}
                id="iconInput"
                name="feature_icon"
                value={featureIcons?.find(
                  (option) => option?.value === formData?.feature_icon
                )}
                onChange={(selected) => handleSelect('feature_icon', selected)}
                formatOptionLabel={formatOption}
              />

              {errors?.feature_icon && (
                <div className="text-danger">{errors?.feature_icon}</div>
              )}
            </div>
          </Col>

          <Col xl={12}>
            <div className="mb-4">
              <Label htmlFor="bannerImageInput" className="form-label fs-3">
                Banner Image
              </Label>
              <Input
                type="file"
                className="form-control"
                id="bannerImageInput"
                name="banner_image"
                onChange={handleInputChange}
              />
              {errors?.banner_image && (
                <div className="text-danger fs-3 my-2">
                  {errors?.banner_image}
                </div>
              )}
            </div>

            {formData?.banner_image && (
              <div className="mb-4">
                <img
                  style={{
                    maxHeight: '70px',
                  }}
                  src={
                    typeof formData?.banner_image === 'string'
                      ? formData?.banner_image
                      : URL.createObjectURL(new Blob([formData?.banner_image]))
                  }
                  alt={formData?.name ? formData?.name : 'Banner Image'}
                />
              </div>
            )}
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="titleInput" className="form-label fs-3">
                Feature Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="titleInput"
                placeholder="Enter a name"
                name="title"
                value={formData?.title}
                onChange={handleInputChange}
              />
              {errors?.title && (
                <div className="text-danger fs-3 my-2">{errors?.title}</div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="permalinkInput" className="form-label fs-3">
                Permalink
              </Label>
              <Input
                type="text"
                className="form-control"
                id="permalinkInput"
                placeholder="Enter a name"
                name="permalink"
                value={formData?.permalink}
                onChange={handleInputChange}
              />
              {errors?.permalink && (
                <div className="text-danger fs-3 my-2">{errors?.permalink}</div>
              )}
            </div>
          </Col>

          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="featureDescInput" className="form-label fs-3">
                Feature Description
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="featureDescInput"
                placeholder="Enter a name"
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                rows={5}
              />
              {errors?.description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.description}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label
                htmlFor="highlightOneTitleInput"
                className="form-label fs-3"
              >
                Highlight 1 Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="highlightOneTitleInput"
                placeholder="Enter a name"
                name="highlight1_title"
                value={formData?.highlight1_title}
                onChange={handleInputChange}
              />
              {errors?.highlight1_title && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight1_title}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="highlightIconInput" className="form-label fs-3">
                Highlight 1 Icon
              </Label>
              <Select
                options={highlight1Icons}
                id="highlightIconInput"
                name="highlight1_icon"
                value={highlight1Icons?.find(
                  (option) => option?.value === formData?.highlight1_icon
                )}
                onChange={(selected) =>
                  handleSelect('highlight1_icon', selected)
                }
                formatOptionLabel={formatOption}
              />

              {errors?.highlight1_icon && (
                <div className="text-danger">{errors?.highlight1_icon}</div>
              )}
            </div>
          </Col>

          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="h2DescInput" className="form-label fs-3">
                Highlight 1 Description{' '}
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="h2DescInput"
                placeholder="Enter a name"
                rows={5}
                name="highlight1_description"
                value={formData?.highlight1_description}
                onChange={handleInputChange}
              />
              {errors?.highlight1_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight1_description}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label
                htmlFor="highlighttwoTitleInput"
                className="form-label fs-3"
              >
                Highlight 2 Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="highlighttwoTitleInput"
                placeholder="Enter a name"
                name="highlight2_title"
                value={formData?.highlight2_title}
                onChange={handleInputChange}
              />
              {errors?.highlight2_title && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight2_title}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label
                htmlFor="highlighttwoIconInput"
                className="form-label fs-3"
              >
                Highlight 2 Icon
              </Label>
              <Select
                options={highlight2Icons}
                id="highlighttwoIconInput"
                name="highlight2_icon"
                value={highlight2Icons?.find(
                  (option) => option?.value === formData?.highlight2_icon
                )}
                onChange={(selected) =>
                  handleSelect('highlight2_icon', selected)
                }
                formatOptionLabel={formatOption}
              />

              {errors?.highlight2_icon && (
                <div className="text-danger">{errors?.highlight2_icon}</div>
              )}
            </div>
          </Col>

          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="htwoDescInput" className="form-label fs-3">
                Highlight 2 Description{' '}
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="htwoDescInput"
                placeholder="Enter a name"
                rows={5}
                name="highlight2_description"
                value={formData?.highlight2_description}
                onChange={handleInputChange}
              />
              {errors?.highlight2_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight2_description}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label
                htmlFor="highlightthreeTitleInput"
                className="form-label fs-3"
              >
                Highlight 3 Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="highlightthreeTitleInput"
                placeholder="Enter a name"
                name="highlight3_title"
                value={formData?.highlight3_title}
                onChange={handleInputChange}
              />
              {errors?.highlight3_title && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight3_title}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label
                htmlFor="highlightthreeIconInput"
                className="form-label fs-3"
              >
                Highlight 3 Icon
              </Label>
              <Select
                options={highlight3Icons}
                id="highlightthreeIconInput"
                name="highlight3_icon"
                value={highlight3Icons?.find(
                  (option) => option?.value === formData?.highlight3_icon
                )}
                onChange={(selected) =>
                  handleSelect('highlight3_icon', selected)
                }
                formatOptionLabel={formatOption}
              />

              {errors?.highlight3_icon && (
                <div className="text-danger">{errors?.highlight3_icon}</div>
              )}
            </div>
          </Col>

          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="hthreeDescInput" className="form-label fs-3">
                Highlight 3 Description
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="hthreeDescInput"
                placeholder="Enter a name"
                rows={5}
                name="highlight3_description"
                value={formData?.highlight3_description}
                onChange={handleInputChange}
              />
              {errors?.highlight3_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.highlight3_description}
                </div>
              )}
            </div>
          </Col>

          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="section1_name" className="form-label fs-3">
                Section 1 Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="section1_name"
                placeholder="Enter a name"
                name="section1_name"
                value={formData?.section1_name}
                onChange={handleInputChange}
              />
              {errors?.section1_name && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section1_name}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="section1_title" className="form-label fs-3">
                Section 1 Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="section1_title"
                placeholder="Enter a name"
                name="section1_title"
                value={formData?.section1_title}
                onChange={handleInputChange}
              />

              {errors?.section1_title && (
                <div className="text-danger">{errors?.section1_title}</div>
              )}
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="section1_description" className="form-label fs-3">
                Section 1 Description
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="section1_description"
                placeholder="Enter a name"
                rows={5}
                name="section1_description"
                value={formData?.section1_description}
                onChange={handleInputChange}
              />
              {errors?.section1_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section1_description}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="section2_name" className="form-label fs-3">
                Section 2 Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="section2_name"
                placeholder="Enter a name"
                name="section2_name"
                value={formData?.section2_name}
                onChange={handleInputChange}
              />
              {errors?.section2_name && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section2_name}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="section2_title" className="form-label fs-3">
                Section 2 Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="section2_title"
                placeholder="Enter a name"
                name="section2_title"
                value={formData?.section2_title}
                onChange={handleInputChange}
              />

              {errors?.section2_title && (
                <div className="text-danger">{errors?.section2_title}</div>
              )}
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-4">
              <Label htmlFor="section2_description" className="form-label fs-3">
                Section 2 Description
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="section2_description"
                placeholder="Enter a name"
                rows={5}
                name="section2_description"
                value={formData?.section2_description}
                onChange={handleInputChange}
              />
              {errors?.section2_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section2_description}
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="cta_title" className="form-label fs-3">
                CTA Title
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cta_title"
                placeholder="Enter a name"
                name="cta_title"
                value={formData?.cta_title}
                onChange={handleInputChange}
              />

              {errors?.cta_title && (
                <div className="text-danger">{errors?.cta_title}</div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-4">
              <Label htmlFor="cta_description" className="form-label fs-3">
                CTA Description
              </Label>
              <textarea
                type="text"
                className="form-control"
                id="cta_description"
                placeholder="Enter a name"
                rows={5}
                name="cta_description"
                value={formData?.cta_description}
                onChange={handleInputChange}
              />
              {errors?.cta_description && (
                <div className="text-danger fs-3 my-2">
                  {errors?.cta_description}
                </div>
              )}
            </div>
          </Col>
          <Col xl={6}>
            <div className="mb-4">
              <Label htmlFor="section1_image" className="form-label fs-3">
                Section1 Image
              </Label>
              <Input
                type="file"
                className="form-control"
                id="section1_image"
                name="section1_image"
                onChange={handleInputChange}
              />
              {errors?.section1_image && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section1_image}
                </div>
              )}
            </div>
            {formData?.section1_image && (
              <div className="mb-4">
                <img
                  style={{
                    maxHeight: '70px',
                  }}
                  src={
                    typeof formData?.section1_image === 'string'
                      ? formData?.section1_image
                      : URL.createObjectURL(
                          new Blob([formData?.section1_image])
                        )
                  }
                  alt="img"
                />
              </div>
            )}
          </Col>
          <Col xl={6}>
            <div className="mb-4">
              <Label htmlFor="section2_image" className="form-label fs-3">
                Section2 Image
              </Label>
              <Input
                type="file"
                className="form-control"
                id="section2_image"
                name="section2_image"
                onChange={handleInputChange}
              />
              {errors?.section2_image && (
                <div className="text-danger fs-3 my-2">
                  {errors?.section2_image}
                </div>
              )}
            </div>
            {formData?.section2_image && (
              <div className="mb-4">
                <img
                  style={{
                    maxHeight: '70px',
                  }}
                  src={
                    typeof formData?.section2_image === 'string'
                      ? formData?.section2_image
                      : URL.createObjectURL(
                          new Blob([formData?.section2_image])
                        )
                  }
                  alt="img"
                />
              </div>
            )}
          </Col>
          <Col xl={6}>
            <div className="mb-4">
              <Label htmlFor="cta_image" className="form-label fs-3">
                CTA Image
              </Label>
              <Input
                type="file"
                className="form-control"
                id="cta_image"
                name="cta_image"
                onChange={handleInputChange}
              />
              {errors?.cta_image && (
                <div className="text-danger fs-3 my-2">{errors?.cta_image}</div>
              )}
            </div>
            {formData?.cta_image && (
              <div className="mb-4">
                <img
                  style={{
                    maxHeight: '70px',
                  }}
                  src={
                    typeof formData?.cta_image === 'string'
                      ? formData?.cta_image
                      : URL.createObjectURL(new Blob([formData?.cta_image]))
                  }
                  alt="img"
                />
              </div>
            )}
          </Col>
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">Meta Data</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="news-title" className="form-label">
                      Meta Title
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="news-title"
                      placeholder="Enter meta title"
                      name="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="news-title" className="form-label">
                      Meta Keywords
                    </Label>
                    <TagsInput
                      value={metaKeywords}
                      onChange={setMetaKeywords}
                      name="tags"
                      placeHolder="Enter news keywords"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <Label htmlFor="news-title" className="form-label">
                      Meta Description
                    </Label>
                    <textarea
                      className="form-control"
                      placeholder="Enter meta description"
                      name="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    ></textarea>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Col lg={12}>
            <div className="hstack gap-2 justify-content-center mt-3">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  disabled={isLoading}
                  type="button"
                  className="button p-3 text-light"
                  onClick={handleSubmit}
                >
                  {Btn}
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FeatureForSAdmin;
