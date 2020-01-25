import { createSlice, createSelector } from '@reduxjs/toolkit'

export const billsSelector = createSelector(
    state => state.bills,
    bills => bills.list
)
const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        list: []
    },
    reducers: {
        addBill: {
            reducer(state, action) {
                const bill = action.payload
                const list = state.list
                list.push(bill)
            }
        },
        setBill: {
            reducer(state, action) {
                const bills = action.payload
                state.list = bills
            }
        },
        updateBill: {
            reducer(state, action) {
                const newBill = action.payload
                const billIndex = state.list.findIndex((bill) => bill.id == newBill.id)
                const list = state.list
                list[billIndex] = newBill
            }
        },
    }
})



export default billsSlice