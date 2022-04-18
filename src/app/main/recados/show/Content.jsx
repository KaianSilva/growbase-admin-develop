import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import _ from '@lodash';

import Formsy from 'formsy-react';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeepCompareEffect } from '@fuse/hooks';

import { showMessage } from 'app/store/fuse/messageSlice';

import objectsKeysEquals from 'app/utils/validations/objectsKeysEquals';
import ButtonDefault from 'app/fuse-layouts/shared-components/button-default/ButtonDeafault';
import { Grid, InputAdornment, MenuItem } from '@material-ui/core';

import { saveOne, newData, getOne, deleteOne, updateOne, updateResponse, updateLoading } from '../store/recadoSlice';

function Content() {
	const dispatch = useDispatch();
	const routeParams = useParams();
	const history = useHistory();
	const recadoRedux = useSelector(({ recado }) => recado);

	const [contents, setContents] = useState([]);
	const [selectedContents, setSelectedContents] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);
	const [loading, setLoading] = useState(false);

	useDeepCompareEffect(() => {
		function updateState() {
			const { uid } = routeParams;
			console.log(uid);
			if (uid === 'new') {
				dispatch(newData());
			} else {
				setLoading(true);
				dispatch(getOne(uid));
			}
		}

		updateState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (recadoRedux) {
			if (loading) {
				setLoading(recadoRedux.loading);
			}
		}
	}, [recadoRedux]);

	useEffect(() => {
		function clear() {
			const { uid } = routeParams;
			console.log(uid);
			setIsFormValid(false);

			if (uid === 'new') {
				dispatch(newData());
				history.push('/recados/new');
			} else {
				dispatch(updateResponse({ message: '', success: false }));
			}
		}

		if (recadoRedux?.message && !recadoRedux?.success) {
			dispatch(
				showMessage({
					message: recadoRedux?.message,
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'error'
				})
			);

			clear();
		}
		if (recadoRedux?.message && recadoRedux?.success) {
			dispatch(
				showMessage({
					message: recadoRedux?.message,
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'success'
				})
			);

			clear();
		}
	}, [recadoRedux.success, recadoRedux.message]);

	function canBeSubmitted(modal) {
		if (modal) {
			let diff = false;

			if (modal === true) {
				diff = isFormValid;
			} else {
				diff = objectsKeysEquals(modal, recadoRedux);
			}
			const diffContents = recadoRedux?.contents?.length !== selectedContents.length;

			if ((diff || diffContents) && !isFormValid) {
				setIsFormValid(true);
			}

			if (!diff && !diffContents && isFormValid) {
				setIsFormValid(false);
			}

			if ((diff && !diffContents) || (!diff && diffContents && !isFormValid)) {
				setIsFormValid(true);
			}
		}
	}

	function handleSubmit(modal) {
		setLoading(true);
		dispatch(updateLoading(true));

		if (recadoRedux?.uid !== 'new') {
			console.log(recadoRedux);
			dispatch(updateOne({ data: modal, uid: recadoRedux?.uid }));
		} else {
			console.log('modal');
			console.log(modal);
			dispatch(saveOne({ data: modal, user: recadoRedux?.user }));
		}
	}

	function handleDelete() {
		/* history.push(`/recados/new`); */
		setLoading(true);
		dispatch(updateLoading(true));
		if (recadoRedux?.uid !== 'new') {
			console.log(recadoRedux);
			dispatch(deleteOne({ uid: recadoRedux?.uid }));
		}
	}

	function handleSelect(value) {
		setSelectedContents(value);
	}
	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	if (!recadoRedux?.uid && loading) {
		return <FuseLoading />;
	}

	return (
		<Grid container item xs={12}>
			<Grid item xs={12}>
				<Formsy
					onValidSubmit={handleSubmit}
					onChange={canBeSubmitted}
					onValid={enableButton}
					onInvalid={disableButton}
				>
					<TextFieldFormsy
						className="mb-16 w-full"
						label="Titulo"
						type="text"
						name="title"
						value={recadoRedux.title}
						variant="outlined"
						validations={{ minLength: 2 }}
						validationErrors={{ minLength: 'Preencha o campo com o titulo' }}
						fullWidth
						required
					/>
					<TextFieldFormsy
						className="mb-16 w-full"
						label="Descrição"
						type="text"
						name="description"
						value={recadoRedux.description}
						variant="outlined"
						validations={{ minLength: 3 }}
						validationErrors={{ minLength: 'Preencha o campo com a descrição' }}
						fullWidth
						required
					/>
					{/* <TextFieldFormsy
						className="mb-16 w-full"
						label="user"
						type="text"
						name="user"
						value={recadoRedux.user}
						variant="outlined"
						validations={{ minLength: 3 }}
						validationErrors={{ minLength: 'Preencha o campo com a descrição' }}
						fullWidth
						disabled
					/> */}
					{/* <TextFieldFormsy
						className="mb-16 w-full"
						label="uid"
						type="text"
						name="uid"
						value={recadoRedux.uid}
						variant="outlined"
						validations={{ minLength: 3 }}
						validationErrors={{ minLength: 'Preencha o campo com a descrição' }}
						fullWidth
						disabled
					/> */}

					{/* <SelectFormsy
						className="mb-16 w-full"
						label="Recorrência"
						type="select"
						name="payment"
						value={plan.payment}
						variant="outlined"
						fullWidth
					>
						<MenuItem value="" disabled>
							Escolha a recorrência
						</MenuItem>
						{recurrences.map(item => (
							<MenuItem value={item.value}>{item.label}</MenuItem>
						))}
					</SelectFormsy> */}

					<Grid container item className="flex justify-end items-end">
						<Grid item xs={7} sm={5} md={4} lg={3} xl={2}>
							<ButtonDefault
								fullWidth
								type="submit"
								title="Salvar"
								loading={loading}
								disabled={!isFormValid}
							/>
							<ButtonDefault
								fullWidth
								type="submit"
								title="Deletar"
								action={handleDelete}
								loading={loading}
								disabled={!isFormValid}
							/>
						</Grid>
					</Grid>
				</Formsy>
			</Grid>
		</Grid>
	);
}

export default Content;
