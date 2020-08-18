import * as React from "react";
// import style from "./schedulerBg.scss";
import styles from "../../../styles/scheduleBg.scss";
import { IStore, IScheduleState, IModalState } from "@reducers";
import { connect } from "react-redux";
import Modal from "@components/Modal";
import ScheduleInfoCard from '@components/Card';
import * as ModalActions from "@actions/ModalActions";
import * as ScheduleActions from "@actions/ScheduleActions";
import {getFormattedDate, getDateFromHour, castToDate } from "../../util";

const getTimeSlots = (): number[] => {
    return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
};

const mapDispatchToProps = {
    setModalVisibility: ScheduleActions.setModalVisibility,
    setModalStartTime: ModalActions.setModalStartTime,
    setModalEndTime: ModalActions.setModalEndTime
};

const SchedulerBackground: React.FC<IScheduleState & IModalState & typeof mapDispatchToProps> = ({
    schedule,
    setModalStartTime,
    setModalEndTime
}) => {
    const [isOpen, setIsopen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [isNewSchedule, setIsNewSchedule] = React.useState<boolean>(false);

    return <div className={styles.schedule_bg_wrapper} >
        {    
            getTimeSlots().map( time => {
                return <div className={styles.schedule_cntr} key={time} onClick={() => {
                    let startTime = getDateFromHour(time)
                    let endTime = getDateFromHour(time + 1)

                    setModalStartTime(startTime)
                    setModalEndTime(endTime)
                    setIsopen(true);

                    let matchingSchedules = schedule.filter((e) => {
                        return castToDate(e.start_date).getHours() == time
                    })
                    if(matchingSchedules.length > 0) {
                        const matchingSchedule = matchingSchedules[0]
                        setName(matchingSchedule.name == undefined? "": matchingSchedule.name)
                        setPhoneNumber(matchingSchedule.phone_number == undefined? "": matchingSchedule.phone_number)
                        setIsNewSchedule(true)
                    } else {
                        setName("")
                        setPhoneNumber("")
                        setIsNewSchedule(false)
                    }
                  }}>
                    <div className={styles.schedule_timer} key={time}>{getFormattedDate(getDateFromHour(time))}</div>
                    <div className={styles.schedule_start_border}></div>
                    {schedule.filter((e) => {
                        return castToDate(e.start_date).getHours() == time
                    } ).map((e)=> {
                        return <ScheduleInfoCard scheduleInfo={e}/>
                    })}
                    
                </div>
            })
        }  
        <Modal value='modal' setIsOpenInParent ={setIsopen}  isNewSchedule={isNewSchedule} isOpen={isOpen} savedName={name} savedPhoneNumber={phoneNumber}/> 
    </div>
};

function mapStateToProps(state: IStore) {
    
    return {
      schedule: state.schedule.schedule,
      scheduleModalStartTime: state.modal.scheduleModalStartTime,
      scheduleModalEndTime: state.modal.scheduleModalEndTime,
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerBackground);