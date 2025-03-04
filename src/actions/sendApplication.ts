'use server';

import { IFormState } from '../types/FormState.type';
import { IUserFormData } from '../types/IUserFormData.interface';
import { readFile } from '../utils/readFile';
import { validateEmail } from '../utils/validateEmail';

const APPLICATION_API_URL = 'http://letsworkout.pl/submit';

export async function sendApplication(
	formDataFull: IUserFormData,
	_previousState: Partial<IFormState<IUserFormData>>,
	formData: FormData
) {
	// Validation

	let newErrors = {};

	// firstName
	if (formDataFull.firstName === '')
		newErrors = { ...newErrors, firstName: 'Please enter the value' };
	// lastName
	if (formDataFull.lastName === '')
		newErrors = { ...newErrors, lastName: 'Please enter the value' };
	// email
	if (formDataFull.email === '') newErrors = { ...newErrors, email: 'Please enter the value' };
	else if (!validateEmail(formDataFull.email))
		newErrors = {
			...newErrors,
			email: 'Please use correct formatting.\n Example: address@email.com'
		};
	// photo
	if (!formDataFull.photo) newErrors = { ...newErrors, photo: 'Please upload a file' };
	// date
	if (!formDataFull.date) newErrors = { ...newErrors, date: 'Please select a date' };
	// time
	if (!formDataFull.time) newErrors = { ...newErrors, time: 'Please select a time' };

	if (!(Object.keys(newErrors).length === 0 && newErrors.constructor === Object)) {
		return newErrors;
	}

	formDataFull.age && formData.append('age', formDataFull.age.toString());

	formData.delete('photo');
	if (formDataFull.photo) {
		const photo = await readFile(formDataFull.photo);
		formData.append('photo', photo);
	}
	if (formDataFull.date && formDataFull.time) {
		const timeArray = formDataFull.time.split(':');
		formDataFull.date &&
			formDataFull.time &&
			formData.append(
				'date',
				formDataFull.date
					.set('hour', Number.parseInt(timeArray[0]))
					.set('minute', Number.parseInt(timeArray[1]))
					.set('second', 0)
					.toISOString()
			);
	}

	fetch(APPLICATION_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: formData
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(`passed ${data}`);
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});

	return {};
}
