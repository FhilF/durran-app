import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import DareListAdminComponent from "Pages/DareAdmin/dareList";
import { connect } from "react-redux";
import { fetchDaresAdmin } from "Utils/Actions/dareAction";

class DareListAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.fetchDaresAdmin();
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    const { dares } = this.props;
    return (
      <Box>
        {isLoading ? <>Loading</> : <DareListAdminComponent dares={dares} />}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  dares: state.dareReducer.dares,
});
export default connect(mapStateToProps, { fetchDaresAdmin })(DareListAdmin);
