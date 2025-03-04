import React from 'react';
import styles from './TimeSlotField.module.css';
import { Dayjs } from 'dayjs';
import InfoIcon from '@mui/icons-material/Info';

type TimeSlotFieldProps = {
	name: string;
	label: string;
	date: Dayjs; // for time slots fetch
	value?: string;
	onChange: (value: string | undefined) => void;
	error?: string;
};

const TimeSlotField: React.FC<TimeSlotFieldProps> = ({
	name,
	label,
	date,
	value,
	onChange,
	error
}) => {
	// time slots fetch mock
	const availableTimeSlots = date ? ['12:00', '14:00', '16:30', '18:30', '20:00'] : [];

	return (
		<div className="flex flex-col">
			<label className="mb-1" htmlFor={name}>
				{label}
			</label>
			<div className="grid sm:flex sm:flex-col grid-cols-4  gap-2">
				{availableTimeSlots.map((timeSlot, index) => (
					<div
						key={index}
						onClick={() => onChange(timeSlot)}
						className={`${styles.timeSlotItem} ${
							value === timeSlot ? styles.timeSlotItemActive : ''
						} flex justify-center items-center`}
					>
						<p className="">{timeSlot}</p>
					</div>
				))}
			</div>
			{error && (
				<div className="flex flex-row mt-2">
					<InfoIcon fontSize="small" className="text-error mr-2" />
					<span className="text-sm">{error}</span>
				</div>
			)}
		</div>
	);
};

export default TimeSlotField;
