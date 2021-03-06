import { ActionType, getType } from "typesafe-actions";

import * as actions from "@actions/ModalActions";

// INITIAL STATE
export interface IModalState {
    scheduleModalStartTime: Date;
    scheduleModalEndTime: Date;
}

export const initialModalState: IModalState = {
    scheduleModalStartTime: new Date(),
    scheduleModalEndTime: new Date()
}

// REDUCER
export const ModalReducer = (
    state: IModalState = initialModalState,
    action: ActionType<typeof actions>
): IModalState => {
    if(action.type === getType(actions.setModalStartTime)) {
        return {
            ...state,
            scheduleModalStartTime: action.payload
        };
    } 

    if(action.type === getType(actions.setModalEndTime)) {
        return {
            ...state,
            scheduleModalEndTime: action.payload
        };
    } 
    return state;
}