import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiRecados from 'app/services/api/recados';

export const getAll = createAsyncThunk('recados/getRecados', async () => {
	const response = await ApiRecados.getMessages();
	const data = await response.data;

	console.log(response.data);

	return data;
	/* return response; */
});

const adapter = createEntityAdapter({
	selectId: recado => recado.uid
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.recados);

const recadosSlice = createSlice({
	name: 'recados',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default recadosSlice.reducer;
