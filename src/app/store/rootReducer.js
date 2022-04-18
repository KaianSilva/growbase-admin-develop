import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import product from 'app/main/products/store/productSlice';
import products from 'app/main/products/store/productsSlice';

import category from 'app/main/categories/store/categorySlice';
import categories from 'app/main/categories/store/categoriesSlice';
import cars from 'app/main/cars/store/carsSlice';
import recados from 'app/main/recados/store/recadosSlice';
import recado from 'app/main/recados/store/recadoSlice';

import fuse from './fuse';
import i18n from './i18nSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		product,
		products,
		categories,
		category,
		cars,
		recados,
		recado,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
