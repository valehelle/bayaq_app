import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import billsSlice, { billsSelector } from './billsSlice'
const billsAction = billsSlice.actions

export const addBill = createAction(`${billsSlice.name}/addBillSaga`)


export function* addBillSaga({ payload }) {
    const { bill, billCreated } = payload
    yield put(billsAction.addBill(bill))
    const bills = yield select(billsSelector)

    yield call(AsyncStorage.setItem, 'bayaqBills', JSON.stringify(bills))
    billCreated()
}

export const billSaga = [
    takeLatest(addBill.type, addBillSaga),
]
