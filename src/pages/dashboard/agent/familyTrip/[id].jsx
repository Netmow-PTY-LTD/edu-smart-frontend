import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
import { useRouter } from 'next/router';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const AgentApplicationList = () => {
  const router = useRouter();

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
  } = useSingleGetApplicationQuery(router?.query?.id);

  if (singleGetApplicationLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {singleGetApplicationLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Familiy Trip
                      </CardHeader>
                      <CardBody className="mh-100">
                        {/* <CommonTableComponent
                          headers={agentFamilyTripHeaders}
                          data={familyTrip?.data || []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        /> */}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentApplicationList;
