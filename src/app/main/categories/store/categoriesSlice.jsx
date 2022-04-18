import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('categories/getCategories', async () => {
	const response = await ApiService.doGet('/categories');
	const data = await response.data;

	console.log(data);

	return data.categories;
});

const adapter = createEntityAdapter({
	selectId: category => category.id
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.categories);

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default categoriesSlice.reducer;
