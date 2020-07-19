import { createSlice, createSelector } from '@reduxjs/toolkit'

export const billsSelector = createSelector(
    state => state.bills,
    bills => bills.list
)

export const selectedBillsSelector = createSelector(
    state => state.bills,
    bills => bills.selectedBills
)

export const totalBillsAmountSelector = createSelector(
    state => state.bills,
    bills => bills.selectedBills.reduce(reducer, 0)
)

export const isSuccessBillSelector = createSelector(
    state => state.bills,
    bills => bills.success
)


export const isAutoUpdateSelector = createSelector(
    state => state.bills,
    bills => bills.autoUpdate
)

export const isBillLoadingSelector = createSelector(
    state => state.bills,
    bills => bills.loading
)

export const paymentUrlSelector = createSelector(
    state => state.bills,
    bills => bills.paymentUrl
)

export const isAddingBillSelector = createSelector(
    state => state.bills,
    bills => bills.isAddingBill
)


const reducer = (accumulator, bill) => accumulator + bill.amount;


const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        paymentUrl: '',
        gettingPaymentUrl: false,
        list: [],
        selectedBills: [],
        success: false,
        autoUpdate: true,
        loading: true,
        isAddingBill: false,
    },
    reducers: {
        addBillSuccess: {
            reducer(state, action) {
                state.isAddingBill = false
                const billSuccess = action.payload.bill
                const selectedBills = state.selectedBills.filter((bill) => bill.id != billSuccess.id)
                const newSelectedBills = [...selectedBills, billSuccess]
                state.selectedBills = billSuccess.amount > 0 ? newSelectedBills : selectedBills
                state.list = [...state.list, billSuccess]


            }
        },
        setBillStatus: {
            reducer(state, action) {
                const { id, loading } = action.payload
                const bills = state.list
                state.list = bills.map((bill) => {
                    const newLoading = bill.id === id ? loading : bill.loading ? bill.loading : false
                    return { ...bill, loading: newLoading }
                }
                )

            }
        },
        setIsSuccess: {
            reducer(state, action) {
                state.success = action.payload.isSuccess
            }
        },
        addBill: {
            reducer(state, action) {
                state.isAddingBill = true
            }
        },
        setBill: {
            reducer(state, action) {
                const bills = action.payload
                const newBills = bills.map(bill => ({ ...bill, amount: 0 }))
                state.list = newBills
            }
        },
        updateBill: {
            reducer(state, action) {
                state.isAddingBill = true
            }
        },
        updateBillSuccess: {
            reducer(state, action) {
                const billSuccess = action.payload.bill
                state.isAddingBill = false
                const selectedBills = state.selectedBills.filter((bill) => bill.id != billSuccess.id)
                const newSelectedBills = [...selectedBills, billSuccess]
                state.selectedBills = billSuccess.amount > 0 ? newSelectedBills : selectedBills


                const index = state.list.findIndex((bill) => bill.id === billSuccess.id)
                state.list[index] = billSuccess
            }
        },
        payBills: {
            reducer(state, action) {
                state
            }
        },
        setSelectedBills: {
            reducer(state, action) {
                if (action.payload.bill.amount > 0)
                    state.selectedBills.push(action.payload.bill)
            }
        },
        removeSelectedBills: {
            reducer(state, action) {
                const { bill } = action.payload
                const billId = bill.id
                const selectedBills = state.selectedBills.filter((bill) => bill.id != billId)
                state.selectedBills = selectedBills
            }
        },
        removeBill: {
            reducer(state, action) {
                state
            }
        },
        removeBillSuccess: {
            reducer(state, action) {
                const { billId } = action.payload
                state.list = state.list.filter((bill) => bill.id != billId)
                const selectedBills = state.selectedBills.filter((bill) => bill.id != billId)
                state.selectedBills = selectedBills
            }
        },
        autoUpdate: {
            reducer(state, action) {
                state.autoUpdate = false
            }
        },
        getBill: {
            reducer(state, action) {
                state.loading = true
            }
        },
        getBillSuccess: {
            reducer(state, action) {
                state.loading = false
            }
        },
        getPaymentUrl: {
            reducer(state, action) {
                state.gettingPaymentUrl = true
            }
        },
        getPaymentUrlSuccess: {
            reducer(state, action) {
                state.paymentUrl = action.payload.paymentUrl
                state.gettingPaymentUrl = false
            }
        },
        getPaymentUrlFail: {
            reducer(state, action) {
                state.paymentUrl = ""
                state.gettingPaymentUrl = false
            }
        },
        resetPaymentUrl: {
            reducer(state, action) {
                state.paymentUrl = ""
                state.gettingPaymentUrl = false
            }
        },
    }
})



export default billsSlice