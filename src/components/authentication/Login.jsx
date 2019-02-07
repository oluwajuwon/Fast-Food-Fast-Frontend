import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { login } from '../../actions/index';
import NavBar from '../NavBar';
import Footer from '../presentation/Footer';
import '../../styles/box.css';

class Login extends React.Component {
  state={
    email: '',
    password: '',
    loading: 'Login',
  };

  componentDidMount() {
    setTimeout(async () => {
      const { isLoggedin, history } = this.props;
      if (isLoggedin === false) {
        return null;
      }
      return history.push('/menu');
    }, 200);
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: 'Loading...' });
    const { login: loginUser } = this.props;
    const { email, password } = this.state;
    const userData = { email, password };
    await loginUser(userData);
    const {
      responseMessage, isSuccessful, history, errorMessage,
    } = this.props;
    this.setState({ loading: 'Login' });

    if (isSuccessful === 'true') {
      toast.success(responseMessage);
      return history.push('/menu');
    }
    return toast.error(errorMessage);
  }

  render() {
    const {
      email,
      password,
      loading,
    } = this.state;
    return (
      <div className="box-section">
        <NavBar />
        <section>
          <div className="box-container">
            <div className="innerbox-container">
              <div className="form">
                <h2>Login to your account</h2>
                <form id="user-login" onSubmit={this.onFormSubmit}>
                  <div>
                    <p className="">Email</p>
                    <input
                      type="email"
                      className="textbox"
                      name="email"
                      value={email}
                      onChange={event => this.setState({ email: event.target.value })}
                      id="email"
                      required
                      placeholder="Enter email here..."
                    />
                  </div>
                  <div>
                    <p className="">Password</p>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={event => this.setState({ password: event.target.value })}
                      className="textbox"
                      required
                      placeholder="Enter password here..."
                    />
                  </div>
                  <p>
                    <a href="forgotpassword.html" className="">forgot password?</a>
                  </p>
                  <br />
                  <div className="">
                    <button type="submit" id="submit-login" className="btn blue-bg-colour white-text">{loading}</button>
                  </div>
                  <span id="error" />
                  <br />
                  <div className="">
                    <Link to="/signup" className="">
                      {'Don\'t have an account? Sign Up'}
                    </Link>
                  </div>
                  <br />
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

Login.defaultProps = {
  responseMessage: '',
  errorMessage: '',
  login: () => {},
  isSuccessful: '',
  history: null,
  isLoggedin: false,
};

Login.propTypes = {
  login: PropTypes.func,
  responseMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.object]),
  isSuccessful: PropTypes.string,
  isLoggedin: PropTypes.bool,
};

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth ? auth.isLoggedin : null,
  responseMessage: auth && auth.user ? auth.user.message : null,
  errorMessage: auth && auth.response ? auth.response.message : null,
  isSuccessful: auth && auth.user ? auth.user.success : null,
});

export default connect(mapStateToProps, { login })(Login);
