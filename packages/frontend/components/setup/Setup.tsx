import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Form, DatePicker, InputNumber, Divider, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { budgetRequest } from '../../redux/actions/budget';
import { BudgetDetails } from '../../redux/types';
import './Setup.less';
import Router from 'next/router';

interface SetupProps extends FormComponentProps {
  createBudget: Function;
  history: any;
  loading: boolean;
  error: any;
  loggedIn: boolean;
}

const dateConfig = {
  rules: [
    {
      required: true,
      message: 'Please select a date'
    }
  ]
};

class LSsetup extends React.Component<SetupProps, any> {
  static getInitialProps(props: any) {
    const { reduxStore } = props;
    const ret: any = { loggedIn: false };

    if (reduxStore.getState().auth.token) {
      ret.loggedIn = true;
    }

    return ret;
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      Router.push('/');
    }
  }

  handleSubmit = (event: FormEvent) => {
    const { form, createBudget } = this.props;

    event.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) return;

      const budgetDetails: BudgetDetails = {
        amount: values.amount,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD')
      };

      await createBudget(budgetDetails);

      this.props.error
        ? this.renderErrors(this.props.error, values, form)
        : this.props.history.push('/dashboard');
    });
  };

  renderErrors = (error: any, details: BudgetDetails, form: any) => {
    for (let field in error.data) {
      form.setFields({
        [field]: {
          value: details[field],
          errors: [new Error(error.data[field].msg)]
        }
      });
    }
  };

  render() {
    const amountConfig = {
      initialValue: 1000.0,
      rules: [
        {
          type: 'number',
          required: true,
          message: 'Please input a valid budget amount'
        }
      ]
    };

    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    return (
      <div className="setup-container">
        <Head>
          <title>Setup your budget - Pista</title>
        </Head>
        <Form data-aos="fade-up" onSubmit={this.handleSubmit}>
          <h2 data-aos="fade-up" data-aos-delay="50">
            Let's setup your first budget
          </h2>

          <Divider data-aos="zoom-in" />

          <Form.Item label="amount" hasFeedback={true}>
            {getFieldDecorator('amount', amountConfig)(
              <InputNumber
                min={1000.0}
                formatter={value =>
                  `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => `${value}`.replace(/₦\s?|(,*)/g, '')}
                size="default"
              />
            )}
          </Form.Item>

          <Form.Item label="Budget Start Date" hasFeedback={true}>
            {getFieldDecorator('startDate', dateConfig)(<DatePicker />)}
          </Form.Item>

          <Form.Item
            label="Budget End Date"
            help={
              this.props.form.getFieldError('endDate') ||
              'must be at least 1 month after start date'
            }
            hasFeedback={true}
          >
            {getFieldDecorator('endDate', dateConfig)(<DatePicker />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="setup-form-btn"
              disabled={loading}
            >
              Create budget
              {loading && <Icon type="loading" />}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.budget.loading,
  error: state.budget.error
});

const mapDispatchToProps = (dispatch: any) => ({
  createBudget: (budgetDetails: BudgetDetails) =>
    dispatch(budgetRequest(budgetDetails))
});

const USetup = Form.create<SetupProps>({ name: 'setup_form' })(LSsetup);
export const Setup = connect(
  mapStateToProps,
  mapDispatchToProps
)(USetup);
