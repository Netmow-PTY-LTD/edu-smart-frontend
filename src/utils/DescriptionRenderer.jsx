import { useState } from 'react';

const DescriptionRenderer = ({ description, maxWords = 10 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const words = description.split(' ');
  const truncatedDescription = words.slice(0, maxWords).join(' ');
  const isTruncated = words.length > maxWords;

  return (
    <div>
      <h5 className="fs-14 fw-medium text-capitalize">
        {expanded
          ? description
          : truncatedDescription + (isTruncated ? '...' : '')}
        {isTruncated && (
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
