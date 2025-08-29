import { createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../api/apiClient'
import initialPosts from '../../data/initialPosts'

const apiPosts = apiClient('posts', 500, initialPosts)

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async ({ currentPage, postsPerPage }, { rejectWithValue }) => {
		try {
			const response = await apiPosts.getPaginated(currentPage, postsPerPage)
			return response
		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const fetchShowMorePosts = createAsyncThunk(
	'posts/showMore',
	async ({ offset, postsPerPage }, { rejectWithValue }) => {
		try {
			const response = await apiPosts.getPaginated(offset, postsPerPage)
			return response
		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const addPost = createAsyncThunk(
	'posts/addPost',
	async (newPost, { rejectWithValue }) => {
		try {
			const response = await apiPosts.create(newPost)
			return response
		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)

export const removePost = createAsyncThunk(
	'posts/removePost',
	async (idPost, { rejectWithValue }) => {
		try {
			const response = await apiPosts.delete(idPost)
			return response.id
		} catch (error) {
			rejectWithValue(error.message)
		}
	}
)
