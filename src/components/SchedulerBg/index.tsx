import * as React from "react";
// import style from "./schedulerBg.scss";
import styles from "../../../styles/scheduleBg.scss";
import { IStore, IScheduleState, IModalState } from "@reducers";
import { connect } from "react-redux";
import Modal from "@components/Modal";
import ScheduleInfoCard from '@components/Card';
import * as ModalActions from "@actions/ModalActions";
import * as ScheduleActions from "@actions/ScheduleActions";


const calculateTime = (time: number): String => {
    return time >= 8 && time < 12 ? "am" : "pm";
};

const mapDispatchToProps = {
    setModalVisibility: ScheduleActions.setModalVisibility,
    setModalStartTime: ModalActions.setModalStartTime,
    setModalEndTime: ModalActions.setModalEndTime,
    setIsNewSchedule: ModalActions.setIsNewSchedule
};

const SchedulerBackground: React.FC<IScheduleState & IModalState & typeof mapDispatchToProps> = ({
    schedule,
    setModalStartTime,
    setModalEndTime,
    setIsNewSchedule,
    isNewSchedule,
    scheduleModalStartTime,
    scheduleModalEndTime
}) => {
    const [isOpen, setIsopen] = React.useState<boolean>(false);

    return <div>
        {    
            [8, 9, 10, 11, 12, 1, 2, 3, 4, 5].map( time => {
                return <div className={styles.schedule_cntr} key={time} onClick={(e) => {
                    let startTime = new Date()
                    startTime.setHours(time)
                    startTime.setMinutes(0)
                    startTime.setSeconds(0)

                    let endTime = new Date()
                    endTime.setHours(time+1)
                    endTime.setMinutes(0)
                    endTime.setSeconds(0)

                    setModalStartTime(startTime)
                    setModalEndTime(endTime)
                    setIsopen(true);
                    setIsNewSchedule(schedule.filter((e) => {
                        return e.start_date?.getHours() == time
                    } ).length == 0)
                  }}>
                    <div className={styles.schedule_timer} key={time}>{time} {calculateTime(time)}</div>
                    <div className={styles.schedule_start_border}></div>
                    {schedule.filter((e) => {
                        console.log('here')
                        console.log(e.start_date?.getHours(), time)
                        return e.start_date?.getHours() == time
                    } ).map((e)=> {
                        console.log('inside')
                        return <ScheduleInfoCard scheduleInfo={e}/>
                    })}
                    
                </div>
            })
        }  
        {console.log('IS OPEN', isOpen)}
        <Modal value='modal' setIsOpenInParent ={setIsopen} isOpen={isOpen}/> 
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

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerBackground);