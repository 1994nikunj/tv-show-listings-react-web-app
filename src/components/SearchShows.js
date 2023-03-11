import React from 'react';

const SearchShows = (props) => {
	const handleChange = (e) => {
		props.searchValue(e.target.value);
	};
	return (
		<form
			method='POST '
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<span>Search Shows: </span>
			</label>
			<input
					autoComplete='off'
					width='100%'
					type='text'
					name='searchTerm'
					onChange={handleChange}
				/>
		</form>
	);
};

export default SearchShows;
