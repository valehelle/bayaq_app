import { takeLatest, select, put, call, takeEvery, delay } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { createAction } from '@reduxjs/toolkit'
import { userInfoSelector } from '../accounts/userSlice'
import billsSlice, { isAutoUpdateSelector, billsSelector, selectedBillsSelector, isSuccessBillSelector } from './billsSlice'
import { payBill, getBillAmountAPI, wakeUp, getBillsAPI, createBillAPI, deleteBillAPI, updateBillAPI } from '../../services/api'
import { v4 as uuidv4 } from 'uuid';

const billsAction = billsSlice.actions


export const getBillAmount = createAction(`${billsSlice.name}/getBillAmountSaga`)
export const getBillAmountFromServer = createAction(`${billsSlice.name}/getBillAmountFromServerSaga`)
export const getBillAmountFromServerWithCallback = createAction(`${billsSlice.name}/getBillAmountFromServerWithCallbackSaga`)

export function* addBillSaga({ payload }) {
    const userInfo = yield select(userInfoSelector)
    const { billCreated } = payload
    const { ref1, ref2, companyName, billerCode, type, amount } = payload.bill
    const param = {
        ref1,
        ref2,
        type,
        amount,
        company_name: companyName,
        biller_code: billerCode,
    }
    const response = yield call(createBillAPI, param, userInfo.token)
    if (response.ok) {
        const { bill } = yield response.json()
        const formattedBill = {
            ...bill,
            companyName: bill.company_name,
            billerCode: bill.biller_code
        }
        //yield put(billsAction.getBill())
        yield put(billsAction.addBillSuccess({ bill: formattedBill }))
        billCreated()
    } else {
        alert('Ops please try again later.')
    }

}




export function* getBillSaga() {
    const userInfo = yield select(userInfoSelector)
    const response = yield call(getBillsAPI, userInfo.token)

    if (response.ok) {
        const { bills } = yield response.json()
        const formattedBills = bills.map(bill => ({
            ref1: bill.ref1,
            ref2: bill.ref2,
            billerCode: bill.biller_code,
            companyName: bill.company_name,
            type: bill.type,
            amount: bill.amount,
            id: bill.id
        }))
        if (bills) {
            yield put(billsAction.setBill(formattedBills))
        }

        const isSuccess = yield select(isSuccessBillSelector)
        if (isSuccess) {
            yield put(billsAction.setIsSuccess({ isSuccess: false }))
        }

        yield put(billsAction.getBillSuccess())

    }

}


export function* getPaymentUrlSaga({ payload }) {
    const bills = yield select(selectedBillsSelector)
    const userInfo = yield select(userInfoSelector)
    const bankCode = payload.bankCode
    const billsWithEmail = bills.map((bill) => {
        const { ref1, ref2, amount, companyName, billerCode } = bill
        return { ref1, ref2, amount, id: uuidv4(), companyName, billerCode }
    }
    )

    const body = {
        bank_code: bankCode,
        bills: billsWithEmail
    }
    const token = userInfo.token
    const response = yield call(payBill, body, token)
    if (response.ok) {
        const payload = yield response.json()
        yield put(billsAction.getPaymentUrlSuccess({ paymentUrl: payload.url + "?auto_submit=true" }))
    } else {
        yield put(billsAction.getPaymentUrlFail({ paymentUrl: payload.url + "?auto_submit=true" }))

    }

}

export function* getBillAmountSaga() {
    const bills = yield select(billsSelector)
    const selectedBills = bills.filter((bill) => bill.billerCode == 68502 || bill.billerCode == 5454 || bill.billerCode == 4200 || bill.billerCode == 8144 || bill.billerCode == 9217)
    const autoUpdate = yield select(isAutoUpdateSelector)
    if (autoUpdate) {
        for (let i = 0; i < selectedBills.length; i++) {
            const bill = selectedBills[i]
            // yield put(getBillAmountFromServer(bill))
        }
        yield put(billsAction.autoUpdate())
    }

}



export function* getBillAmountFromServerSaga({ payload }) {
    const { billerCode, ref1, id } = payload

    const body = {
        account: ref1,
        billerCode
    }
    const param = {
        id,
        loading: true
    }

    yield put(billsAction.setBillStatus(param))

    const response = yield call(getBillAmountAPI, body)

    if (response.ok) {
        const { amount } = yield response.json()

        const bill = {
            ...payload,
            amount: amount
        }
        yield put(updateBill({ bill, billCreated: () => { } }))

    }
    const loadingParam = {
        id,
        loading: false
    }

    yield put(billsAction.setBillStatus(loadingParam))

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

    } else {
        callback({ amount: 0 })
    }
}
export function* removeBillSaga({ payload }) {
    const userInfo = yield select(userInfoSelector)
    const { billId } = payload
    const param = {
        id: billId
    }
    const response = yield call(deleteBillAPI, param, userInfo.token)
    if (response.ok) {
        yield put(billsAction.getBill())
    } else {
        alert('Failed to remove bill')
    }

}


export function* updateBillSaga({ payload }) {
    const userInfo = yield select(userInfoSelector)
    const { bill, billCreated } = payload
    const { ref1, ref2, companyName, billerCode, type, amount, id } = bill
    const param = {
        ref1,
        ref2,
        type,
        amount,
        company_name: companyName,
        biller_code: billerCode,
        id
    }
    const response = yield call(updateBillAPI, param, userInfo.token)

    if (response.ok) {
        yield put(billsAction.updateBillSuccess({ bill }))
        // yield put(billsAction.getBill())
        billCreated()
    } else {
        alert('Cannot update bill')
    }

}


export const billSaga = [
    takeLatest(billsAction.addBill.type, addBillSaga),
    takeLatest(billsAction.getBill, getBillSaga),
    takeLatest(billsAction.updateBill, updateBillSaga),
    takeLatest(billsAction.getPaymentUrl.type, getPaymentUrlSaga),
    takeLatest(billsAction.setBill, getBillAmountSaga),
    takeEvery(getBillAmountFromServer.type, getBillAmountFromServerSaga),
    takeLatest(getBillAmountFromServerWithCallback.type, getBillAmountFromServerWithCallbackSaga),
    takeLatest(billsAction.removeBill, removeBillSaga)
]
