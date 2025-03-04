import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import React from 'react';
import styles from './DateField.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material';
import { IHoliday } from '../../types/IHoliday.interface';
import { HolidayType } from '../../types/HolidayType.enum';
import InfoIcon from '@mui/icons-material/Info';

const HOLIDAYS_API_URL = 'https://api.api-ninjas.com/v1/holidays?country=PL';

type DateFieldProps = {
	name: string;
	label: string;
	value: Dayjs | null;
	onChange: (value: Dayjs | null) => void;
	error?: string;
};

const PlayArrowIconLeft = styled(PlayArrowIcon)({
	transform: 'rotate(180deg)'
});

const DateField: React.FC<DateFieldProps> = ({ name, label, value, onChange, error }) => {
	const [holidays, setHolidays] = React.useState<IHoliday[]>([]);
	const holiday = React.useMemo<IHoliday | undefined>(
		() => (value ? holidays.find((holiday) => value.isSame(holiday.date, 'day')) : undefined),
		[value, holidays]
	);

	React.useEffect(() => {
		const getHolidays = async () => {
			const apiKey = import.meta.env.VITE_NINJA_KEY;

			fetch(HOLIDAYS_API_URL, {
				method: 'GET',
				headers: {
					'X-Api-Key': apiKey
				}
			})
				.then((res) => res.json())
				.then((data) => {
					setHolidays(data);
				})
				.catch((err) => {
					console.log(`error ${err}`);
				});
		};
		getHolidays();
	}, []);

	const isDateDisabled = (date: Dayjs) => {
		const day = date.day();
		if (day === 0) {
			return true;
		} else if (holidays.length !== 0) {
			return (
				holidays.findIndex(
					(holiday) =>
						holiday.type === HolidayType.NationalHoliday && date.isSame(holiday.date, 'day')
				) !== -1
			);
		} else {
			return false;
		}
	};

	return (
		<div className={'flex flex-col'}>
			<label className="mb-1" htmlFor={name}>
				{label}
			</label>
			<div className={styles.calendarContainer}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateCalendar
						value={value}
						onChange={(newValue) => onChange(newValue)}
						disableHighlightToday
						dayOfWeekFormatter={(date: Dayjs) => date.format('dd')}
						shouldDisableDate={isDateDisabled}
						slots={{
							leftArrowIcon: PlayArrowIconLeft,
							rightArrowIcon: PlayArrowIcon
						}}
						slotProps={{
							calendarHeader: {
								sx: {
									position: 'relative',
									'& .MuiPickersArrowSwitcher-root': {
										width: 0
									},
									'& .MuiPickersCalendarHeader-labelContainer': {
										margin: 'auto'
									},
									'& .MuiIconButton-edgeEnd': {
										position: 'absolute',
										left: '20px',
										top: 0,
										bottom: 0
									},
									'& .MuiIconButton-edgeStart': {
										position: 'absolute',
										right: '20px',
										top: 0,
										bottom: 0
									}
								}
							},
							switchViewButton: {
								sx: {
									display: 'none'
								}
							}
						}}
					/>
				</LocalizationProvider>
			</div>
			{holiday?.type === HolidayType.Observance && (
				<div className="flex flex-row mt-2">
					<InfoIcon className="text-primary-light mr-2" />
					<p>{`It is ${holiday.name}`}</p>
				</div>
			)}
			{error && (
				<div className="flex flex-row mt-2">
					<InfoIcon fontSize="small" className="text-error mr-2" />
					<span className="text-sm">{error}</span>
				</div>
			)}
		</div>
	);
};

export default DateField;
