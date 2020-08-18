import { ISchedule } from "@models/Schedule";
import { createAction } from "typesafe-actions";

export const addEditSchedule = createAction('ADD_EDIT_SCHEDULE')<ISchedule>();

export const setModalVisibility = createAction('MODAL_VISIBILITY')<boolean>();
