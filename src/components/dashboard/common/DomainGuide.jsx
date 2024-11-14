import React from 'react';

const DomainGuide = () => {
  return (
    <div className="row my-5">
      <div className="col-12">
        <div className="sd-card">
          <div className="sd-card-body">
            <h3>
              <span>Need Guide</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15C5.51088 15 3.60322 14.2098 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C9.48912 0 11.3968 0.790176 12.8033 2.1967C14.2098 3.60322 15 5.51088 15 7.5ZM8.4375 11.25C8.4375 11.4986 8.33873 11.7371 8.16291 11.9129C7.9871 12.0887 7.74864 12.1875 7.5 12.1875C7.25136 12.1875 7.0129 12.0887 6.83709 11.9129C6.66127 11.7371 6.5625 11.4986 6.5625 11.25C6.5625 11.0014 6.66127 10.7629 6.83709 10.5871C7.0129 10.4113 7.25136 10.3125 7.5 10.3125C7.74864 10.3125 7.9871 10.4113 8.16291 10.5871C8.33873 10.7629 8.4375 11.0014 8.4375 11.25ZM7.5 2.8125C7.25136 2.8125 7.0129 2.91127 6.83709 3.08709C6.66127 3.2629 6.5625 3.50136 6.5625 3.75V7.5C6.5625 7.74864 6.66127 7.9871 6.83709 8.16291C7.0129 8.33873 7.25136 8.4375 7.5 8.4375C7.74864 8.4375 7.9871 8.33873 8.16291 8.16291C8.33873 7.9871 8.4375 7.74864 8.4375 7.5V3.75C8.4375 3.50136 8.33873 3.2629 8.16291 3.08709C7.9871 2.91127 7.74864 2.8125 7.5 2.8125Z"
                  fill="var(--color--primary)"
                />
              </svg>
            </h3>
            <p>
              Namecheap DNS Record?{' '}
              <a
                href="https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/"
                target="_blank"
                rel="noreferrer"
                className="btn-learn-how"
              >
                Learn How
              </a>
            </p>
            <p>
              GoDaddy DNS Record?{' '}
              <a
                href="https://ie.godaddy.com/help/add-an-a-record-19238"
                target="_blank"
                rel="noreferrer"
                className="btn-learn-how"
              >
                Learn How
              </a>
            </p>
            <p>
              Hostinger DNS Record?{' '}
              <a
                href="https://support.hostinger.com/en/articles/4468886-how-to-manage-a-records"
                target="_blank"
                className="btn-learn-how"
                rel="noreferrer"
              >
                Learn How
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainGuide;
