import { createSlice, createSelector } from '@reduxjs/toolkit'

export const billsSelector = createSelector(
    state => state.bills,
    bills => bills.list
)

export const totalBillsAmountSelector = createSelector(
    state => state.bills,
    bills => bills.list.reduce(reducer, 0)
)

const reducer = (accumulator, bill) => accumulator + bill.amount;


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
        payBills: {
            reducer(state, action) {
                state
            }
        },
    }
})



export default billsSlice