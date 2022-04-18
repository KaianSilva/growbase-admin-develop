import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const carRedux = useSelector(({ car }) => car);
	const [car, setcar] = useState({});

	useEffect(() => {
		if (carRedux) {
			setcar(carRedux);
		}
	}, [carRedux]);

	return <PageCardedHeader link="/cars" title={car?.title || 'Nova Carro'} textBack="Carros" />;
}

export default Header;
