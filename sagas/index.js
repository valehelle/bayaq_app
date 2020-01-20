import { all } from 'redux-saga/effects';

import { todoSaga } from '../features/todos/todoSaga'


function* watchAll() {
    yield all([...todoSaga]);
}


export default watchAll;