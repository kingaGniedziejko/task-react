import React from 'react';
import UserForm from './components/UserForm/UserForm';

const App: React.FC = () => {
	return (
		<div className="content flex flex-row justify-center px-6 py-14">
			<UserForm />
		</div>
	);
};

export default App;
