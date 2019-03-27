const Validator = require('validator');
const { isEmpty } = require('./is-empty');

exports.validatePostInput = (data) => {
	const errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 10, max: 30 })) {
		errors.text = 'text must be between 10 and 30 characters';
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Text field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
