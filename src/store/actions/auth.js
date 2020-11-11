import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authStart());

    }
}
