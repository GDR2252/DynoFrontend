import { takeEvery } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
import { USER_INIT } from "../Actions/UserAction";
import { UserSaga } from "./UserSaga";
import { TOAST_INIT } from "../Actions/ToastAction";
import { ToastSaga } from "./ToastSaga";
import { COMPANY_INIT } from "../Actions/CompanyAction";
import { CompanySaga } from "./CompanySaga";
import { API_INIT } from "../Actions/ApiAction";
import { ApiSaga } from "./ApiSaga";
import { TRANSACTION_INIT } from "../Actions/TransactionAction";
import { TransactionSaga } from "./TransactionSaga";
import { DASHBOARD_INIT } from "../Actions/DashboardAction";
import { DashboardSaga } from "./DashboardSaga";
import {
  WALLET_FETCH_REQUEST,
  ADD_WALLET_VALIDATE_REQUEST,
  ADD_WALLET_VALIDATE_OTP_REQUEST,
} from "../Actions/WalletAction";
import {
  fetchWalletSaga,
  validateWalletOtpSaga,
  validateWalletSaga,
} from "./WalletSaga";

function* RootSaga() {
  yield takeEvery(USER_INIT, UserSaga);
  yield takeEvery(TOAST_INIT, ToastSaga);
  yield takeEvery(COMPANY_INIT, CompanySaga);
  yield takeEvery(API_INIT, ApiSaga);
  yield takeEvery(TRANSACTION_INIT, TransactionSaga);
  yield takeEvery(DASHBOARD_INIT, DashboardSaga);
  yield takeLatest(WALLET_FETCH_REQUEST, fetchWalletSaga);
  yield takeLatest(ADD_WALLET_VALIDATE_REQUEST, validateWalletSaga);
  yield takeLatest(ADD_WALLET_VALIDATE_OTP_REQUEST, validateWalletOtpSaga);
}

export default RootSaga;
