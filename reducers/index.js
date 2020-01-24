import { combineReducers } from 'redux'
import billsSlice from '../features/bills/billsSlice'
import userSlice from '../features/accounts/userSlice'
export default combineReducers({
    bills: billsSlice.reducer,
    user: userSlice.reducer
})