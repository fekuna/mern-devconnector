import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = props => (
  <div className="form-group">
    <input
      type={props.type}
      className={
        !props.error
          ? 'form-control form-control-lg'
          : 'form-control form-control-lg is-invalid'
      }
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
    {props.info && <small className="form-text text-muted">{props.info}</small>}
    {props.error && <div className="invalid-feedback">{props.error}</div>}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
