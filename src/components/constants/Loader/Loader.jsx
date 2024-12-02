import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';

const Loader = (props) => {
  return (
    <>
      <div className=" px-3 text-light d-flex justify-content-center">
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
