import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = props => (
  <div className="form-group">
    <textarea
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
    />
    {props.info && <small className="form-text text-muted">{props.info}</small>}
    {props.error && <div className="invalid-feedback">{props.error}</div>}
  </div>
);

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};


export default TextAreaFieldGroup;
