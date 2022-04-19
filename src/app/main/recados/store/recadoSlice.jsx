import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHistory, useParams } from 'react-router';
import ApiRecados from 'app/services/api/recados';

export const getOne = createAsyncThunk('recado/getOne', async (id, { dispatch }) => {
	const response = await ApiRecados.getMessage(id);
	console.log(response);
	if (!response.success) {
		return response.data;
	}
	const { recado } = await response.data;

	return { ...recado };
});

export const deleteOne = createAsyncThunk('recado/deleteOne', async (id, { dispatch }) => {
	console.log('id');
	console.log(id);
	const response = await ApiRecados.deleteMessage(id);
	console.log(response);
	if (!response.success) {
		return response.data;
	}
	const { recado } = await response.data;
	window.location.href = '/';
	return { ...recado };
});

export const saveOne = createAsyncThunk('recado/saveOne', async ({ data, user }, { dispatch }) => {
	const request = { user, ...data };
	console.log('saveOne');
	console.log(request);

	const response = await ApiRecados.postMessage(request);
	if (!response.success) {
		dispatch(updateResponse(response.data));
		return data;
	}
	console.log(response.data);
	dispatch(getOne(response.data.uid));

	return { ...data, message: response.message, success: response.success };
});

export const updateOne = createAsyncThunk('recado/updateOne', async ({ data, uid }, { dispatch, getState }) => {
	const request = { ...data };
	console.log(request);
	/* id = request.uid;
	console.log(id); */
	const response = await ApiRecados.putMessage(uid, request);
	const oldState = getState().recado;

	if (!response.success) {
		dispatch(updateResponse(response.data));
		return { ...data, uid, loading: false };
	}

	dispatch(getOne(uid));

	return { ...oldState, message: response.message, success: response.success };
});

const initialState = {
	success: false,
	message: '',
	errorCode: '',
	loading: false,
	description: ''
};

const recadoSlice = createSlice({
	name: 'recado',
	initialState,
	reducers: {
		newData: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					uid: 'new',
					title: '',
					description: '',
					user: 'f1b5960c-5690-4191-ab1c-e215fc812715',
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
		[updateOne.fulfilled]: (state, action) => action.payload,
		[deleteOne.fulfilled]: (state, action) => action.payload
	}
});

export const { newData, updateResponse, updateLoading } = recadoSlice.actions;

export default recadoSlice.reducer;
