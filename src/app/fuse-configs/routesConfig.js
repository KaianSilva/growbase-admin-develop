import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';
import MailConfirmConfig from 'app/main/mail-confirm/MailConfirmConfig';
import PreviewConfig from 'app/main/preview/PreviewConfig';
import HomeConfig from 'app/main/home/HomeConfig';
import ForgotPasswordConfig from 'app/main/forgot-password/ForgotPasswordConfig';
import ProductsConfig from 'app/main/products/ProductsConfig';
import CategoriesConfig from 'app/main/categories/CategoriesConfig';
import CarsConfig from 'app/main/cars/CarsConfig';
import RecadosConfig from 'app/main/recados/RecadosConfig';

const routeConfigs = [
	ExampleConfig,
	LoginConfig,
	RegisterConfig,
	MailConfirmConfig,
	PreviewConfig,
	ForgotPasswordConfig,
	HomeConfig,
	ProductsConfig,
	CategoriesConfig,
	CarsConfig,
	RecadosConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/recados" />
	}
];

export default routes;
