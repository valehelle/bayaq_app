import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userInfoSelector = createSelector(
    state => state.user,
    user => user
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        phone: ''
    },
    reducers: {
        addUserInfo: {
            reducer(state, action) {
                const { email, phone } = action.payload
                state.email = email
                state.phone = phone
            }
        }
    }
})



export default userSlice