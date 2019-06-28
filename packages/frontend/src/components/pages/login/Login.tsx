import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginCredentials } from '../../../redux/types';
import { loginRequest } from '../../../redux/actions/auth';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.scss';
import { FormComponentProps } from 'antd/lib/form';

interface UserFormProps extends LoginCredentials, FormComponentProps {
  login: Function;
  history: any;
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

class LForm extends React.Component<UserFormProps, any> {
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { form, login } = this.props;

    form.validateFields(async (err: any, details: LoginCredentials) => {
      if (!err) {
        await login(details);
        const { error } = this.props;

        if (details.remember) {
          window.localStorage.setItem('remember', 'true');
        }

        error
          ? this.renderErrors(error, details, form)
          : this.props.history.push('/');
      }
    });
  };

  renderErrors = (error: any, details: LoginCredentials, form: any) => {
    if (error) {
      form.setFields({
        email: {
          value: details['email'],
          errors: [new Error(error.message)]
        },
        password: {
          value: details['password'],
          errors: [new Error(error.message)]
        }
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-container">
        <Form
          data-aos="fade-up"
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <h2>Welcome back</h2>

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
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('remember', {
              valuePropName: 'remember'
            })(<Checkbox>Remember me</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
            >
              Log in
              {loading && <Icon type="loading" />}
            </Button>
            Or <Link to="/signup">sign up</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ULogin = Form.create<UserFormProps>({ name: 'normal_login' })(LForm);

const mapStateToProps = (state: any) => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (credentials: LoginCredentials) => dispatch(loginRequest(credentials))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(ULogin);
