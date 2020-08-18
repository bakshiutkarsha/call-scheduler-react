// import { ISchedule } from "@models/Schedule";
import { createAction } from "typesafe-actions";

// export const setModalVisibility = createAction('MODAL_VISIBLE')<boolean>();

export const setModalStartTime = createAction('MODAL_START_TIME')<Date>();

export const setModalEndTime = createAction('MODAL_END_TIME')<Date>();

export const setIsNewSchedule = createAction('MODAL_IS_NEW_SCHEDULE')<boolean>();
