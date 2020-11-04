import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

import { deepPurple, green, orange } from "@material-ui/core/colors";

// import adminDareListStyle from "assets/styles/adminDareListStyle";
import moment from "moment";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Dare",
  },
  {
    id: "dateTimeStart",
    numeric: false,
    disablePadding: false,
    label: "Start",
  },
  { id: "dateTimeEnd", numeric: false, disablePadding: false, label: "End" },
  { id: "entryCount", numeric: false, disablePadding: true, label: "Entries" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "protein", numeric: false, disablePadding: false, label: "Action" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={classes.tableSortLabel}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const { addDare } = props;
  const classes = useToolbarStyles();

  return (
    <Box pt={4} pl={4} pr={4} display="flex">
      <Typography
        className={classes.title}
        display="inline"
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Dares
      </Typography>
      <Box>
        <Button variant="contained" color="secondary" onClick={() => addDare()}>
          Add
        </Button>
      </Box>
    </Box>
    // <Toolbar className={clsx(classes.root)}>
    //   <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
    //     Dares
    //   </Typography>

    //   <Tooltip title="Filter list">
    //   <IconButton aria-label="filter list">
    //     <FilterListIcon />
    //   </IconButton>
    //   <IconButton aria-label="filter list">
    //     <FilterListIcon />
    //   </IconButton>
    //     {/* <IconButton aria-label="filter list">
    //       <FilterListIcon />
    //     </IconButton> */}
    //   </Tooltip>
    // </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    "& .MuiTableCell-body": {
      color: "#e4e6eb",
      // ...defaultFont,
    },
    "& .MuiButtonBase-root": {
      color: orange[400],
      // ...boldFont,
    },
    "& .MuiTableSortLabel-icon": {
      color: orange[400],
      // ...defaultFont,
    },
    "& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon": {
      color: orange[600],
      // ...defaultFont,
    },
    "& .MuiChip-icon": {
      color: "#fff",
    },
    "& .MuiChip-label": {
      color: "#fff",
      // ...defaultFont,
    },
    "& .MuiTypography-h6": {
      color: "#e4e6eb",
      // ...boldFont,
    },
    "& .MuiTablePagination-caption": {
      color: "#e4e6eb",
      // ...defaultFont,
    },
    "& .MuiSelect-select.MuiSelect-select": {
      color: orange[400],
      // ...boldFont,
    },
    "& .MuiSelect-icon": {
      color: orange[600],
    },
  },
  rowNumber: {
    // ...boldFont,
  },
  title: {
    color: "#fff",
    // ...boldFont,
  },
  table: {},
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  activeChip: {
    backgroundColor: green["A400"],
  },
  pendingChip: {
    backgroundColor: orange[400],
  },
  finishedChip: {
    backgroundColor: deepPurple[400],
  },
}));

const DareListAdmin = (props) => {
  const { dares, addDare } = props;
  console.log(dares)
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dares.length - page * rowsPerPage);

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  const handleStatus = (status) => {
    if (status === "active") {
      return (
        <Chip
          icon={<CheckCircleOutlineOutlinedIcon />}
          label="Active"
          className={classes.activeChip}
        />
      );
    }
    if (status === "finished") {
      return (
        <Chip
          icon={<FlagOutlinedIcon />}
          label="Finished"
          className={classes.pendingChip}
        />
      );
    }
    return (
      <Chip
        icon={<AccessTimeOutlinedIcon />}
        label="Pending"
        className={classes.finishedChip}
      />
    );
  };

  return (
    <Box m={4} className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar addDare={addDare} />
        <Box mt={4} mr={4} ml={4}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(dares, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const dateTimeStart = moment(row.dateTimeStart).format(
                      "MM/DD/YY - HH:mm"
                    );
                    const dateTimeEnd = moment(row.dateTimeEnd).format(
                      "MM/DD/YY - HH:mm"
                    );
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell
                          align="left"
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell align="left">{dateTimeStart}</TableCell>
                        <TableCell align="left">{dateTimeEnd}</TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            className={classes.rowNumber}
                          >
                            {row.entryCount}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {handleStatus(row.status)}
                        </TableCell>
                        <TableCell align="left">
                          <Link to={`/admin/dare/${row._id}`}>
                            <Button variant="contained" color="secondary">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dares.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
export default DareListAdmin;
