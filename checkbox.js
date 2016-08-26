/** @jsx createElement */
import { createElement, PropTypes, PureComponent } from 'react';
import { omit } from 'ubc-farm-utils';

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set.
 */
export default class Checkbox extends PureComponent {
	static get propTypes() {
		return {
			indeterminate: PropTypes.bool,
		};
	}

	componentDidMount() {
		this.handleIndeterminate(this.props.indeterminate);
	}

	componentDidUpdate(prevProps) {
		const { indeterminate } = this.props;
		if (indeterminate !== prevProps.indeterminate) {
			this.handleIndeterminate(indeterminate);
		}
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	handleIndeterminate(flag) {
		this.ref.indeterminate = flag;
	}

	render() {
		return (
			<input
				type="checkbox"
				{...omit(this.props, 'indeterminate')}
				ref={checkbox => { this.ref = checkbox; }}
			/>
		);
	}
}
