import * as React from "react";
import { IStore, IScheduleState } from "@reducers";
import {ISchedule} from "@models/Schedule"
import { connect } from "react-redux";
import scheduleCardStyle from "@styles/ScheduleCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

type ScheduleProps = {
    scheduleInfo: ISchedule;
}

const randomColorSelection = (): string => {
    const colors = ['yellow', 'blue', 'orange', 'green', 'purple', 'red'];
    return colors[Math.floor(Math.random()*colors.length)];
}

const getInitials = (name): string => {
   return name.charAt(0);
}

const ScheduleInfoCard: React.FC <ScheduleProps>  = ({scheduleInfo}) => {
    const randomColor = randomColorSelection();
    return <div className={`${scheduleCardStyle.schedule_card_cntr} ${scheduleCardStyle[randomColor]} ${scheduleCardStyle.box_shadow}`} >
            <div className={scheduleCardStyle.initials}><span>{getInitials(scheduleInfo.name)}</span></div>
            <div className={scheduleCardStyle.wrapper}>
                
                <div className={scheduleCardStyle.name}>{scheduleInfo.name}</div>
                <div className={scheduleCardStyle.telephone}><FontAwesomeIcon icon={faPhoneAlt} /><span>{scheduleInfo.phone_number}</span></div>
            </div>
            <div className={scheduleCardStyle.time}>{`${moment(scheduleInfo.start_date).format('h:mm a')} to ${moment(scheduleInfo.end_date).format('h:mm a')}`}</div>
    </div>
};

const mapStateToProps = (state: IStore): IScheduleState => state.schedule;
export default connect(mapStateToProps)(ScheduleInfoCard);