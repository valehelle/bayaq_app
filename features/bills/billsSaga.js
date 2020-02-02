import { takeLatest, select, put, call, takeEvery, delay } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import { userInfoSelector } from '../accounts/userSlice'
import billsSlice, { billsSelector, selectedBillsSelector, isSuccessBillSelector } from './billsSlice'
import { payBill, getBillAmountAPI, wakeUp } from '../../services/api'

const billsAction = billsSlice.actions
const uuidv4 = require('uuid/v4');


export const addBill = createAction(`${billsSlice.name}/addBillSaga`)
export const getBill = createAction(`${billsSlice.name}/getBillSaga`)
export const updateBill = createAction(`${billsSlice.name}/updateBillSaga`)
export const getBillAmount = createAction(`${billsSlice.name}/getBillAmountSaga`)
export const getBillAmountFromServer = createAction(`${billsSlice.name}/getBillAmountFromServerSaga`)
export const getBillAmountFromServerWithCallback = createAction(`${billsSlice.name}/getBillAmountFromServerWithCallbackSaga`)

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
    yield call(wakeUp)
    const isSuccess = yield select(isSuccessBillSelector)
    if (isSuccess) {
        alert('Thank You for your payment. We will email you once all your bills have been processed')
        yield put(billsAction.setIsSuccess({ isSuccess: false }))
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
    const bills = yield select(selectedBillsSelector)
    const userInfo = yield select(userInfoSelector)
    const billsWithEmail = bills.map((bill) => { return { ...bill, email: userInfo.email } })

    const body = {
        email: userInfo.email,
        bills: billsWithEmail
    }
    const response = yield call(payBill, body)
    if (response.ok) {
        const payload = yield response.json()
        const stripe = Stripe('pk_live_zfDeWPmspcM0S1ZrT2KSyoBg00EpWFojAP')
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

export function* getBillAmountSaga() {
    const bills = yield select(billsSelector)
    const selectedBills = bills.filter((bill) => bill.billerCode == 68502 || bill.billerCode == 5454)
    for (let i = 0; i < selectedBills.length; i++) {
        const bill = selectedBills[i]
        yield put(getBillAmountFromServer(bill))
    }
}

export function* getBillAmountFromServerSaga({ payload }) {
    const { billerCode, ref1 } = payload

    const body = {
        account: ref1,
        billerCode
    }

    const response = yield call(getBillAmountAPI, body)

    if (response.ok) {
        const { amount } = yield response.json()
        const bill = {
            ...payload,
            amount: amount
        }
        yield put(updateBill({ bill, billCreated: () => { } }))

    }

}

export function* getBillAmountFromServerWithCallbackSaga({ payload }) {
    const { billerCode, ref1 } = payload.bill
    const { callback } = payload
    const body = {
        account: ref1,
        billerCode
    }

    const response = yield call(getBillAmountAPI, body)

    if (response.ok) {
        const { amount } = yield response.json()
        callback({ amount })

    }

}
export function* removeBillSaga() {
    const bills = yield select(billsSelector)
    yield call(AsyncStorage.setItem, 'bayaqBills', JSON.stringify(bills))
}


export const billSaga = [
    takeLatest(addBill.type, addBillSaga),
    takeLatest(getBill.type, getBillSaga),
    takeLatest(updateBill.type, updateBillSaga),
    takeLatest(billsAction.payBills.type, payBillsSaga),
    takeLatest(billsAction.setBill, getBillAmountSaga),
    takeEvery(getBillAmountFromServer.type, getBillAmountFromServerSaga),
    takeLatest(getBillAmountFromServerWithCallback.type, getBillAmountFromServerWithCallbackSaga),
    takeLatest(billsAction.removeBill, removeBillSaga)
]
