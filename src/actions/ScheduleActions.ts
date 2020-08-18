import { ISchedule } from "@models/Schedule";
import { createAction } from "typesafe-actions";

export const addSchedule = createAction('ADD_SCHEDULE')<ISchedule>();

export const editSchedule = createAction('EDIT_SCHEDULE')<ISchedule>();

export const setModalVisibility = createAction('MODAL_VISIBILITY')<boolean>();
