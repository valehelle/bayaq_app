import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userInfoSelector = createSelector(
    state => state.user
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
    },
    reducers: {
        addUserInfo: {
            reducer(state, action) {
                const { email, phone } = action.payload
                state.email = email
            }
        }
    }
})



export default userSlice