import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';

export const getOne = createAsyncThunk('category/getOne', async (id, { dispatch }) => {
	const response = await ApiService.doGet(`/categories/${id}`);
	if (!response.success) {
		return response.data;
	}
	const { category } = await response.data;

	return { ...category };
});

export const saveOne = createAsyncThunk('category/saveOne', async (data, { dispatch }) => {
	const request = { ...data };

	const response = await ApiService.doPost('/categories', request);
	if (!response.success) {
		dispatch(updateResponse(response.data));
		return data;
	}
	const { category } = await response.data;

	dispatch(getOne(category.id));

	return { ...data, message: response.message, success: response.success };
});

export const updateOne = createAsyncThunk('category/updateOne', async ({ data, id }, { dispatch, getState }) => {
	const request = { ...data };

	const response = await ApiService.doPut(`/categories/${id}`, request);
	const oldState = getState().category;

	if (!response.success) {
		dispatch(updateResponse(response.data));
		return { ...data, id, loading: false };
	}

	dispatch(getOne(id));

	return { ...oldState, message: response.message, success: response.success };
});

const initialState = {
	success: false,
	message: '',
	errorCode: '',
	loading: false,
	description: ''
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: 'new',
					description: '',
					success: false,
					loading: false,
					message: '',
					errorCode: ''
				}
			})
		},
		clearState: (state, action) => initialState,
		updateState: (state, action) => {
			return { ...state, ...action.payload };
		},
		updateResponse: (state, action) => {
			state.success = action.payload.success;
			state.message = action.payload.message;
		},
		updateLoading: (state, action) => {
			state.loading = action.payload;
		}
	},
	extraReducers: {
		[getOne.fulfilled]: (state, action) => action.payload,
		[saveOne.fulfilled]: (state, action) => action.payload,
		[updateOne.fulfilled]: (state, action) => action.payload
	}
});

export const { newData, updateResponse, updateLoading } = categorySlice.actions;

export default categorySlice.reducer;
