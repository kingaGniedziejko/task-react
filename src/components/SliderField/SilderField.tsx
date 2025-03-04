import React from 'react';
import { Slider } from '@mui/material';

type SliderFieldProps = {
	name: string;
	label: string;
	value: number;
	onChange: (value: number) => void;
};

const SliderField: React.FC<SliderFieldProps> = ({ name, label, value, onChange }) => {
	return (
		<div className="flex flex-col">
			<label className="mb-1" htmlFor={name}>
				{label}
			</label>
			<div className="pb-7">
				<div className="flex flex-row justify-between">
					<p className="text-xs">8</p>
					<p className="text-xs">100</p>
				</div>
				<div className="px-1">
					<Slider
						min={8}
						max={100}
						valueLabelDisplay="on"
						value={value}
						onChange={(_e, value) => {
							onChange(value as number);
						}}
					/>
				</div>
			</div>
			{/* Implementation with DevExtreme React */}
			{/* <Slider min={8} max={100} defaultValue={8}>
				<Label visible={true} position="top" />
				<Tooltip enabled={true} showMode="always" position="bottom" />
			</Slider> */}
		</div>
	);
};

export default SliderField;
