import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/categoriesSlice';

const columns = [
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: 'Descrição',
		sort: false
	}
];

export default function Categories() {
	const history = useHistory();
	const dispatch = useDispatch();
	const categoriesRedux = useSelector(selectAll);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleClick(value) {
		history.push(`/categories/${value.id}`);
	}

	function handleClickNew() {
		history.push(`/categories/new`);
	}

	useEffect(() => {
		setLoading(true);
		dispatch(getAll());
	}, []);

	useEffect(() => {
		if (categoriesRedux) {
			setLoading(false);
			if (categoriesRedux.length) {
				const parseProducts = categoriesRedux.map(item => {
					return {
						...item
					};
				});
				setData(parseProducts);
			}
		}
	}, [categoriesRedux]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden rounded-t-12',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white'
			}}
			header={<PageCardedHeader title="Categorias" buttonTitle="ADICIONAR NOVA" buttonAction={handleClickNew} />}
			content={<TableComponent columns={columns} data={data} action={handleClick} />}
			innerScroll
		/>
	);
}
