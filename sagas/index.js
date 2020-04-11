import { all } from 'redux-saga/effects';

import { billSaga } from '../features/bills/billsSaga'
import { userSaga } from '../features/accounts/userSaga'
import { invoiceSaga } from '../features/invoices/invoiceSaga'


function* watchAll() {
    yield all([...billSaga, ...userSaga, ...invoiceSaga]);
}


export default watchAll;