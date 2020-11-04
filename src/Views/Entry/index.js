import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import EntryComponent from "Pages/Entry";
import { fetchEntry, clearEntry } from "Utils/Actions/entryAction";

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { history, match } = this.props;
    const id = match.params.entryId;
    const query = { entryId: id };
    this.props.fetchEntry(query);
    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (prevProps.match.params.entryId !== match.params.entryId) {
      const id = match.params.entryId;
      const query = { entryId: id };
      this.props.fetchEntry(query);
    }
  }

  componentWillUnmount() {
    this.props.clearEntry()
  }

  render() {
    const { isLoading } = this.state;
    const { history, entry, loadingReducer, userData } = this.props;
    return (
      <Box>
        {isLoading || loadingReducer ? (
          <>Loading</>
        ) : entry !== false ? (
          <EntryComponent history={history} entry={entry} />
        ) : (
          <>no data </>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  entry: state.entryReducer.entry,
  loadingReducer: state.entryReducer.entryLoading,
  errorReducer: state.entryReducer.entryError,
  userData: state.authReducer.user,
});
export default connect(mapStateToProps, { fetchEntry,clearEntry })(Entry);
