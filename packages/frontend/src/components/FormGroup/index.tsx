import * as React from 'react';
import './FormGroup.scss';

export interface iProps {
  id: string;
  name?: string;
  labelIcon: any;
  inputType: 'text' | 'email' | 'password' | 'number';
  value: string;
  placeHolder: string;
  required?: boolean;
  autoComplete: string;
  onChange: (e: React.FormEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  error?: any;
}

export const FormGroup: React.FunctionComponent<iProps> = (props: iProps) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <div
          className={`form-group__content ${props.error &&
            'form-group__content--error'}`}
        >
          <label className="form-group__content__label" htmlFor={props.id}>
            {props.labelIcon}
          </label>
          <input
            id={props.id}
            className="form-group__content__input"
            name={props.name}
            type={props.inputType}
            value={props.value}
            placeholder={props.placeHolder}
            autoComplete={props.autoComplete}
            onChange={props.onChange}
            onFocus={props.onFocus}
            required={props.required}
          />
        </div>
        {props.error && <div className="form-group__error">{props.error}</div>}
      </div>
    </React.Fragment>
  );
};
