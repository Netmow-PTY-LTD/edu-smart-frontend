import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const TalkToExpertModal = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <Modal isOpen={isOpen} centered size="lg">
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Book An Appointment
        </ModalHeader>
        <ModalBody>
          <iframe
            src="https://live.miyn.app/online_newschedule/091222647siuhp7nr9jtwqzx"
            style={{ display: 'block', width: '100%', height: '400px' }}
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TalkToExpertModal;
