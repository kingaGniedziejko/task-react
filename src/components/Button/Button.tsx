import React, { PropsWithChildren } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
	onClick,
	disabled,
	className,
	children
}) => {
	return (
		<button
			disabled={disabled}
			className={`${styles.customButton} ${disabled ? styles.disabled : ''} ${className} text-lg`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
