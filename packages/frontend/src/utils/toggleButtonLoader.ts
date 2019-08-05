import * as React from 'react';

export const toggleButtonLoader = (
  btn: React.RefObject<HTMLButtonElement>,
  state: boolean,
  triggerLoader: any
) => {
  triggerLoader();
  if (btn && btn.current) {
    btn.current.disabled = state;
  }
};
