import { call, put } from "redux-saga/effects";
import axios from "@/axiosConfig";
import { TOAST_SHOW } from "../Actions/ToastAction";
import {
  DASHBOARD_API_ERROR,
  DASHBOARD_CHART,
  DASHBOARD_FETCH,
} from "../Actions/DashboardAction";

interface IDashboardAction {
  crudType: string;
  payload: any;
}

export function* DashboardSaga(action: IDashboardAction): unknown {
  switch (action.crudType) {
    case DASHBOARD_FETCH:
      yield getDashboard(action.payload);
      break;

    case DASHBOARD_CHART:
      yield getDashboardChart(action.payload);
      break;

    default:
      yield put({ type: DASHBOARD_API_ERROR });
      break;
  }
}

function* getDashboard(payload: any): unknown {
  try {
    const { id } = payload;

    const {
      data: { data, message },
    } = yield call(axios.get, `dashboard/?company_id=${id}`);

    yield put({
      type: DASHBOARD_FETCH,
      payload: data,
    });
  } catch (e: any) {
    const message = e.response?.data?.message ?? e.message;

    yield put({
      type: TOAST_SHOW,
      payload: {
        message,
        severity: "error",
      },
    });

    yield put({
      type: DASHBOARD_API_ERROR,
    });
  }
}


function* getDashboardChart(payload: any): unknown {
  try {
    const { id, period } = payload;

    const {
      data: { data, message },
    } = yield call(axios.get, `dashboard/chart?period=${period}&company_id=${id}`);

    yield put({
      type: DASHBOARD_CHART,
      payload: data,
    });
  } catch (e: any) {
    const message = e.response?.data?.message ?? e.message;

    yield put({
      type: TOAST_SHOW,
      payload: {
        message,
        severity: "error",
      },
    });

    yield put({
      type: DASHBOARD_API_ERROR,
    });
  }
}