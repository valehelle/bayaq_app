import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import billsSlice, { billsSelector } from './billsSlice'
const billsAction = billsSlice.actions
const uuidv4 = require('uuid/v4');

export const addBill = createAction(`${billsSlice.name}/addBillSaga`)
export const getBill = createAction(`${billsSlice.name}/getBillSaga`)
export const updateBill = createAction(`${billsSlice.name}/updateBillSaga`)

export function* addBillSaga({ payload }) {
    const { bill, billCreated } = payload
    const billId = uuidv4()
    const billWithId = { ...bill, id: billId }
    yield put(billsAction.addBill(billWithId))
    const bills = yield select(billsSelector)
    yield call(AsyncStorage.setItem, 'bayaqBills', JSON.stringify(bills))
    billCreated()
}

export function* getBillSaga() {
    const billsString = yield call(AsyncStorage.getItem, 'bayaqBills')
    const bills = JSON.parse(billsString)
    if (bills) {
        yield put(billsAction.setBill(bills))
    }

}

export function* updateBillSaga({ payload }) {
    const { bill, billCreated } = payload
    yield put(billsAction.updateBill(bill))
    const bills = yield select(billsSelector)
    yield call(AsyncStorage.setItem, 'bayaqBills', JSON.stringify(bills))
    billCreated()
}
export const billSaga = [
    takeLatest(addBill.type, addBillSaga),
    takeLatest(getBill.type, getBillSaga),
    takeLatest(updateBill.type, updateBillSaga),
]
