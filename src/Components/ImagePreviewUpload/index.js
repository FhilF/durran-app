import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Box from "@material-ui/core/Box";
import { deepPurple, pink } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";

const useStyles = makeStyles((theme) => ({
  rootImagePreview: {
    // border: 'solid 5px #1a1a1d',
    // borderRadius: "15px"
  },
  media: {
    paddingTop: "56.25%", // 16:9
    height: "100%",
  },
  gridContainer: {
    border: "solid 1px #1a1a1d",
    borderRadius: "15px",
  },

  gridListA: {
    border: "solid 1px #1a1a1d",
    borderRadius: "15px 0 0 15px",
    borderRight: "none",
  },

  gridListB: {
    border: "solid 1px #1a1a1d",
    borderRadius: "0 15px 15px 0",
    borderLeft: "none",
  },

//   gridListTile: {
//     cursor: "pointer",
//   },

  imagePreview: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(37, 37, 38, 0.5)",
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  previewPost: {
    width: "380px",
    height: "100vh",
    background: "#1a1a1d",
    borderLeft: "#2ff9af 5px solid",
  },

  wrapperPost: {
    width: "100%",
    padding: "10px",
  },
}));

export default function ImagePreviewUpload(props) {
  const { file } = props;
  const classes = useStyles();

  const handleCellHeight = (data) => {
    if (data === 2 || data === 1) {
      return 320;
    }
    return 160;
  };

  const handleCols = (data) => {
    if (data === 1) {
      return 2;
    }
    return 1;
  };


  const HandleThreeImages = (props) => {
    const { images } = props;
    return (
      <Box>
        <Grid container spacing={0} className={classes.gridContainer}>
          <Grid item xs={6} className={classes.grid}>
            <Box mr={0.25}>
              <GridList
                cellHeight={160}
                spacing={2}
                className={classes.gridListA}
              >
                <GridListTile
                  cols={2}
                  row={2}
                  className={classes.gridListTile}
                >
                  <CardMedia className={classes.media} image={images[0]} />
                </GridListTile>
                <GridListTile
                  cols={2}
                  row={2}
                >
                  <CardMedia className={classes.media} image={images[1]} />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.grid}>
            <Box ml={0.25}>
              <GridList
                cellHeight={322}
                spacing={2}
                className={classes.gridListB}
              >
                <GridListTile cols={2} row={2}>
                  <CardMedia className={classes.media} image={images[2]} />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const HandleImages = (props) => {
    const { images } = props;
    return (
      <Box>
        <GridList
          cellHeight={handleCellHeight(images.length)}
          className={classes.gridContainer}
          spacing={2}
        >
          {images.map((tile) => (
            <GridListTile key={tile} cols={handleCols(images.length)}>
              <CardMedia className={classes.media} image={tile} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    );
  };

  return (
    <Box>
      <Box className={classes.rootImagePreview}>
        {file.length === 3 ? (
          <HandleThreeImages images={file} />
        ) : (
          <HandleImages images={file} />
        )}
      </Box>
    </Box>
  );
}
