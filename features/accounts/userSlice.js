import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userEmailSelector = createSelector(
    state => state.user,
    user => user.email
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