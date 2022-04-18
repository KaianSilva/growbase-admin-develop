import { authRoles } from 'app/auth';
import React from 'react';

const CarsConfig = {
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
		/* {
			path: '/cars/:id',
			component: React.lazy(() => import('./show/Car'))
		}, */
		{
			path: '/cars',
			exact: true,
			component: React.lazy(() => import('./list/Cars'))
		}
	]
};

export default CarsConfig;
