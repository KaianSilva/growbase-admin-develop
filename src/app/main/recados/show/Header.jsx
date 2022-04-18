import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const recadosRedux = useSelector(({ recados }) => recados);
	const [recado, setRecado] = useState({});

	useEffect(() => {
		if (recadosRedux) {
			setRecado(recadosRedux);
		}
	}, [recadosRedux]);

	return <PageCardedHeader link="/recados" title={recado?.title || 'Novo Recados'} textBack="Recados" />;
}

export default Header;
