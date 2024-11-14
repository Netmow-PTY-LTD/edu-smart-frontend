import {
  addSelectPlayers,
  emptyAddSelectPlayers,
} from '@/slices/dashboard/commonApi/reducer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import {
  Col,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

const PlayerSelectForEvents = ({
  setOpenModal,
  openModal,
  playerList,
  gameId,
  adminInfoData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [player, setPlayer] = useState(null);
  const [newErrors, setNewErrors] = useState('');
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    dispatch(emptyAddSelectPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (playerList?.length > 0) {
      const mappedData = playerList.map((player) => {
        if (player?._id) {
          return {
            label:
              player?.user_id?.first_name + ' ' + player?.user_id?.last_name,
            value: player?.user_id?._id,
          };
        }
      });
      setOptionList(mappedData);
    }
  }, [playerList]);

  const handleSelect = (name, selected) => {
    if (
      adminInfoData?.country === 'Bangladesh' &&
      adminInfoData?.currency === 'BDT'
    ) {
      setPlayer(selected);
    } else if (typeof selected === 'object') {
      setPlayer(selected);
    } else {
      setPlayer({
        [name]: selected
          ? selected?.length > 0 && selected.map((option) => option)
          : [selected.value],
      });
    }
    setNewErrors('');
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (
      adminInfoData?.country === 'Bangladesh' &&
      adminInfoData?.currency === 'BDT'
    ) {
      const newPlayerArray = [player];
      dispatch(addSelectPlayers(newPlayerArray));
      router.push(
        `/guardian/checkout-for-guardian/${'singleEventId'},${gameId}`
      );
    } else if (typeof player === 'object') {
      const newPlayerArray = [player];
      dispatch(addSelectPlayers(newPlayerArray));
      router.push(
        `/guardian/checkout-for-guardian/${'singleEventId'},${gameId}`
      );
    } else if (player?.player && player?.player?.length === 1) {
      const newPlayerArray = [...player.player];
      dispatch(addSelectPlayers(newPlayerArray));
      router.push(
        `/guardian/checkout-for-guardian/${'singleEventId'},${gameId}`
      );
    } else if (player?.player && player?.player?.length > 1) {
      const newPlayerArray = [...player.player];
      dispatch(addSelectPlayers(newPlayerArray));
      router.push(
        `/guardian/checkout-for-guardian/${'multipleEvent'},${gameId}`
      );
    } else {
      setNewErrors('At Least Select A Player');
    }

    // if (!player?.player || player?.player?.length === 0) {
    //   const newPlayerArray = [
    //     {
    //       label: userInfoData?.first_name + '' + userInfoData?.last_name,
    //       value: userInfoData?._id,
    //     },
    //   ];
    //   dispatch(addSelectPlayers(newPlayerArray));
    // } else {
    //   const updatedPlayerArray = [
    //     ...player.player,
    //     {
    //       label: userInfoData?.first_name + '' + userInfoData?.last_name,
    //       value: userInfoData?._id,
    //     },
    //   ];
    //   dispatch(addSelectPlayers(updatedPlayerArray));
    // }

    // router.push(`/guardian/checkout-for-guardian/${gameId}`);
  };

  console.log(player);

  return (
    <>
      <Modal isOpen={openModal} centered>
        <ModalHeader toggle={() => setOpenModal(!openModal)} className="fs-2">
          Select Players
        </ModalHeader>
        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="player-form">
            <Row>
              <Col xl={12}>
                <div className="mb-5">
                  <Label className="form-label">Select Players</Label>
                  <div>
                    <Select
                      options={optionList}
                      placeholder="Please Select Players"
                      value={player?.player}
                      name="player"
                      onChange={(value) => handleSelect('player', value)}
                      isSearchable={true}
                      // isMulti={
                      //   adminInfoData?.country !== 'Bangladesh' &&
                      //   adminInfoData?.currency !== 'BDT'
                      // }
                    />
                  </div>
                  {newErrors && (
                    <span className="text-danger fs-3">*{newErrors}</span>
                  )}
                </div>
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-center">
                  <button
                    //   disabled={isLoading}
                    type="button"
                    className="button p-3 text-light"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PlayerSelectForEvents;
