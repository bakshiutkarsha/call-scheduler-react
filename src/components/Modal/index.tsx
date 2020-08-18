import * as React from "react";
import modalStyle from "@styles/modal.scss";
import * as ScheduleActions from "@actions/ScheduleActions";
import { IStore, IScheduleState, IModalState } from "@reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneSquareAlt, faCalendarAlt, faClock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getFormattedDate } from "../../util";

type ModalProps = {
  isOpen: boolean;
  savedName: string;
  savedPhoneNumber: string;
}

const mapDispatchToProps = {
  setModalVisibility: ScheduleActions.setModalVisibility,
  addEditSchedule: ScheduleActions.addEditSchedule
};

const SchedulerModal: React.FC<IScheduleState & IModalState & ModalProps & typeof mapDispatchToProps> = ({
  addEditSchedule,
  isOpen,
  savedName,
  savedPhoneNumber,
  setIsOpenInParent,
  scheduleModalStartTime,
  scheduleModalEndTime
}) => {
  const [name, setName] = React.useState<string>(savedName);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(savedPhoneNumber);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(isOpen);

  React.useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen || isModalOpen])

  React.useEffect(() => {
    setName(savedName)
  }, [savedName])

  React.useEffect(() => {
    setPhoneNumber(savedPhoneNumber)
  }, [savedPhoneNumber])

  return isModalOpen && <div className={modalStyle.modal_cntr}>
    <p> <FontAwesomeIcon icon={faCalendarAlt} />Schedule: </p>
    <div onClick={() => {
      setIsModalOpen(false)
      setIsOpenInParent(false)
    }}>
      <FontAwesomeIcon icon={faTimes} />
    </div>
    <div className={modalStyle.modal_detail_wrapper}>
      <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faUser} />
        <input type='text' value={name}
          onChange={(e) => {
            setName(e.target.value)
          }} placeholder='Add Name' />
      </div>
      <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faPhoneSquareAlt} />
        <input type='text' value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value)
          }} placeholder='Add Phone Number' />
      </div>
      <div>
        <p><FontAwesomeIcon icon={faClock} />Time: {`${getFormattedDate(scheduleModalStartTime)} to ${getFormattedDate(scheduleModalEndTime)}`}</p>
      </div>
      <button onClick={() => {
        addEditSchedule({
          name: name,
          phone_number: phoneNumber,
          start_date: scheduleModalStartTime,
          end_date: scheduleModalEndTime
        })
        setIsModalOpen(false);
        setIsOpenInParent(false);
      }}>ADD SCHEDULE</button>
    </div>
  </div>
};

function mapStateToProps(state: IStore) {
  return {
    schedule: state.schedule.schedule,
    scheduleModalStartTime: state.modal.scheduleModalStartTime,
    scheduleModalEndTime: state.modal.scheduleModalEndTime,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerModal);