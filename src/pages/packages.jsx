import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import MainLayout from '@/components/main/layout';
import PackagesMain from '@/components/main/packages/PackagesMain';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useGetAllActiveCouponQuery,
  useGetAllPackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

export default function Packages() {
  const { data: userInfodata, refetch: userInfoRefetch } =
    useGetUserInfoQuery();

  const [selectPackage, setSelectPackage] = useState(null);

  //console.log(userInfodata);

  const { data: allCouponData } = useGetAllActiveCouponQuery();

  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  useEffect(() => {
    const selectedPackage = getAllPackageData?.data?.find(
      (item) => item?._id === userInfodata?.data?.agent_package?.package?._id
    );
    //console.log(selectedPackage);
    setSelectPackage(selectedPackage);
  }, [
    getAllPackageData?.data,
    userInfodata?.data?.agent_package?.package?._id,
  ]);

  return (
    <MainLayout>
      <section className="packages-main">
        <div className="container">
          <div className="packages-heading">
            {/* <h3>Explore Our Exclusive Packages</h3> */}
            <h2>Explore Our Exclusive Packages</h2>
            <p>
              We’ve carefully crafted a range of packages designed to meet your
              unique needs and preferences. Whether you're looking for
              relaxation, adventure, or a bit of both, we have the perfect
              solution for you. Choose from our popular options below and find
              the package that fits your goals, budget, and desires. Let us help
              you create unforgettable experiences!
            </p>
          </div>

          <div className="d-flex justify-content-center my-5 gap-5 flex-wrap">
            {getAllPackageIsLoading ? (
              <LoaderSpiner />
            ) : (
              <>
                {getAllPackageData?.data?.length > 0 ? (
                  getAllPackageData?.data.map((item, index) => {
                    return (
                      <PackagesMain
                        key={index}
                        data={item}
                        style={
                          item?._id ===
                          userInfodata?.data?.agent_package?.package?._id
                            ? { border: '5px solid #13C9BF' }
                            : {}
                        }
                        unselectedPackage={
                          item?.price <
                          userInfodata?.data?.agent_package?.package?.price
                        }
                        selectPackage={selectPackage}
                        setSelectPackage={setSelectPackage}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                    <h1 className="text-primary">No package found right now</h1>
                    <p className="text-primary">Please add a package.</p>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="text-center fs-1 text-black fw-semibold my-5">
            Use following coupons to get discount
          </p>
          <div className="coupon-area">
            {allCouponData?.data?.length > 0 &&
              allCouponData?.data?.map((coupon, i) => (
                <div className="single-coupon" key={i}>
                  <div className="coupon-code">
                    <b>Code:</b>{' '}
                    <b>
                      {''}
                      {coupon?.code}
                    </b>
                  </div>
                  <div className="coupon-discount">
                    <b>Discount: </b>
                    {''}
                    {coupon?.discount_percentage}%
                  </div>
                  <div className="coupon-packages">
                    <b>Packages:</b>{' '}
                    {coupon?.packages?.length > 0
                      ? coupon?.packages?.map((pkg, i) => (
                          <span key={i}>
                            {pkg?.name}
                            {i !== coupon?.packages?.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      : null}
                  </div>
                  <div className="coupon-expiry-date">
                    <b>Expiry Date:</b>{' '}
                    {coupon?.expiry_date &&
                      new Date(coupon?.expiry_date).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                  </div>
                  {coupon?.package_duration && (
                    <div className="package-duration">
                      <b>Package Duration:</b>{' '}
                      <span>
                        {coupon?.package_duration?.replace(/_/g, ' ')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
