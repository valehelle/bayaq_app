import { createSlice, createSelector } from '@reduxjs/toolkit'

export const invoiceSelector = createSelector(
    state => state.invoice,
    invoice => invoice.list
)

export const isFetchingInvoiceSelector = createSelector(
    state => state.invoice,
    invoice => invoice.isFetchingInvoice
)



const invoicesSlice = createSlice({
    name: 'invoice',
    initialState: {
        list: [],
        isFetchingInvoice: false
    },
    reducers: {
        fetchInvoiceSuccess: {
            reducer(state, action) {
                state.list = action.payload
                state.isFetchingInvoice = false
            }
        },
        fetchInvoice: {
            reducer(state, action) {
                state.isFetchingInvoice = true
            }
        },
    }
})



export default invoicesSlice