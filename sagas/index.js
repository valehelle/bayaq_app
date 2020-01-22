import { all } from 'redux-saga/effects';

import { billSaga } from '../features/bills/billsSaga'


function* watchAll() {
    yield all([...billSaga]);
}


export default watchAll;