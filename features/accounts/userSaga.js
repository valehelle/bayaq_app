import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { registerAPI, wakeUp, loginAPI, getUserProfile, setBankCode, requestResetPassword } from '../../services/api'
import { userInfoSelector } from '../accounts/userSlice'

const userAction = userSlice.actions

export const getUserInfo = createAction(`${userSlice.name}/getUserInfo`)
export const userLogin = createAction(`${userSlice.name}/userLogin`)
export const getUserToken = createAction(`${userSlice.name}/userToken`)

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

        yield put(userAction.setUserToken({ token, userInfoCreated: () => { } }))

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

        yield put(userAction.setUserToken({ token, userInfoCreated: () => { } }))
    } else {
        alert('Incorrect email or password.')
    }

}

export function* getUserTokenSaga() {
    yield call(wakeUp)
    const userInfo = yield call(AsyncStorage.getItem, 'bayaqUserToken', '')
    if (userInfo !== null) {
        yield put(userAction.setUserToken({ ...JSON.parse(userInfo), userInfoCreated: () => { } }))
    }
    else {
        yield put(userAction.setUserToken({ token: "", userInfoCreated: () => { } }))
    }
}

export function* getUserInfoSaga() {
    yield call(wakeUp)
    const userInfo = yield call(AsyncStorage.getItem, 'bayaqUserToken')
    yield put(userAction.setUserToken({ ...JSON.parse(userInfo), userInfoCreated: () => { } }))
    const response = yield call(getUserProfile, JSON.parse(userInfo))
    if (response.ok) {
        const userProfile = yield response.json()
        yield put(userAction.setUserProfile({ ...userProfile }))


    }
}
export function* setUserBank({ payload }) {
    const userInfo = yield select(userInfoSelector)

    const bankCode = payload
    const body = {
        bank_code: bankCode.bankCode
    }
    const response = yield call(setBankCode, body, userInfo.token)

}
export function* wakeUpSaga() {
    yield call(wakeUp)
}
export function* userLogoutSaga() {
    yield call(AsyncStorage.removeItem, 'bayaqUserToken')
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
    takeLatest(wakeUpAction.type, wakeUpSaga),

    takeLatest(userAction.resetPassword.type, resetPasswordSaga),
    takeLatest(userAction.addUserInfo.type, saveUserInfoSaga),
    takeLatest(getUserInfo.type, getUserInfoSaga),
    takeLatest(userLogin.type, userLoginSaga),
    takeLatest(userAction.userLogout.type, userLogoutSaga),
    takeLatest(userAction.setUserBank.type, setUserBank),
    takeLatest(getUserToken.type, getUserTokenSaga)
]
