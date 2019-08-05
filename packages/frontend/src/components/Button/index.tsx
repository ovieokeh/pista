import * as React from 'react';
import Loader from 'react-loader-spinner';
import './Button.scss';

interface iProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  isLoading: boolean;
  extraClasses?: string;
  onClick?: (event: React.SyntheticEvent) => void;
}

export const Button = React.forwardRef(
  (props: iProps, ref: React.Ref<HTMLButtonElement>) => (
    <button
      ref={ref}
      className={`button ${props.extraClasses && props.extraClasses}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.isLoading && (
        <Loader type="Puff" height="20" width="20" color="#fff" />
      )}
      {props.text}
    </button>
  )
);
