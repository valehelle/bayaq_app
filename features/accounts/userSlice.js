import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userSelector = createSelector(
    state => state.user
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: ''
    },
    reducers: {
        addEmail: {
            reducer(state, action) {
                const email = action.payload
                state.email = email
            }
        }
    }
})



export default userSlice