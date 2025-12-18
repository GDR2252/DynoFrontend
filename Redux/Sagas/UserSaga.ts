// https://jsonplaceholder.typicode.com/todos/1

import { call, put } from "redux-saga/effects";
import {
  USER_API_ERROR,
  USER_CONFIRM_CODE,
  USER_LOGIN,
  USER_REGISTER,
  USER_SEND_OTP,
  USER_UPDATE,
  USER_UPDATE_PASSWORD,
} from "../Actions/UserAction";
import axios from "@/axiosConfig";
import { TOAST_SHOW } from "../Actions/ToastAction";
import { unAuthorizedHelper } from "@/helpers";

interface IUserAction {
  crudType: string;
  payload: any;
}

export function* UserSaga(action: IUserAction): unknown {
  switch (action.crudType) {
    case USER_LOGIN:
      yield userLogin(action.payload);
      break;
    case USER_REGISTER:
      yield registerUser(action.payload);
      break;
    case USER_SEND_OTP:
      yield generateOTP(action.payload);
      break;
    case USER_CONFIRM_CODE:
      yield confirmOTP(action.payload);
      break;
    case USER_UPDATE:
      yield updateUser(action.payload);
      break;
    case USER_UPDATE_PASSWORD:
      yield changePassword(action.payload);
      break;
    default:
      yield put({ type: USER_API_ERROR });
      break;
  }
}

export function* userLogin(payload: any): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "user/login", payload);
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: USER_LOGIN,
      payload: { ...data.userData, accessToken: data.accessToken },
    });
  } catch (e: any) {
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}

export function* registerUser(payload: any): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "user/registerUser", payload);
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: USER_REGISTER,
      payload: { ...data.userData, accessToken: data.accessToken },
    });
  } catch (e: any) {
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}

export function* generateOTP(payload: any): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "user/generateOTP", payload);
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
  } catch (e: any) {
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}

export function* confirmOTP(payload: any): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "user/confirmOTP", payload);
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: USER_LOGIN,
      payload: { ...data.userData, accessToken: data.accessToken },
    });
  } catch (e: any) {
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}

function* updateUser(payload: any): unknown {
  try {
    const {
      data: { message, data },
    } = yield call(axios.put, "/user/updateUser", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: USER_UPDATE,
      payload: data,
    });
  } catch (e: any) {
    unAuthorizedHelper(e);
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}

function* changePassword(payload: any): unknown {
  try {
    const {
      data: { message, data },
    } = yield call(axios.put, "/user/changePassword", payload);

    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
  } catch (e: any) {
    unAuthorizedHelper(e);
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: USER_API_ERROR,
    });
  }
}
