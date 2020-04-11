import { combineReducers } from 'redux'
import billsSlice from '../features/bills/billsSlice'
import userSlice from '../features/accounts/userSlice'
import invoiceSlice from '../features/invoices/invoiceSlice'

export default combineReducers({
    bills: billsSlice.reducer,
    user: userSlice.reducer,
    invoice: invoiceSlice.reducer
})