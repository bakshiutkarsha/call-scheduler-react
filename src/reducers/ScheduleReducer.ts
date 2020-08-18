import { ActionType, getType } from "typesafe-actions";

import * as actions from "@actions/ScheduleActions";

import { ISchedule } from "@models/Schedule";

// INITIAL STATE
export interface IScheduleState {
    schedule: ISchedule[]
}

export const initialScheduleState: IScheduleState = {
    schedule: []
}

// REDUCER
export const ScheduleReducer = (
    state: IScheduleState = initialScheduleState,
    action: ActionType<typeof actions>
): IScheduleState => {
    if(action.type === getType(actions.addEditSchedule)) {
        let newSchedule = state.schedule.slice()

        if(newSchedule.filter((e) => {
            return e.start_date?.getHours() == action.payload.start_date?.getHours()
        }).length > 0) {
            newSchedule.map((e) => {
                if(e.start_date?.getHours() == action.payload.start_date?.getHours()) {
                    e.name = action.payload.name
                    e.phone_number = action.payload.phone_number
                }
            })
        } else {
            newSchedule.push(action.payload)
        }

        return {
            ...state,
            schedule: newSchedule
        };
    }
    return state;
}