import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import AddDareComponent from "Pages/DareAdmin/addDare";
import { connect } from "react-redux";

class AddDare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { userData } = this.props;
    const { isLoading } = this.state;
    return (
      <Box>{isLoading ? <>Loading</> : <AddDareComponent userData={userData} />}</Box>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authReducer.user,
});
export default connect(mapStateToProps, {})(AddDare);
