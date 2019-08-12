import * as React from 'react';
import Picker, { ReactDatePickerProps } from 'react-datepicker';
import { generateClassname } from '~utils';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

interface iProps extends ReactDatePickerProps {
  parentClass: string;
  label: string;
  startDate?: Date;
  error?: string;
  success: boolean;
}

export const Datepicker: React.FunctionComponent<iProps> = (props: iProps) => (
  <div
    className={generateClassname('datepicker', !!props.error, !!props.success)}
  >
    <span className={`${props.parentClass}__datepickers__title`}>
      {props.label}
    </span>
    <Picker {...props} />
    <span className="datepicker__error">{props.error}</span>
  </div>
);
