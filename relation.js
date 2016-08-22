import { createElement, PropTypes, PureComponent } from 'react';
/** @jsx createElement */
import RelationSelectBase from './relation-external.js';

/**
 * Fetches the given URL and uses the returned JSON to add options to the select
 */
export default class RelationSelect extends PureComponent {
	static get propTypes() {
		return {
			input: PropTypes.object.isRequired,
			meta: PropTypes.object.isRequired,
			labelKey: PropTypes.string,
			url: PropTypes.string.isRequired,
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: false,
			data: undefined,
		};

		fetch(props.url).then(response => {
			if (!response.ok) {
				return response.json().then(data => {
					throw new Error(data);
				});
			}

			return response.json().then(data => this.setState({
				data,
				loading: false,
				error: false,
			}));
		}).catch(error => this.setState({
			error,
			loading: false,
		}));
	}

	render() {
		const props = Object.assign({}, this.props, this.state);
		return <RelationSelectBase {...props} />;
	}
}