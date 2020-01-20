import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        text: 'helo'
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.text = 'new World'
            }
        }
    }
})



export const { addTodo } = todosSlice.actions

export default todosSlice.reducer