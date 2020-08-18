// @ts-ignore
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
  isNewSchedule: string;
  setIsOpenInParent: (val: boolean) => void;
  setIsNewSchedule: (val: boolean) => void;
}

const mapDispatchToProps = {
  setModalVisibility: ScheduleActions.setModalVisibility,
  addEditSchedule: ScheduleActions.addEditSchedule
};

const SchedulerModal: React.FC<IScheduleState & IModalState & ModalProps & typeof mapDispatchToProps> = ({
  addEditSchedule,
  isOpen,
  isNewSchedule,
  setIsNewSchedule,
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
    if(isNewSchedule) {
      setName(savedName)
    } else {
      setName("")
    }
  }, [savedName])

  React.useEffect(() => {
    if(isNewSchedule) {
      setPhoneNumber(savedPhoneNumber)
    } else {
      setPhoneNumber("")
    }
  }, [savedPhoneNumber])

  return isModalOpen && <div className={modalStyle.modal_cntr}>
    <p className={modalStyle.schedule_head}> <FontAwesomeIcon icon={faCalendarAlt} className={modalStyle.font_padding}/>Schedule: 
      <span onClick={() => {
        setIsModalOpen(false)
        setIsOpenInParent(false)
      }}>
        <FontAwesomeIcon className={`${modalStyle.font_padding} ${modalStyle.font_float}`} icon={faTimes}/>
      </span>
    </p>
    
    <div className={modalStyle.modal_detail_wrapper}>
      <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faUser} className={modalStyle.font_input}/>
        <input type='text' value={name}
          onChange={(e) => {
            setName(e.target.value)
          }} placeholder='Add Name' />
      </div>
      <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faPhoneSquareAlt}className={modalStyle.font_input} />
        <input type='text' value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value)
          }} placeholder='Add Phone Number' 
          maxLength={12}/>
      </div>
      <div>
        <p><FontAwesomeIcon icon={faClock} className={modalStyle.font_padding}/>Time: {`${getFormattedDate(scheduleModalStartTime)} to ${getFormattedDate(scheduleModalEndTime)}`}</p>
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