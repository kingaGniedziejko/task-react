import React from 'react';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import SliderField from '../SliderField/SilderField';
import FileField from '../FileField/FileField';
import DateField from '../DateField/DateField';
import TimeSlotField from '../TimeSlotField/TimeSlotField';

import styles from './UserForm.module.css';
import { IUserFormData } from '../../types/IUserFormData.interface';
import { Dayjs } from 'dayjs';
import { sendApplication } from '../../actions/sendApplication';
import { IFormState } from '../../types/FormState.type';

const UserForm: React.FC = () => {
	const [formData, setFormData] = React.useState<IUserFormData>({
		firstName: '',
		lastName: '',
		email: '',
		age: 8,
		photo: undefined,
		date: null,
		time: undefined
	});

	const isFilledOut = React.useMemo(
		() =>
			!(
				formData.firstName === '' ||
				formData.lastName === '' ||
				formData.email === '' ||
				!formData.photo ||
				!formData.date ||
				!formData.time
			),
		[formData]
	);

	const [state, formAction, isPending] = React.useActionState<
		Partial<IFormState<IUserFormData>>,
		FormData
	>(sendApplication.bind(null, formData), {});

	React.useEffect(() => {
		if (!isPending && Object.keys(state).length === 0 && state.constructor === Object) {
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				age: 8,
				photo: undefined,
				date: null,
				time: undefined
			});
		}
	}, [state, isPending]);

	const onChange = <T,>(key: keyof IUserFormData, value: T) => {
		setFormData({ ...formData, [key]: value });
	};

	return (
		<form action={formAction} className={`${styles.userForm} flex flex-col space-y-5`}>
			<p className="text-2xl">Personal info</p>
			<TextField
				name="firstName"
				label="First Name"
				value={formData.firstName}
				onChange={(value: string) => onChange<string>('firstName', value)}
				error={state.firstName}
			/>
			<TextField
				name="lastName"
				label="Last Name"
				value={formData.lastName}
				onChange={(value: string) => onChange<string>('lastName', value)}
				error={state.lastName}
			/>
			<TextField
				name="email"
				label="Email Address"
				value={formData.email}
				onChange={(value: string) => onChange<string>('email', value)}
				error={state.email}
			/>
			<SliderField
				name="age"
				label="Age"
				value={formData.age}
				onChange={(value: number) => onChange<number>('age', value)}
			/>
			<FileField
				name="photo"
				label="Photo"
				value={formData.photo}
				onChange={(value: File | undefined) => onChange<File | undefined>('photo', value)}
				error={state.photo}
			/>
			<p className="text-2xl">Your workout</p>
			<div className="flex flex-col sm:flex-row sm:justify-between space-y-5">
				<DateField
					name="date"
					label="Date"
					value={formData.date}
					onChange={(value: Dayjs | null) => onChange<Dayjs | null>('date', value)}
					error={state.date}
				/>
				{formData.date && (
					<TimeSlotField
						name="time"
						label="Time"
						date={formData.date}
						value={formData.time}
						onChange={(value: string | undefined) => onChange<string | undefined>('time', value)}
						error={state.time}
					/>
				)}
			</div>
			<Button className="mt-5" onClick={() => null} disabled={!isFilledOut || isPending}>
				Send Application
			</Button>
		</form>
	);
};

export default UserForm;
