import * as React from 'react';
import './Checkbox.scss';

interface iProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent) => void;
}

export const Checkbox: React.FunctionComponent<iProps> = ({
  id,
  label,
  checked,
  onChange
}) => {
  return (
    <div className="form-group">
      <input onChange={onChange} checked={checked} id={id} type="checkbox" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
