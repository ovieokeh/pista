import * as React from 'react';
import { DatePicker } from 'antd';
import { FormGroup, NairaIcon } from '~components';
import './Setup.scss';

const { RangePicker } = DatePicker;
const Setup: React.FunctionComponent = () => {
  return (
    <div className="setup">
      <form className="setup__form">
        <h2 className="setup__form__header">Let's setup your first budget</h2>
        <FormGroup
          id="amount"
          name="amount"
          inputType="number"
          value=""
          autoComplete=""
          labelIcon={<NairaIcon />}
          onChange={console.log}
          placeHolder="Budget amount"
        />
      </form>
    </div>
  );
};

export default Setup;
