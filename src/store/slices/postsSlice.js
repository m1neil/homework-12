import { createSlice } from '@reduxjs/toolkit'
import {
	fetchPosts,
	addPost,
	removePost,
	fetchShowMorePosts,
} from './postThunk'

const initialState = {
	postsList: [],
	currentPage: 1,
	postsPerPage: 10,
	totalPagesNumber: 1,
	status: 'idle',
	statusAddPost: 'idle',
	statusRemovePost: 'idle',
	error: null,
	errorAddPost: null,
	errorRemovePost: null,
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				const { items, pagination } = action.payload
				state.postsList = items
				state.totalPagesNumber = pagination.totalPages
				state.postsPerPage = pagination.pageSize
				state.currentPage = pagination.currentPage
				state.status = 'success'
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'error'
				state.error = action.payload
			})

			// show more posts
			.addCase(fetchShowMorePosts.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchShowMorePosts.fulfilled, (state, action) => {
				const { items, pagination } = action.payload
				state.currentPage = pagination.currentPage
				state.postsList = [...state.postsList, ...items]
				state.status = 'success'
			})
			.addCase(fetchShowMorePosts.rejected, (state, action) => {
				state.error = action.payload
			})

			// add post
			.addCase(addPost.pending, state => {
				state.statusAddPost = 'loading'
				state.errorAddPost = null
			})
			.addCase(addPost.fulfilled, (state, action) => {
				state.statusAddPost = 'success'
				if (
					state.currentPage === state.totalPagesNumber &&
					state.postsList.length < state.postsPerPage
				)
					state.postsList.push(action.payload)
			})
			.addCase(addPost.rejected, (state, action) => {
				state.statusAddPost = 'error'
				state.errorAddPost = action.payload
			})

			// remove post
			.addCase(removePost.pending, state => {
				state.statusRemovePost = 'loading'
				state.errorRemovePost = null
			})
			.addCase(removePost.fulfilled, (state, action) => {
				state.postsList = state.postsList.filter(
					post => post.id !== action.payload
				)
				state.statusRemovePost = 'success'
			})
			.addCase(removePost.rejected, (state, action) => {
				state.statusRemovePost = 'error'
				state.errorRemovePost = action.payload
			})
	},
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, resetPosts } = postsSlice.actions

export default postsSlice.reducer
