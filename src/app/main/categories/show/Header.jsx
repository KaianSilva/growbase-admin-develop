import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const categoryRedux = useSelector(({ category }) => category);
	const [categoy, setCategory] = useState({});

	useEffect(() => {
		if (categoryRedux) {
			setCategory(categoryRedux);
		}
	}, [categoryRedux]);

	return <PageCardedHeader link="/categories" title={categoy?.title || 'Nova categoria'} textBack="Categorias" />;
}

export default Header;
