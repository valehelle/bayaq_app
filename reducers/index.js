import { combineReducers } from 'redux'
import billsReducer from '../features/bills/billsSlice'

export default combineReducers({
    bills: billsReducer,
})