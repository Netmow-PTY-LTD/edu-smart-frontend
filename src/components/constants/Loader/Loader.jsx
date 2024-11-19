import React from 'react';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loader = (props) => {
  return (
    <>
      <div className="btn button text-light d-flex justify-content-center mx-2 mt-2">
        <Spinner> Loading... </Spinner>
      </div>
      {toast.error(props.error, {
        position: 'top-right',
        hideProgressBar: false,
        progress: undefined,
        toastId: '',
      })}
    </>
  );
};

export default Loader;
