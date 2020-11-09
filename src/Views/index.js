import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { fetchEntries } from "Utils/Actions/entryAction";
import HomeComponent from "Pages";

import LoadingEntryComponent from "Components/Entry/loading";

import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const {} = this.props;
    const query = { fetcher: null };
    this.props.fetchEntries(query);
    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    const { history, entries, loadingReducer } = this.props;
    return (
      <Box>
        {isLoading || loadingReducer ? (
          <Box>
            <LoadingEntryComponent />
            <LoadingEntryComponent />
          </Box>
        ) : entries !== false ? (
          <HomeComponent entries={entries} history={history} />
        ) : (
          <>No Data</>
        )}
      </Box>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = (state) => ({
  entries: state.entryReducer.entries,
  loadingReducer: state.entryReducer.entriesLoading,
  errorReducer: state.entryReducer.entriesError,
});
export default connect(mapStateToProps, { fetchEntries })(Home);
