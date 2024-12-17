import CourseCardComponent from '@/components/common/CourseCardComponent';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const AllCoursesLayout = ({university_id}) => {
    const {
        data: getSingleUniversityDataForStudent,
        isLoading: getSingleUniversityIsLoadingForStudent,
        refetch: getSingleUniversityForStudentRefetch,
      } = useGetsingleUniversityQuery(university_id, {
        skip: !university_id,
      });
    
   
      console.log('University AllCourses Data from ==>', getSingleUniversityDataForStudent?.data?.courses);

    return (
        <Row>
        <Col lg={3} className=''>
          <Card>
            <CardHeader>Hello</CardHeader>
            <CardBody>
              <div>All Department</div>
              <div className="d-flex flex-column align-items-start justify-content-start gap-3">
                <input type="checkbox" name="CSE" id="" />
                <input type="checkbox" name="EEE" id="" />
                <input type="checkbox" name="ME" id="" />
                <input type="checkbox" name="IPE" id="" />
                <input type="checkbox" name="CIVIL" id="" />
              </div>
              <hr />
              <div>All Programs</div>
              <div className="d-flex flex-column align-items-start justify-content-start gap-3">
                <input type="checkbox" name="CSE" id="" />
                <input type="checkbox" name="EEE" id="" />
                <input type="checkbox" name="ME" id="" />
                <input type="checkbox" name="IPE" id="" />
                <input type="checkbox" name="CIVIL" id="" />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg={9}>
          {getSingleUniversityDataForStudent?.data?.courses?.length >
            0 &&
            getSingleUniversityDataForStudent?.data?.courses.map(
              (item, index) => (
                <Row key={index} lg={3}>
                
                  <CourseCardComponent item={item} />
                  {/* </div> */}
                </Row>
              )
            )}
        </Col>
      </Row>
    );
};

export default AllCoursesLayout;