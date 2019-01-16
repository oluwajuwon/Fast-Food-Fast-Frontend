import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login from '../../actions/index';
import NavBar from '../NavBar';
import Footer from '../Footer';
import '../../styles/box.css';

export class Login extends React.Component {
  state={
    email: '',
    password: '',
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { login: loginUser } = this.props;
    const userData = this.state;
    await loginUser(userData);
  }

  render() {
    const { email, password } = this.state;
    const { message } = this.props;
    return (
      <div>
        <NavBar />
        <section className="box-section">
          <div className="box-container">
            <div className="innerbox-container">
              <div className="form">
                <h2>Login to your account</h2>
                <form id="user-login" onSubmit={this.onFormSubmit}>
                  <div>
                    <p className="">Email</p>
                    <p>
                      {message}
                    </p>
                    <input
                      type="email"
                      className="textbox"
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
                    <button type="submit" id="submit-login" className="btn blue-bg-colour white-text">Login</button>
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
  message: '',
  login: () => {},
};

Login.propTypes = {
  login: PropTypes.func,
  message: PropTypes.string,
};

const mapStateToProps = state => ({
  message: state.login ? state.login.message : null,
  isSuccessful: state.login ? state.login.success : null,
});

export default connect(mapStateToProps, { login })(Login);
