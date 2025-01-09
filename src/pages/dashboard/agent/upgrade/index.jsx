import HotOfferBanner from '@/components/common/HotOfferBanner';
import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useGetAllHotOfferQuery,
  useGetAllPackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import React from 'react';
import { Col, Row } from 'reactstrap';

const UpgradePackageInAgentdashboard = () => {
  const { data: userInfodata } = useGetUserInfoQuery();

  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  const {
    data: getAllHotOfferData,
    isLoading: getAllHotOfferIsLoading,
    refetch: getAllHotOfferRefetch,
  } = useGetAllHotOfferQuery();

  console.log(getAllHotOfferData);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Row>
              <Col xl={10}>
                <div className=" d-flex align-items-center justify-content-center my-5 gap-5">
                  {getAllPackageIsLoading ? (
                    <LoaderSpiner />
                  ) : (
                    <>
                      {getAllPackageData?.data?.length > 0 ? (
                        getAllPackageData?.data.map((item, index) => (
                          <SinglePackageComponent key={index} data={item} />
                        ))
                      ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                          <h1 className="text-primary">
                            No package found right now
                          </h1>
                          <p className="text-primary">Please add a package.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Col>
              <Col xl={2}>
                <div className="my-5 gap-5">
                  {getAllHotOfferData?.data?.length > 0
                    ? getAllHotOfferData?.data.map((item, index) => (
                        <HotOfferBanner
                          key={index}
                          height="120px"
                          width="230px"
                          data={item}
                        />
                      ))
                    : ''}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpgradePackageInAgentdashboard;
