import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { confirm } from '../../actions/auth';



class Confirm extends React.Component {
  state = {
    done: false
  };
  componentDidMount() {
    //console.log("test ()");
    let email = new URLSearchParams(this.props.location.search).get("email");
    let code = new URLSearchParams(this.props.location.search).get("code");
    this.props.confirm(email, code);
    setTimeout(() => this.setState({ done: true }), 3000);
    //this.setState({ done: true });
  }




  render() {
    if (this.state.done) return <Redirect to="/login" />;
    else return (
      <div style={{ marginTop: 50 }}>
        <div>
          {this.props.confirmed}
          {this.props.confirming}
        </div>
        <div>
          We have confirmed your account, you may now login! We will redirect you to the login page now.
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  confirm: (email, code) => dispatch(confirm(email, code))
})

const mapStateToProps = (state, ownProps) => ({
  confirmed: state.auth.emailConfirmed,
  confirming: state.auth.emailConfirming
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

