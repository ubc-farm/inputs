import { createElement, PropTypes } from 'react'; /** @jsx createElement */

/**
 * @param {Object} object
 * @returns {Array} first item in an object's iterable properties
 * as [key, value]
 * @throws {Error} if no iterable keys are found
 */
const firstEntry = object => {
	// eslint-disable-next-line guard-for-in
	for (const key in object) return [key, object[key]];
	throw new Error(`Object ${object} has no keys`);
};

/**
 * Input used to enter a time duration.
 * This version allows for only one kind of duration type.
 * Value should be an object where the key is the duration type,
 * and the value is the number in the number field.
 * @example
 * ReactDOM.render(<DurationInput input={{ value: { years: 2 } }} />)
 * //renders an input similar to: [2] [years \/]
 */
const DurationInput = ({ input: { value, name, onChange } }) => {
	let durationType;
	let durationValue;
	try {
		[durationType, durationValue] = firstEntry(value);
	} catch (err) {
		durationType = 'years';
		durationValue = '';
	}

	function onNumberChange({ target }) {
		const newValue = Object.assign({}, value, {
			[durationType]: target.value,
		});
		onChange(newValue);
	}

	function onSelectChange({ target }) {
		const newValue = Object.assign({}, value, {
			[target.value]: durationValue,
		});
		delete newValue[durationType];

		onChange(newValue);
	}

	const s = durationValue === 1 ? '' : 's';

	return (
		<div className="duration-input">
			<input
				type="number" size="1"
				step="1" min="0" max="999"
				name={`${name}-value`}
				onChange={onNumberChange}
				value={durationValue}
			/>
			<select
				name={`${name}-type`}
				value={durationType}
				onChange={onSelectChange}
			>
				<option value="seconds">second{s}</option>
				<option value="minutes">minute{s}</option>
				<option value="hours">hour{s}</option>
				<option value="days">day{s}</option>
				<option value="weeks">week{s}</option>
				<option value="months">month{s}</option>
				<option value="years">year{s}</option>
			</select>
		</div>
	);
};

DurationInput.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.object,
		onChange: PropTypes.func,
		name: PropTypes.string,
	}).isRequired,
};

export default DurationInput;
