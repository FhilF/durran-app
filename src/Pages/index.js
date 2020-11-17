import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { fetchEntries } from "Utils/Actions/entryAction";
import LoadingEntryComponent from "Components/Entry/loading";
import { connect } from "react-redux";
import EntryComponent from "Components/Entry";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Home(props) {
  const classes = useStyles();
  const { fetchEntries, entries, loadingReducer, errorReducer, history } = props;
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const query = { fetcher: null };
    fetchEntries(query);
  }, [fetchEntries]);

  useEffect(() => {
    setPageLoading(false);
  }, []);
  // const { entries, history } = props;
  return (
    <Box className={classes.root} p={2}>
      {!pageLoading &&
        !loadingReducer &&
        entries.map((row, index) => {
          return <EntryComponent entry={row} key={row._id} history={history} />;
        })}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  entries: state.entryReducer.entries,
  loadingReducer: state.entryReducer.entriesLoading,
  errorReducer: state.entryReducer.entriesError,
});
export default connect(mapStateToProps, { fetchEntries })(Home);
