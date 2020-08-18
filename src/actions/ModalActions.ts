import { createAction } from "typesafe-actions";

export const setModalStartTime = createAction('MODAL_START_TIME')<Date>();

export const setModalEndTime = createAction('MODAL_END_TIME')<Date>();
