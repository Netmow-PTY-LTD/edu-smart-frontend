/* eslint-disable @next/next/no-img-element */
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Layout from '@/components/layout';
import { useSingleGetApplicationQuery } from '@/slice/services/public/application/applicationServiceNew';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

const SingleApplicationsPage = () => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: singleGetApplicationData,
    isLoading: singleGetApplicationLoading,
  } = useSingleGetApplicationQuery(router?.query?.id);

  useEffect(() => {
    const fetchImages = async () => {
      if (singleGetApplicationData?.data?.documents?.length > 0) {
        // eslint-disable-next-line no-undef
        const files = await Promise.all(
          singleGetApplicationData.data.documents.map(async (item) =>
            item?.files?.map(async (file) => {
              return await convertImageUrlToFile(file.url);
            })
          )
        );
        setImageFiles(files.flat());
      }
    };
    fetchImages();
  }, [singleGetApplicationData]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    toggleModal();
  };

  if (singleGetApplicationLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Card>
              <h1 className="py-4 px-3 text-capitalize text-primary fw-semibold">
                All Submitted Documents
              </h1>
              <CardBody className="mh-100">
                <div className="row">
                  {singleGetApplicationData?.data?.documents?.length > 0 &&
                    singleGetApplicationData?.data?.documents.map(
                      (item, index) => (
                        <div key={index} className="col-md-4 mb-4">
                          <h5 className="fs-2 text-capitalize text-primary fw-semibold">
                            {item?.title
                              .split('[')[0]
                              .split('_')
                              .join(' ')
                              .split('/')
                              .join(' ')}
                          </h5>
                          {item?.files?.length > 0 &&
                            item?.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="file-preview">
                                {file?.url?.endsWith('.pdf') ? (
                                  // Show PDF download link instead of preview
                                  <a
                                    href={file.url}
                                    download={file.public_id}
                                    className="btn btn-link"
                                  >
                                    Download PDF
                                  </a>
                                ) : (
                                  <img
                                    src={imageFiles[fileIndex]?.url || file.url}
                                    alt={`file-preview-${fileIndex}`}
                                    width="100%"
                                    height="auto"
                                    onClick={() =>
                                      handleImageClick(
                                        imageFiles[fileIndex]?.url || file.url
                                      )
                                    }
                                    className="cursor-pointer"
                                  />
                                )}
                              </div>
                            ))}
                        </div>
                      )
                    )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal to display the image */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>Image Preview</ModalHeader>
        <ModalBody>
          {selectedImage && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '100%', width: '100%' }}
            >
              <img
                src={selectedImage}
                alt="Selected Image"
                className="img-fluid"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    </Layout>
  );
};

export default SingleApplicationsPage;
