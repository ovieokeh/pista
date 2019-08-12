import * as React from 'react';
import { Link } from 'react-router-dom';
import { addMonths } from 'date-fns';
import { Button, FormGroup, Datepicker, NairaIcon } from '~components';
import { newBudgetRequest } from '~requests';
import { iProps, iState } from './interfaces';
import './Setup.scss';

class Setup extends React.PureComponent<iProps, iState> {
  submitBtn: React.RefObject<HTMLButtonElement>;

  constructor(props: iProps) {
    super(props);

    this.state = {
      amount: '10000',
      amountErrors: '',
      startDate: new Date(),
      startDateErrors: '',
      endDate: addMonths(new Date(), 1),
      endDateErrors: '',
      isLoading: false,
      success: false,
    };

    window.document.title = 'Budget Setup - Pista';
    this.submitBtn = React.createRef<HTMLButtonElement>();
  }

  componentDidMount = () => {
    this.props.auth.user.hasPendingBudget &&
      this.props.history.push('/dashboard');
  };

  toggleSubmitButton = (state: boolean) => {
    if (this.submitBtn && this.submitBtn.current) {
      this.submitBtn.current.disabled = state;
    }
  };

  handleAmountChange = (event: React.FormEvent) =>
    this.setState({
      amount: (event.target as HTMLInputElement).value,
      amountErrors: '',
    });

  handleDateChange = (type: 'startDate' | 'endDate') => (date: Date) =>
    this.setState({ [type]: date, [`${type}Errors`]: '' });

  handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      amountErrors: '',
      startDateErrors: '',
      endDateErrors: '',
      success: false,
    });

    this.toggleSubmitButton(true);

    const response = await newBudgetRequest(this.state, this.props.auth.token);

    if (response.status === 'error') {
      this.toggleSubmitButton(false);
      this.setState({ isLoading: false });
      this.handleFormErrors(response);
      return;
    }

    this.setState({ success: true, isLoading: false });
    setTimeout(() => {
      this.props.history.push('/dashboard');
    }, 1500);
  };

  handleFormErrors = (response: any) => {
    const { message, data } = response;

    if (message === 'you already have a pending budget') {
      this.toggleSubmitButton(true);
      this.setState({
        amountErrors: message,
        startDateErrors: message,
        endDateErrors: message,
      });
      return;
    }

    for (const err in data) {
      this.setState({
        [`${err}Errors`]: data[err].msg,
      });
    }
  };

  render() {
    return (
      <div className="setup">
        <form
          data-aos="slide-up"
          data-aos-duration="300"
          className="setup__form"
          onSubmit={this.handleFormSubmit}
        >
          <h2 className="setup__form__header">Let's setup your first budget</h2>
          <FormGroup
            id="amount"
            name="amount"
            inputType="number"
            value={this.state.amount}
            min={10000}
            error={this.state.amountErrors}
            success={this.state.success}
            labelIcon={<NairaIcon />}
            onChange={this.handleAmountChange}
            placeHolder="Budget amount"
          />

          <div className="setup__form__datepickers">
            <Datepicker
              parentClass="setup__form"
              label="Start of budget period"
              selected={this.state.startDate}
              startDate={this.state.startDate}
              onChange={this.handleDateChange('startDate')}
              error={this.state.startDateErrors}
              success={this.state.success}
              selectsStart
            />

            <span className="setup__form__datepickers__arrow">{'\u279e'}</span>

            <Datepicker
              parentClass="setup__form"
              label="End of budget period"
              selected={this.state.endDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              minDate={addMonths(this.state.startDate as Date, 1)}
              onChange={this.handleDateChange('endDate')}
              error={this.state.endDateErrors}
              success={this.state.success}
              selectsEnd
            />
          </div>

          <Button
            extraClasses="setup__form__button"
            ref={this.submitBtn}
            text="Create budget"
            type="submit"
            isLoading={this.state.isLoading}
          />
        </form>
        <div
          data-aos="slide-up"
          data-aos-duration="500"
          className="setup__dashboard-cta"
        >
          <span className="setup__dashboard-cta__content">
            <Link to="/dashboard">Go to dashboard</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Setup;
