import React from 'react';
import styles from './TextField.module.css';
import InfoIcon from '@mui/icons-material/Info';

type TextFieldProps = {
	name: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
};

const TextField: React.FC<TextFieldProps> = ({ name, label, error, value, onChange }) => {
	return (
		<div className="flex flex-col">
			<label className="mb-1" htmlFor={name}>
				{label}
			</label>
			<input
				className={`${styles.input} ${error ? styles.error : ''} py-2`}
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{error && (
				<div className="flex flex-row mt-2">
					<InfoIcon fontSize="small" className="text-error mr-2" />
					<span className="text-sm">{error}</span>
				</div>
			)}
		</div>
	);
};

export default TextField;
