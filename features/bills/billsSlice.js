import { createSlice } from '@reduxjs/toolkit'

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
                bill = action.payload
                list = state.list
                list.push(bill)
            }
        }
    }
})



export const { addBill } = billsSlice.actions

export default billsSlice.reducer