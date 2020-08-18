import * as React from "react";
import { IStore, IScheduleState } from "@reducers";
import {ISchedule} from "@models/Schedule"
import { connect } from "react-redux";
import scheduleCardStyle from "../../../styles/ScheduleCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { getFormattedDate, castToDate } from "../../util";

type ScheduleProps = {
    scheduleInfo: ISchedule;
}

const getInitials = (name): string => {
   return name.charAt(0);
}

const ScheduleInfoCard: React.FC <ScheduleProps>  = ({scheduleInfo}) => {
    const hours = castToDate(scheduleInfo.start_date).getHours();
    return <div className={`${scheduleCardStyle.schedule_card_cntr} ${scheduleCardStyle[`hour_${hours}`]} ${scheduleCardStyle.box_shadow}`} >
            <div className={scheduleCardStyle.initials}><span>{getInitials(scheduleInfo.name)}</span></div>
            <div className={scheduleCardStyle.name}>{scheduleInfo.name}</div>
            
                
            <div className={scheduleCardStyle.telephone}><FontAwesomeIcon icon={faPhoneAlt} /><span>{scheduleInfo.phone_number}</span></div>
          
            <div className={scheduleCardStyle.time}>{`${getFormattedDate(scheduleInfo.start_date)} to ${getFormattedDate(scheduleInfo.end_date)}`}</div>
    </div>
};

const mapStateToProps = (state: IStore): IScheduleState => state.schedule;
export default connect(mapStateToProps)(ScheduleInfoCard);