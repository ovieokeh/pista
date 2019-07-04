import React, { FormEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { UserDetails } from '../../redux/types';
import { signupRequest } from '../../redux/actions/auth';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Signup.less';
import { FormComponentProps } from 'antd/lib/form';

interface UserFormProps extends UserDetails, FormComponentProps {
  signup: Function;
  loading: boolean;
  error: any;
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class SForm extends React.Component<UserFormProps, any> {
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { form, signup } = this.props;

    form.validateFields(async (err: string, details: UserDetails) => {
      if (!err) {
        await signup(details);
        const { error } = this.props;

        error
          ? this.renderErrors(error, details, form)
          : this.props.history.push('/');
      }
    });
  };

  renderErrors = (error: any, details: UserDetails, form: any) => {
    if (error.message === 'email already in use') {
      form.setFields({
        email: {
          value: details['email'],
          errors: [new Error('email already in use')]
        }
      });
      return;
    }

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
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="signup-container">
        <Head>
          <title>Start tracking - Pista</title>
        </Head>
        <Form
          data-aos="fade-up"
          onSubmit={this.handleSubmit}
          className="signup-form"
        >
          <h2>Create an account to get started</h2>
          <Form.Item>
            {getFieldDecorator('firstName', {
              rules: [
                { required: true, message: 'Please input your first name!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="First name"
                autoComplete="firstName"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('lastName', {
              rules: [
                { required: true, message: 'Please input your last name!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Last name"
                autoComplete="lastName"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                autoComplete="email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
                autoComplete="password"
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              rules: [
                {
                  required: true,
                  message: 'You have to accept the terms and conditions'
                }
              ],
              valuePropName: 'checked'
            })(
              <Checkbox>
                I have read the{' '}
                <Link href="/agreement">
                  <a>agreement</a>
                </Link>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
              disabled={loading}
            >
              Sign up
              {loading && <Icon type="loading" />}
            </Button>
            Or{' '}
            <Link href="/login">
              <a>log in</a>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const USignup = Form.create<UserFormProps>({ name: 'normal_signup' })(SForm);

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch: any) => ({
  signup: (userDetails: UserDetails) => dispatch(signupRequest(userDetails))
});

export const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(USignup);
