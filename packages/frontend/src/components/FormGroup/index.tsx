import * as React from 'react';
import { generateClassname } from '~utils';
import './FormGroup.scss';

export interface iProps {
  id: string;
  name?: string;
  labelIcon: any;
  inputType: 'text' | 'email' | 'password' | 'number';
  value: string | number;
  min?: any;
  placeHolder: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (e: React.FormEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  error?: any;
  success: boolean;
}

export const FormGroup: React.FunctionComponent<iProps> = (props: iProps) => (
  <React.Fragment>
    <div className="form-group">
      <div
        className={generateClassname(
          'form-group__content',
          !!props.error,
          !!props.success,
        )}
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
          min={props.min}
        />
      </div>
      {props.error && <div className="form-group__error">{props.error}</div>}
    </div>
  </React.Fragment>
);
