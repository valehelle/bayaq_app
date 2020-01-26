import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import userSlice from './userSlice'
const userAction = userSlice.actions


export const saveEmail = createAction(`${userSlice.name}/saveEmailSaga`)
export const getEmail = createAction(`${userSlice.name}/getEmailSaga`)


export function* saveEmailSaga({ payload }) {
    const { email } = payload
    yield put(userAction.addEmail(email))
    yield call(AsyncStorage.setItem, 'bayaqUserEmail', email)
}
export function* getEmailSaga() {
    const email = yield call(AsyncStorage.getItem, 'bayaqUserEmail')
    yield put(userAction.addEmail(email))
}

export const userSaga = [
    takeLatest(saveEmail.type, saveEmailSaga),
    takeLatest(getEmail.type, getEmailSaga),
]
