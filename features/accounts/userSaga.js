import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { registerAPI, wakeUp, loginAPI, changePassword, requestResetPassword } from '../../services/api'

const userAction = userSlice.actions

export const getUserInfo = createAction(`${userSlice.name}/getUserInfo`)
export const userLogin = createAction(`${userSlice.name}/userLogin`)

export const wakeUpAction = createAction(`${userSlice.name}/wakeUp`)

export function* saveUserInfoSaga({ payload }) {
    const { fullName, email, password, userInfoCreated } = payload

    const body = {
        email: email,
        password: password,
        full_name: fullName,
    }
    const response = yield call(registerAPI, body)
    if (response.ok) {
        const { token } = yield response.json()
        yield call(AsyncStorage.setItem, 'bayaqUserToken', JSON.stringify({ token }))

        userInfoCreated()
    } else {
        alert('Incorrect email format or email has already registered.')
    }

}
export function* userLoginSaga({ payload }) {
    const { email, password, userInfoCreated } = payload

    const body = {
        email: email,
        password: password,
    }
    const response = yield call(loginAPI, body)
    if (response.ok) {
        const { token } = yield response.json()
        yield call(AsyncStorage.setItem, 'bayaqUserToken', JSON.stringify({ token }))

        userInfoCreated()
    } else {
        alert('Incorrect email or password.')
    }

}
export function* getUserInfoSaga() {
    yield call(wakeUp)
    const userInfo = yield call(AsyncStorage.getItem, 'bayaqUserToken')
    yield put(userAction.setUserToken({ ...JSON.parse(userInfo), userInfoCreated: () => { } }))
}
export function* wakeUpSaga() {
    yield call(wakeUp)
}
export function* userLogoutSaga() {
    yield call(AsyncStorage.removeItem, 'bayaqUserToken')
}
export function* changePasswordSaga({ payload }) {

    const response = yield call(changePassword, payload)
    if (response.ok) {
        alert('Password successfully changed!. Please login with your new password')
    }

}

export function* resetPasswordSaga({ payload }) {
    const { email, resetPasswordSuccess } = payload
    const body = {
        email: email,
    }
    const response = yield call(requestResetPassword, body)
    if (response.ok) {

        resetPasswordSuccess()
    } else {
        alert('Incorrect email format or email has already registered.')
    }

}



export const userSaga = [
    takeLatest(userAction.resetPassword.type, resetPasswordSaga),
    takeLatest(wakeUpAction.type, wakeUpSaga),
    takeLatest(userAction.addUserInfo.type, saveUserInfoSaga),
    takeLatest(userAction.changePassword.type, changePasswordSaga),
    takeLatest(getUserInfo.type, getUserInfoSaga),
    takeLatest(userLogin.type, userLoginSaga),
    takeLatest(userAction.userLogout.type, userLogoutSaga),
]
