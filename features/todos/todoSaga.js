import { takeLatest, select, put, call } from 'redux-saga/effects';
import { addTodo } from './todosSlice'

export function* start() {
    alert('weee')
}

export const todoSaga = [
    takeLatest(addTodo.type, start),
]
