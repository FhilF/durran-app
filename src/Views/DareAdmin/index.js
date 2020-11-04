import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import DareAdminComponent from "Pages/DareAdmin";
import { connect } from "react-redux";
import {} from "Utils/Actions/dareAction";
import DareModel from "Models/Dare";

class DareAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dare: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const dareId = match.params.dareId;
    try {
      const dare = await DareModel.findById(dareId);
      this.setState({ dare: dare });
    } catch (e) {
      console.log(e);
    }
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading, dare } = this.state;
    // const { dares } = this.props;
    return (
      <Box>{isLoading ? <>Loading</> : <DareAdminComponent dare={dare} />}</Box>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(DareAdmin);
