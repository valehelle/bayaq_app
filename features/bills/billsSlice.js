import { createSlice, createSelector } from '@reduxjs/toolkit'

export const billsSelector = createSelector(
    state => state.bills,
    bills => bills.list
)
const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        list: [
            {
                billerCode: '',
                ref1: '',
                ref2: ''
            }
        ]
    },
    reducers: {
        addBill: {
            reducer(state, action) {
                const bill = action.payload
                const list = state.list
                list.push(bill)
            }
        }
    }
})



export default billsSlice