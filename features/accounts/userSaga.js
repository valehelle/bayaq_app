import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import userSlice from './userSlice'
const userAction = userSlice.actions

export const getUserInfo = createAction(`${userSlice.name}/getUserInfo`)


export function* saveUserInfoSaga({ payload }) {
    const { fullName, email, userInfoCreated } = payload
    yield call(AsyncStorage.setItem, 'bayaqUserInfo', JSON.stringify({ email, fullName }))
    userInfoCreated()
}
export function* getUserInfoSaga() {
    const userInfo = yield call(AsyncStorage.getItem, 'bayaqUserInfo')
    yield put(userAction.addUserInfo({ ...JSON.parse(userInfo), userInfoCreated: () => { } }))
}

export const userSaga = [
    takeLatest(userAction.addUserInfo.type, saveUserInfoSaga),
    takeLatest(getUserInfo.type, getUserInfoSaga),
]
