import { createSlice, createSelector } from '@reduxjs/toolkit'

export const invoiceSelector = createSelector(
    state => state.invoice,
    invoice => invoice.list
)



const invoicesSlice = createSlice({
    name: 'invoice',
    initialState: {
        list: [],
    },
    reducers: {
        fetchInvoiceSuccess: {
            reducer(state, action) {
                state.list = action.payload
            }
        },
    }
})



export default invoicesSlice