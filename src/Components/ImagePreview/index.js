import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Box from "@material-ui/core/Box";
import { deepPurple, pink } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  rootImageGallery: {
    height: "300px",
    width: "100%",

    "& > div > div": {
      cursor: "pointer",
    },
  },

  rootImagePreviewContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  rootImagePreview: {
    display: "flex",
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    "& .active": {
      display: "inline-flex",
    },
  },

  previewImageContainer: {
    // display: "inline-flex",
    width: "100%",
    height: "100%",
    display: "none",
    margin: "auto",
  },

  imageContainer: {
    height: "inherit",
    width: "inherit",
    border: "solid 2px #363638",
    borderRadius: "15px",
    overflow: "hidden",
  },

  imageContainer2: {
    height: "inherit",
    width: "inherit",
    border: "solid 2px #363638",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    "& > div:nth-child(1)": {
      marginRight: ".7px",
    },
    "& > div:nth-child(2)": {
      marginLeft: ".7px",
    },
  },

  imageContainer3: {
    height: "inherit",
    width: "inherit",
    border: "solid 2px #363638",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    "& > div:nth-child(1)": {
      marginRight: ".7px",
    },
    "& > div:nth-child(2)": {
      marginLeft: ".7px",
    },
  },

  imageContainer4: {
    height: "inherit",
    width: "inherit",
    border: "solid 2px #363638",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    "& > div:nth-child(1)": {
      marginRight: ".7px",
    },
    "& > div:nth-child(2)": {
      marginLeft: ".7px",
    },
  },

  columnImageContainer: {
    width: "inherit",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    "& > div:nth-child(1)": {
      marginBottom: ".7px",
    },
    "& > div:nth-child(2)": {
      marginTop: ".7px",
    },
  },

  postImage: {
    height: "inherit",
    width: "inherit",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
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

  imagePreview: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(37, 37, 38, 0.7)",
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  previewPost: {
    width: "450px",
    height: "100vh",
    background: "#1a1a1d",
    borderLeft: "#2ff9af 5px solid",
  },

  wrapperPost: {
    width: "100%",
    padding: "10px",
  },

  iconButton: {
    height: "60px",
    width: "60px",
  },

  previewController: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  imagePreviewItem: {
    height: "inherit",
    width: "inherit",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
  },
  entryCardRoot: {
    backgroundColor: theme.custom.cardBg,
    boxShadow: "0 2px 4px 0 " + theme.custom.boxShadow,
  },
  cardContent: {
    padding: "20px",
  },
  userName: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },
}));

const ImagePreview = (props) => {
  const { handleImagePreview, entry, imageIndex, setImageIndex } = props;
  const classes = useStyles();
  let files = entry.file.media;

  const handleNext = () => {
    setImageIndex(imageIndex + 1);
  };

  const handlePrev = () => {
    setImageIndex(imageIndex - 1);
  };

  return (
    <Box>
      <Box className={classes.imagePreview}>
        <Box display="flex" style={{ position: "relative" }}>
          <Box style={{ width: "100%", height: "100vh" }}>
            <Box style={{ position: "absolute", padding: "10px", zIndex: "1" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview();
                }}
              >
                <CloseOutlinedIcon color="primary" />
              </IconButton>
            </Box>
            <Box className={classes.rootImagePreviewContainer}>
              <ul className={classes.rootImagePreview}>
                {files.map((file, index) => {
                  return (
                    <li
                      key={index}
                      className={clsx(
                        classes.previewImageContainer,
                        imageIndex - 1 === index ? "active" : null
                      )}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${file})`,
                        }}
                        className={classes.imagePreviewItem}
                      ></div>
                    </li>
                  );
                })}
              </ul>
              <Box className={classes.previewController}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ height: "100%" }}
                >
                  <Box display="flex" justifyContent="flex-start">
                    <Box display="flex" alignItems="center">
                      {0 === imageIndex - 1 ? null : (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                        >
                          <KeyboardArrowLeftOutlinedIcon
                            className={classes.iconButton}
                            color="primary"
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Box display="flex" alignItems="center">
                      {files.length === imageIndex ? null : (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                        >
                          <KeyboardArrowRightOutlinedIcon
                            className={classes.iconButton}
                            color="primary"
                          />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.previewPost}>
            <Box className={classes.wrapperPost}>
              <Box display="flex" style={{ marginBottom: "8px" }}>
                <Avatar className={classes.avatar}>F</Avatar>
                <Box display="flex" alignItems="center" pl={2}>
                  <Box>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.userName}
                    >
                      {entry.createdBy}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="p"
                      style={{ fontSize: "12px", lineHeight: 1.5 }}
                    >
                      {moment(entry.createdAt).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function ImageGallery(props) {
  const { entry } = props;
  const classes = useStyles();
  const [previewImage, setPreviewImage] = useState(false);
  const [imageIndex, setImageIndex] = useState("");

  let files = entry.file.media;

  const handleImagePreview = (index) => {
    var x = document.getElementsByTagName("BODY")[0];
    if (window.getComputedStyle(x).overflow === "visible") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    setImageIndex(index + 1);
    setPreviewImage(!previewImage);
  };

  return (
    <Box>
      {previewImage ? (
        <ImagePreview
          handleImagePreview={handleImagePreview}
          setImageIndex={setImageIndex}
          imageIndex={imageIndex}
          entry={entry}
        />
      ) : null}
      <Box className={classes.rootImageGallery}>
        {files.length === 1 ? (
          <Box className={classes.imageContainer}>
            <div
              className={classes.postImage}
              style={{
                backgroundImage: `url(${files[0]})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImagePreview(0);
              }}
            ></div>
          </Box>
        ) : null}
        {files.length === 2 ? (
          <Box className={classes.imageContainer2}>
            <div
              className={classes.postImage}
              style={{
                backgroundImage: `url(${files[0]})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImagePreview(0);
              }}
            ></div>
            <div
              className={classes.postImage}
              style={{
                backgroundImage: `url(${files[1]})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImagePreview(1);
              }}
            ></div>
          </Box>
        ) : null}
        {files.length === 3 ? (
          <Box className={classes.imageContainer3}>
            <div
              className={classes.postImage}
              style={{
                backgroundImage: `url(${files[0]})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleImagePreview(0);
              }}
            ></div>
            <Box className={classes.columnImageContainer}>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[1]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(1);
                }}
              ></div>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[2]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(2);
                }}
              ></div>
            </Box>
          </Box>
        ) : null}

        {files.length === 4 ? (
          <Box className={classes.imageContainer4}>
            <Box className={classes.columnImageContainer}>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[0]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(0);
                }}
              ></div>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[2]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(2);
                }}
              ></div>
            </Box>
            <Box className={classes.columnImageContainer}>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[1]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(1);
                }}
              ></div>
              <div
                className={classes.postImage}
                style={{
                  backgroundImage: `url(${files[3]})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImagePreview(3);
                }}
              ></div>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default ImageGallery;
