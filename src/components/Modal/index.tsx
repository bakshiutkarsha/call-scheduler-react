import * as React from "react";
import modalStyle from "@styles/modal.scss";
import * as ModalActions from "@actions/ModalActions";
import * as ScheduleActions from "@actions/ScheduleActions";
import { IStore, IScheduleState, IModalState } from "@reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneSquareAlt, faCalendarAlt, faClock} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

type ModalProps = {
  isOpen: boolean;
}

const mapDispatchToProps = {
    setModalVisibility: ScheduleActions.setModalVisibility,
    addSchedule: ScheduleActions.addSchedule,
    editSchedule: ScheduleActions.editSchedule
};

const SchedulerModal: React.FC<IScheduleState & IModalState & ModalProps & typeof mapDispatchToProps> = ({
    addSchedule,
    editSchedule,
    isNewSchedule,
    isOpen,
    setIsOpenInParent,
    scheduleModalStartTime,
    scheduleModalEndTime
}) => {
  const [name, setName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(isOpen);
  
  React.useEffect(() => {
    setIsModalOpen(isOpen)
    console.log('IS MOFAL OPEN', isModalOpen)
  }, [isOpen || isModalOpen ])

  return isModalOpen && <div className={modalStyle.modal_cntr}>
      <p> <FontAwesomeIcon icon={faCalendarAlt} />Schedule: </p>
      <div className={modalStyle.modal_detail_wrapper}>
      <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faUser} />
        <input type='text' value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }} placeholder='Add Name'/>
    </div>
    <div className={modalStyle.input_cntr}>
        <FontAwesomeIcon icon={faPhoneSquareAlt} />
        <input type='text' value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value)
                        }} placeholder='Add Phone Number'/>
    </div>
    <div>
    <p><FontAwesomeIcon icon={faClock} />Time: {`${moment(scheduleModalStartTime).format('h:mm a')} to ${moment(scheduleModalEndTime).format('h:mm a')}`}</p>
    </div>
    <button onClick={() => {
      if(isNewSchedule) {
          addSchedule({
            name: name,
            phone_number: phoneNumber,
            start_date:  scheduleModalStartTime,
            end_date: scheduleModalEndTime
        })
      } else {
          editSchedule({
            name: name,
            phone_number: phoneNumber,
            start_date:  scheduleModalStartTime,
            end_date: scheduleModalEndTime
        })
      }
      setIsModalOpen(false);
      setIsOpenInParent(false)
          
        }}>ADD SCHEDULE</button>
      </div>
    </div>
};

function mapStateToProps(state: IStore) {
  return {
    schedule: state.schedule.schedule,
    isNewSchedule: state.modal.isNewSchedule,
    scheduleModalStartTime: state.modal.scheduleModalStartTime,
    scheduleModalEndTime: state.modal.scheduleModalEndTime,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerModal);