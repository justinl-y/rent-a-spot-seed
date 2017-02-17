// import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  component: {
    height: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '500px',
  },
  textField: {
    width: '100%',
  },
  floatingLabelStyle: {
    color: cyan500,
  },
  errorStyle: {
    color: cyan500,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: '45%',
  },
};

class SignUp extends Component {
  constructor(onSignUpSignInClick) {
    super(onSignUpSignInClick);

    this.state = {
      fields: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      fieldErrors: {},
    };
  }

  // call validation and set data state
  handleTextFieldChange(e, validation) {
    const fieldErrors = this.state.fieldErrors;
    delete fieldErrors[e.target.name];

    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;

    validation.forEach((type) => {
      switch (type) {
        case 'req':
          if (!fields[e.target.name]) {
            const errorObject = { [e.target.name]: 'Required field' };
            this.setState({ fieldErrors: { ...this.state.fieldErrors, ...errorObject } });
          }
          break;
        case 'num':
          if (isNaN(fields[e.target.name])) {
            const errorObject = { [e.target.name]: 'Number required' };
            this.setState({ fieldErrors: { ...this.state.fieldErrors, ...errorObject } });
          }
          break;
        case 'len':
          if (fields[e.target.name].length < 6) {
            const errorObject = { [e.target.name]: 'Field must be 6 characters long' };
            this.setState({ fieldErrors: { ...this.state.fieldErrors, ...errorObject } });
          }
          break;
        default:
      }
    });

    this.setState({ fields });
  }

  validate(data) {
    this.setState({
      fieldErrors: {},
    });

    const errors = {};
    // TODO validation errors into central source
    // TODO data formats

    if (!data.email) errors.email = 'Required field';
    if (data.password !== data.confirmPassword) {
      errors.password = 'Password and confirm password must be equal';
      errors.confirmPassword = 'Password and confirm password must be equal';
    }
    if (data.password.length < 6) errors.password = 'Field must be 6 characters long';
    if (!data.password) errors.password = 'Required field';
    if (data.confirmPassword.length < 6) errors.confirmPassword = 'Field must be 6 characters long';
    if (!data.confirmPassword) errors.confirmPassword = 'Required field';

    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();

    const signUp = this.state.fields;
    const fieldErrors = this.validate(signUp);

    this.setState({ fieldErrors });
    delete signUp.confirmPassword;

    if (Object.keys(fieldErrors).length) return;

    // submit data
    this.props.onSignUpSignInClick(signUp);
  }

  /* submitAction() {
    const { email, password, confirmPassword } = this.state;

    if (password === confirmPassword && password !== '' && confirmPassword !== '') {
      const accountInfo = {
        email,
        password,
      };

      // Accounts from meteor package
      Accounts.createUser(accountInfo, (error) => {
        if (error) {
          console.log('There was an error, you suck!', 4000);
        } else {
          Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
              console.log('There was an error creating your account!', 4000);
            } else {
              this.props.router.push('/menu');
            }
          });
        }
      });
    } else {
      console.log('Your passwords do not match!');
    }
  } */

  /* handleInputChange(input, event) {
    const updateState = {};
    updateState[input] = event.target.value;
    this.setState(updateState);
  }*/

  render() {
    return (
      <div style={styles.component}>
        <Card style={styles.card}>
          <Paper>
            <Toolbar>
              <ToolbarTitle text="Sign Up" />
            </Toolbar>
            <CardText>
              <TextField
                style={styles.textField}
                name="email"
                hintText="Email"
                errorText={this.state.fieldErrors.email}
                floatingLabelText="Email"
                floatingLabelStyle={styles.floatingLabelStyle}
                value={this.state.fields.email}
                onChange={e => this.handleTextFieldChange(e, ['req'])}
              />
              <TextField
                style={styles.textField}
                name="password"
                hintText="Password"
                errorText={this.state.fieldErrors.password}
                floatingLabelText="Password"
                floatingLabelStyle={styles.floatingLabelStyle}
                type="password"
                value={this.state.fields.password}
                onChange={e => this.handleTextFieldChange(e, ['req'])}
              />
              <TextField
                style={styles.textField}
                name="confirmPassword"
                hintText="Confirm Password"
                errorText={this.state.fieldErrors.confirmPassword}
                floatingLabelText="Confirm Password"
                floatingLabelStyle={styles.floatingLabelStyle}
                type="password"
                value={this.state.fields.confirmPassword}
                onChange={e => this.handleTextFieldChange(e, ['req'])}
              /><br />
              <RaisedButton
                style={styles.buttonStyle}
                labelColor="black"
                label="Sign Up"
                onClick={(e) => { this.handleSubmit(e); }}
              />
            </CardText>
          </Paper>
        </Card>
      </div>
    );
  }
}

SignUp.propTypes = {
  // router: PropTypes.object.isRequired,
  onSignUpSignInClick: PropTypes.func.isRequired,
};

export default SignUp;
