import { HolidayType } from './HolidayType.enum';

export interface IHoliday {
	country: string;
	date: string;
	day: string;
	iso: string;
	name: string;
	type: HolidayType;
	year: number;
}
