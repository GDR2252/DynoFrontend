import { call, put } from "redux-saga/effects";
import axios from "@/axiosConfig";
import {
  fetchWalletSuccess,
  fetchWalletFailure,
  validateWalletSuccess,
  validateWalletFailure,
  validateWalletOtpSuccess,
  validateWalletOtpFailure,
} from "../Actions/WalletAction";
import { TOAST_SHOW } from "../Actions/ToastAction";

export function* fetchWalletSaga(action: any): any {
  try {
    const { companyId } = action.payload;

    const response = yield call(
      axios.get,
      `wallet/getWallet?company_id=${companyId}`,
    );

    yield put(fetchWalletSuccess(response.data.data));
  } catch (e: any) {
    const message =
      e?.response?.data?.message || e.message || "Wallet fetch failed";

    yield put(fetchWalletFailure(message));

    yield put({
      type: TOAST_SHOW,
      payload: { message, severity: "error" },
    });
  }
}

export function* validateWalletSaga(action: any): any {
  try {
    const payload = action.payload;
    console.log(payload);

    const data = {
      wallet_address: payload.wallet_address,
      currency: payload.currency,
      company_id: payload.company_id,
      wallet_name: payload.wallet_name,
    };

    const response = yield call(
      axios.post,
      "wallet/validateWalletAddress",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    yield put(validateWalletSuccess(response.data.data));

    yield put({
      type: TOAST_SHOW,
      payload: { message: payload.isResend ? "OTP Resend to your Email" : response.data.message, severity: "success" },
    });
  } catch (e: any) {
    const message =
      e?.response?.data?.message || e.message || "Wallet validation failed";

    yield put(validateWalletFailure(message));

    yield put({
      type: TOAST_SHOW,
      payload: { message, severity: "error" },
    });
  }
}

export function* validateWalletOtpSaga(action: any): any {
  try {
    const payload = action.payload;
    console.log(payload);

    const response = yield call(axios.post, "wallet/verifyOtp", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(validateWalletOtpSuccess(response.data.data));

    yield put({
      type: TOAST_SHOW,
      payload: { message: response.data.message, severity: "success" },
    });
  } catch (e: any) {
    const message =
      e?.response?.data?.message || e.message || "Wallet OTP validation failed";

    yield put(validateWalletOtpFailure(message));

    yield put({
      type: TOAST_SHOW,
      payload: { message, severity: "error" },
    });
  }
}
