import { takeLatest, select, put, call, takeEvery, delay } from 'redux-saga/effects';
import { userInfoSelector } from '../accounts/userSlice'
import { getInvoicesAPI } from '../../services/api'
import invoiceSlice from './invoiceSlice'
import { createAction } from '@reduxjs/toolkit'


const invoiceAction = invoiceSlice.actions


export function* getBillSaga() {
    const userInfo = yield select(userInfoSelector)
    const response = yield call(getInvoicesAPI, userInfo.token)

    if (response.ok) {
        const { invoices } = yield response.json()
        yield put(invoiceAction.fetchInvoiceSuccess(invoices))

    }

}


export const invoiceSaga = [
    takeLatest(invoiceAction.fetchInvoice, getBillSaga),

]
