import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Money from 'ubc-farm-money';

/**
 * An input used for displaying a monentary value.
 * Designed to be used in a redux-form Field.
 * When focus is lost on the input, a formatted money string
 * will be displayed rather than the actual value.
 */
const MoneyInput = ({ input, meta }) => {
	const { active, valid, invalid } = meta;
	const invalidClass = invalid ? ' invalid' : '';

	let { value } = input;
	if (!active && valid) {
		const moneyDisplay = new Money(value);
		value = moneyDisplay.toString({ maximumFractionDigits: 20 });
	}

	return (
		<input
			{...input}
			className={`input-money${invalidClass}`}
			type="text" inputMode="number"
			value={value}
		/>
	);
};

MoneyInput.propTypes = {
	input: PropTypes.object.isRequired,
	meta: PropTypes.object.isRequired,
};

export default MoneyInput;

export function validate(value) {
	const num = new Money(value).toInteger();
	return !Number.isNaN(num);
}
