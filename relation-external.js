import { createElement, PropTypes } from 'react';
/** @jsx createElement */

function entries(object) {
	return Object.keys(object).map(k => [k, object[k]]);
}

const RelationSelect = ({ input, loading, data, error, labelKey = 'name' }) => {
	let firstOptionText = '';
	if (loading) firstOptionText = 'Loading...';
	else if (error) firstOptionText = error;

	const options = [];

	const entryInterator = typeof data.entries === 'function'
		? data.entries()
		: entries(data);

	for (const [key, { [labelKey]: label }] of entryInterator) {
		options.push(<option value={key} key={key}>{label}</option>);
	}

	return (
		<select disabled={loading} {...input}>
			<option value="" disabled>{firstOptionText}</option>
			{options}
		</select>
	);
};

RelationSelect.propTypes = {
	input: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	data: PropTypes.oneOfType([
		PropTypes.instanceOf(Map),
		PropTypes.object,
	]),
	error: PropTypes.any,
	labelKey: PropTypes.string,
}
