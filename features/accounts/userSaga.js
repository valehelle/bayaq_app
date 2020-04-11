import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { registerAPI, wakeUp } from '../../services/api'

const userAction = userSlice.actions

export const getUserInfo = createAction(`${userSlice.name}/getUserInfo`)


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
export function* getUserInfoSaga() {
    yield call(wakeUp)
    const userInfo = yield call(AsyncStorage.getItem, 'bayaqUserToken')
    yield put(userAction.setUserToken({ ...JSON.parse(userInfo), userInfoCreated: () => { } }))
}

export const userSaga = [
    takeLatest(userAction.addUserInfo.type, saveUserInfoSaga),
    takeLatest(getUserInfo.type, getUserInfoSaga),
]
