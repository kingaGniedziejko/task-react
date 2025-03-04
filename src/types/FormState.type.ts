export type IFormState<T> = {
	[Property in keyof T]: string;
};
