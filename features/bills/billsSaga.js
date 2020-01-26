import { takeLatest, select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import { userEmailSelector } from '../accounts/userSlice'
import billsSlice, { billsSelector } from './billsSlice'
import { payBill } from '../../services/api'

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

export function* payBillsSaga() {
    const bills = yield select(billsSelector)
    const userEmail = yield select(userEmailSelector)
    const body = {
        email: userEmail,
        bills
    }
    const response = yield call(payBill, body)
    if (response.ok) {
        const payload = yield response.json()
        const stripe = Stripe('pk_test_Uxe4unnl26w2juaWX7YErdfg00CmH5qqg0')
        stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: payload.stripe_id
        }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        });
        console.log(payload)
    }

}


export const billSaga = [
    takeLatest(addBill.type, addBillSaga),
    takeLatest(getBill.type, getBillSaga),
    takeLatest(updateBill.type, updateBillSaga),
    takeLatest(billsAction.payBills.type, payBillsSaga)

]
