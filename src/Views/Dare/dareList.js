import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import DareListComponent from "Pages/Dare/dareList";
import { fetchDares } from "Utils/Actions/dareAction";

class DareList extends Component {
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
    const { isLoading } = this.state;
    const { history, dares, loadingReducer } = this.props;
    return (
      <Box>
        {isLoading || loadingReducer ? (
          <>Loading</>
        ) : (
          <DareListComponent data={dares} history={history} />
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  dares: state.dareReducer.dares,
  loadingReducer: state.dareReducer.daresLoading,
  errorReducer: state.dareReducer.daresError,
});
export default connect(mapStateToProps, { fetchDares })(DareList);
