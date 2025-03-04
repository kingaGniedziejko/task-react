import React from 'react';
import styles from './FileField.module.css';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';

type FileFieldProps = {
	name: string;
	label: string;
	value?: File;
	onChange: (value: File | undefined) => void;
	error?: string;
};

const FileField: React.FC<FileFieldProps> = ({ name, label, value, onChange, error }) => {
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target?.files ? e.target?.files[0] : undefined;

		if (!file) {
			onChange(undefined);
			return;
		}
		onChange(file);
	};

	return (
		<div className="flex flex-col">
			<label className="mb-1" htmlFor={name}>
				{label}
			</label>
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} ${value ? 'hidden' : ''}`}
					id={name}
					name={name}
					type="file"
					accept="image/png, image/jpeg"
					onChange={onFileChange}
				/>
				<div className={`${styles.inputOverride} flex justify-center items-center px-5`}>
					{value ? (
						<div className="flex flex-row justify-center w-[100%]">
							<span className={styles.fileName}>{value.name}</span>
							<CancelIcon
								className={`${styles.deleteIcon} ml-2`}
								onClick={() => {
									onChange(undefined);
								}}
							/>
						</div>
					) : (
						<p>
							<u className="text-primary mr-2">Upload a file</u>
							<span className={`${styles.inputPlaceholderSecondary} hidden sm:inline`}>
								or drag and drop here
							</span>
						</p>
					)}
				</div>
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

export default FileField;
