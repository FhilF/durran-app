import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import DareComponent from "Pages/Dare";
import { fetchDare, clearDare } from "Utils/Actions/dareAction";

class DareList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { history, match } = this.props;
    const id = match.params.dareId;
    const query = { dareId: id };
    this.props.fetchDare(query);
    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (prevProps.match.params.dareId !== match.params.dareId) {
      const id = match.params.dareId;
      const query = { dareId: id };
      this.props.fetchDare(query);
    }
  }

  componentWillUnmount() {
    this.props.clearDare()
  }
  render() {
    const { isLoading } = this.state;
    const { history, dare, loadingReducer, userData } = this.props;
    return (
      <Box>
        {isLoading || loadingReducer ? (
          <>Loading</>
        ) : (
          <DareComponent dare={dare} userData={userData} />
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  dare: state.dareReducer.dare,
  loadingReducer: state.dareReducer.dareLoading,
  errorReducer: state.dareReducer.dareError,
  userData: state.authReducer.user,
});
export default connect(mapStateToProps, { fetchDare, clearDare })(DareList);
