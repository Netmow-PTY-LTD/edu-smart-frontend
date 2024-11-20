import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';

const Loader = (props) => {
  return (
    <>
      <div className="button px-3 py-2 text-light d-flex justify-content-center m-2">
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
