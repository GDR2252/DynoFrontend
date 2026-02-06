export const WALLET_FETCH_REQUEST = "WALLET_FETCH_REQUEST";
export const WALLET_FETCH_SUCCESS = "WALLET_FETCH_SUCCESS";
export const WALLET_FETCH_FAILURE = "WALLET_FETCH_FAILURE";
export const ADD_WALLET_VALIDATE_REQUEST = "WALLET_VALIDATE_REQUEST";
export const ADD_WALLET_VALIDATE_SUCCESS = "WALLET_VALIDATE_SUCCESS";
export const ADD_WALLET_VALIDATE_FAILURE = "WALLET_VALIDATE_FAILURE";
export const ADD_WALLET_VALIDATE_OTP_REQUEST = "WALLET_VALIDATE_OTP_REQUEST";
export const ADD_WALLET_VALIDATE_OTP_SUCCESS = "WALLET_VALIDATE_OTP_SUCCESS";
export const ADD_WALLET_VALIDATE_OTP_FAILURE = "WALLET_VALIDATE_OTP_FAILURE";

export const fetchWalletRequest = (companyId: number) => ({
  type: WALLET_FETCH_REQUEST,
  payload: { companyId },
});

export const fetchWalletSuccess = (data: any[]) => ({
  type: WALLET_FETCH_SUCCESS,
  payload: data,
});

export const fetchWalletFailure = (error: string) => ({
  type: WALLET_FETCH_FAILURE,
  payload: error,
});

export const validateWalletRequest = (payload: {
  isResend: boolean;
  wallet_address: string;
  currency: string;
  company_id: number;
  wallet_name: string | null;
}) => ({
  type: ADD_WALLET_VALIDATE_REQUEST,
  payload,
});

export const validateWalletSuccess = (data: any) => ({
  type: ADD_WALLET_VALIDATE_SUCCESS,
  payload: data,
});

export const validateWalletFailure = (error: string) => ({
  type: ADD_WALLET_VALIDATE_FAILURE,
  payload: error,
});

export const validateWalletOtpRequest = (payload: {
  wallet_address: string;
  currency: string;
  company_id: number;
  wallet_name: string | null;
  otp: string;
}) => ({
  type: ADD_WALLET_VALIDATE_OTP_REQUEST,
  payload,
});

export const validateWalletOtpSuccess = (data: any) => ({
  type: ADD_WALLET_VALIDATE_OTP_SUCCESS,
  payload: data,
});

export const validateWalletOtpFailure = (error: string) => ({
  type: ADD_WALLET_VALIDATE_OTP_FAILURE,
  payload: error,
});
