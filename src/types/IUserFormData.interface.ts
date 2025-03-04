import { Dayjs } from 'dayjs';

export interface IUserFormData {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	photo: File | undefined;
	date: Dayjs | null;
	time: string | undefined;
}
