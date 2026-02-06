import { IWalletReducer } from "@/utils/types";
import {
  WALLET_FETCH_REQUEST,
  WALLET_FETCH_SUCCESS,
  WALLET_FETCH_FAILURE,
  ADD_WALLET_VALIDATE_REQUEST,
  ADD_WALLET_VALIDATE_SUCCESS,
  ADD_WALLET_VALIDATE_FAILURE,
  ADD_WALLET_VALIDATE_OTP_REQUEST,
  ADD_WALLET_VALIDATE_OTP_SUCCESS,
  ADD_WALLET_VALIDATE_OTP_FAILURE,
} from "../Actions/WalletAction";

const walletInitialState: IWalletReducer = {
  walletList: [],
  validationResult: null,
  otpValidateResult: null,
  loading: false,
  validationLoading: false,
  otpValidationLoading: false,
  error: null,

  amount: 0,
  currency: "USD",
};

const walletReducer = (state = walletInitialState, action: any) => {
  switch (action.type) {
    case WALLET_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case WALLET_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        walletList: action.payload,
      };

    case WALLET_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_WALLET_VALIDATE_REQUEST:
      return {
        ...state,
        validationLoading: true,
        error: null,
        validationResult: null,
      };

    case ADD_WALLET_VALIDATE_SUCCESS:
      return {
        ...state,
        validationLoading: false,
        validationResult: action.payload,
      };

    case ADD_WALLET_VALIDATE_FAILURE:
      return {
        ...state,
        validationLoading: false,
        error: action.payload,
      };

    case ADD_WALLET_VALIDATE_OTP_REQUEST:
      return {
        ...state,
        otpValidationLoading: true,
        error: null,
        otpValidateResult: null,
      };

    case ADD_WALLET_VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        otpValidationLoading: false,
        otpValidateResult: action.payload,
      };

    case ADD_WALLET_VALIDATE_OTP_FAILURE:
      return {
        ...state,
        otpValidationLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default walletReducer;
