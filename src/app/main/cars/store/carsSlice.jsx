import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('cars/getCars', async () => {
	const response = await ApiService.doGet('/cars');
	const data = await response.data;

	console.log(data);

	return data.cars;
});

const adapter = createEntityAdapter({
	selectId: category => category.id
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.cars);

const carsSlice = createSlice({
	name: 'cars',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default carsSlice.reducer;
