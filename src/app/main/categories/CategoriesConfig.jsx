import { authRoles } from 'app/auth';
import React from 'react';

const CategoriesConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullwidth',
				scroll: 'content',
				navbar: {
					display: true,
					folded: false,
					position: 'left'
				},
				toolbar: {
					display: true,
					style: 'fixed',
					position: 'below'
				},
				footer: {
					display: false,
					style: 'fixed',
					position: 'below'
				}
			}
		}
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/categories/:id',
			component: React.lazy(() => import('./show/Category'))
		},
		{
			path: '/categories',
			exact: true,
			component: React.lazy(() => import('./list/Categories'))
		}
	]
};

export default CategoriesConfig;
