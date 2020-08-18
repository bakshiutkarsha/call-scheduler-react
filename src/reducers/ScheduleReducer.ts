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
    if(action.type === getType(actions.addSchedule)) {
        let newSchedule = state.schedule

        console.log(newSchedule.filter((e) => {
            console.log(e.start_date?.getHours(), action.payload.start_date?.getHours())
            e.start_date?.getHours() == action.payload.start_date?.getHours()
        }).length)

        if(newSchedule.filter((e) => {
            e.start_date?.getHours() == action.payload.start_date?.getHours()
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

        console.log('new schedule', newSchedule)

        return {
            ...state,
            schedule: newSchedule
        };
    } 

    if(action.type === getType(actions.editSchedule)) {
        let newSchedule = state.schedule

        console.log(newSchedule.filter((e) => {
            e.start_date == action.payload.start_date
        }).length)
        if(newSchedule.filter((e) => {
            e.start_date == action.payload.start_date
        }).length > 0) {
            newSchedule.map((e) => {
                if(e.start_date == action.payload.start_date) {
                    e.name = action.payload.name
                    e.phone_number = action.payload.phone_number
                }
            })
        } else {
            newSchedule.push(action.payload)
        }
        
        console.log('new schedule', newSchedule)
        return {
            ...state,
            schedule: newSchedule
        };
    }
    return state;
}