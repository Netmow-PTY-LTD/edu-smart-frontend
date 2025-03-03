import { useState } from 'react';

const DescriptionRenderer = ({ description, maxLength = 40 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h5 className="fs-14 fw-medium text-capitalize">
        {expanded
          ? description
          : description.slice(0, maxLength) +
            (description.length > maxLength ? '...' : '')}
        {description.length > maxLength && (
          <span
            className="text-primary ms-1"
            style={{ cursor: 'pointer' }}
            onClick={toggleDescription}
          >
            {expanded ? ' See Less' : ' See More'}
          </span>
        )}
      </h5>
    </div>
  );
};

export default DescriptionRenderer;
