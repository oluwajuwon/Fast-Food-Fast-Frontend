import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { signup } from '../../actions/index';
import NavBar from '../NavBar';
import Footer from '../presentation/Footer';
import '../../styles/box.css';

class Signup extends React.Component {
  state = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    message: '',
    loading: 'Sign up',
  }

  componentDidMount() {
    const { isLoggedin, history } = this.props;
    if (isLoggedin === true) {
      return history.push('/menu');
    }
    return null;
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: 'loading...' });
    const {
      signup: signupUser,
      history,
    } = this.props;
    const {
      fullName,
      username,
      email,
      password,
    } = this.state;
    const userData = {
      fullName,
      username,
      email,
      password,
    };
    await signupUser(userData);
    const { message, isSuccessful, errorMessage } = this.props;
    await this.setState({ loading: 'Sign up' });
    if (isSuccessful === 'true') {
      toast.success(message);
      return history.push('/menu');
    }
    return this.setState({ message: errorMessage });
  }

  comparePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return this.setState({ message: 'The passwords do not match' });
      }
      return this.setState({ message: '' });
    }
    return false;
  }

  render() {
    const { message, loading } = this.state;
    const { isSuccessful } = this.props;
    return (
      <div className="box-section">
        <NavBar />
        <section>
          <div className="box-container">
            <div className="innerbox-container">
              <div className="form">
                <h2>Create an account</h2>
                <form id="user-Signup" onSubmit={this.onFormSubmit}>
                  <div>
                    <p className={isSuccessful === 'true' ? 'green-text text-center' : 'red-text text-center'}>
                      {message}
                    </p>
                    <p className="">Full name</p>
                    <input
                      type="text"
                      className="textbox"
                      id="full-name"
                      onChange={event => this.setState({ fullName: event.target.value })}
                      required
                      placeholder="Enter full name here..."
                    />
                  </div>
                  <div>
                    <p className="">Username</p>
                    <input
                      type="text"
                      autoComplete="false"
                      className="textbox"
                      id="username"
                      onChange={event => this.setState({ username: event.target.value })}
                      required
                      placeholder="Enter username here..."
                    />
                  </div>
                  <div>
                    <p className="">Email</p>
                    <input
                      type="email"
                      className="textbox"
                      id="email"
                      onChange={event => this.setState({ email: event.target.value })}
                      required
                      placeholder="Enter email here..."
                    />
                  </div>
                  <div>
                    <p className="">Password</p>
                    <input
                      type="password"
                      className="textbox"
                      id="password"
                      onChange={event => this.setState({ password: event.target.value })}
                      onKeyUp={this.comparePassword}
                      required
                      placeholder="Enter password here..."
                    />
                  </div>
                  <div>
                    <p className="">Confirm Password</p>
                    <input
                      type="password"
                      className="textbox"
                      id="password-match"
                      onChange={event => this.setState({ confirmPassword: event.target.value })}
                      onKeyUp={this.comparePassword}
                      required
                      placeholder="Enter password again..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <button type="submit" id="submit-signup" className="btn blue-bg-colour white-text">{loading}</button>
                    <Link to="/login" className="secondary-text-color">Already have an account? Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

Signup.defaultProps = {
  message: '',
  errorMessage: '',
  signup: () => {},
  isSuccessful: '',
  history: null,
  isLoggedin: false,
};

Signup.propTypes = {
  signup: PropTypes.func,
  isLoggedin: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  isSuccessful: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth ? auth.isLoggedin : null,
  message: auth && auth.user ? auth.user.message : null,
  errorMessage: auth && auth.response ? auth.response.message : null,
  isSuccessful: auth && auth.user ? auth.user.success : null,
});

export default connect(mapStateToProps, { signup })(Signup);
