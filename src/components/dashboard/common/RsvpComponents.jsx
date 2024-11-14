import LoaderSpiner from '@/components/constants/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import RSVPlist from './RSVPlist';

const RsvpComponents = ({ data, loading }) => {
  const dispatch = useDispatch();

  const [goingData, SetGoingData] = useState({});
  const [notGoingData, SetNotGoingData] = useState({});
  const [noDecisionData, SetNoDecisionData] = useState({});

  useEffect(() => {
    if (data?.length > 0) {
      const goingData = data.filter((m) => m.status === 'going');
      const notGoingData = data.filter((m) => m.status === 'not going');
      const noDecisionData = data.filter((m) => m.status === 'no decision');

      SetGoingData(goingData);
      SetNotGoingData(notGoingData);
      SetNoDecisionData(noDecisionData);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <LoaderSpiner />
      ) : (
        <Col>
          <Row className="grid g-5 mt-5">
            {goingData.length > 0 ? (
              <RSVPlist data={goingData} title={'Going'} />
            ) : (
              ''
            )}
            {notGoingData.length > 0 ? (
              <RSVPlist data={notGoingData} title={'Not Going'} />
            ) : (
              ''
            )}
            {noDecisionData.length > 0 ? (
              <RSVPlist data={noDecisionData} title={'No Decision'} />
            ) : (
              ''
            )}
          </Row>
        </Col>
      )}
    </>
  );
};

export default RsvpComponents;
