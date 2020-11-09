import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { v4 as uuidv4 } from "uuid";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";

import CircularProgress from "@material-ui/core/CircularProgress";

import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SaveIcon from "@material-ui/icons/Save";

import ImagePreviewUpload from "Components/ImagePreviewUpload";
import AlertSnackBar from "Components/AlertSnackBar";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import {
  SUPPORTED_MEDIA_FORMATS,
  SUPPORTED_IMAGE_FORMATS,
  SUPPORTED_VIDEO_FORMATS,
  IMAGE_FILE_SIZE_LIMIT,
} from "Utils/constants";
import { getConfig, User } from "radiks";

import EntryModel from "Models/Entry";
import isEmpty from "lodash/isEmpty";
import {
  isImageFileSizeAcceptable,
  compressImage,
  areAllImageFileSizesAcceptable,
} from "Utils/imageCompressor";

import imageCompression from "browser-image-compression";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  popOverRoot: {
    display: "inline-flex",
    padding: "3px",
    verticalAlign: "middle",
  },
  dareCardRoot: {
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
  },
  formEntryCardRoot: {
    marginTop: "8px",
    backgroundColor: theme.custom.cardBg,
    boxShadow: theme.custom.boxShadow,
  },
  cardContent: {
    paddingTop: "32px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  entryFormRoot: {},

  parentTextArea: {
    width: "100%",
    background: "transparent",
  },

  customTextArea: {
    paddingTop: "10px",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
  },

  profileUsername: {
    fontFamily: theme.custom.font2.fontFamily,
    fontWeight: 400,
  },
  PopoverBackdrop: {
    position: "fixed",
    left: "0px",
    top: " 0px",
    right: "0px",
    bottom: "0px",
    zIndex: "2",
    display: "block",
    width: "100%",
    height: "100%",
  },
  EmojiPopoverWrapper: {
    position: "absolute",
    transform: "translateX(-50%) translateY(10%)",
    width: "auto",
    zIndex: "3",
    "& .ContentWrapperEmoji:before": {
      position: "absolute",
      zIndex: 1,
      content: '""',
      right: "calc(50% + 5px)",
      top: "-8px",
      borderStyle: "solid",
      borderWidth: "0 10px 10px 10px",
      borderColor: "transparent transparent #fff transparent",
    },
  },

  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

let maxLengthCaption = 180;

const EmojiPopover = ({ setCaption, caption, loading }) => {
  const classes = useStyles();
  const [hideEmoji, setHideEmoji] = useState(true);
  const handleEmojiPopover = () => {
    setHideEmoji(!hideEmoji);
  };
  const onEmojiClick = (emoji) => {
    if (caption.length < maxLengthCaption - 1) {
      setCaption(caption + emoji.native);
    }
  };
  return (
    <Box className={classes.popOverRoot}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        size="small"
        onClick={() => {
          handleEmojiPopover();
        }}
        disabled={loading}
      >
        <SentimentSatisfiedOutlinedIcon />
      </IconButton>
      {hideEmoji ? null : (
        <Box>
          <Box className={classes.EmojiPopoverWrapper}>
            <Box className="ContentWrapperEmoji">
              <Picker onSelect={onEmojiClick} set="twitter" />
            </Box>
          </Box>
          <Box
            className={classes.PopoverBackdrop}
            onClick={() => {
              handleEmojiPopover();
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};

const EntryFrom = (props) => {
  const { userData, dare } = props;
  const classes = useStyles();
  const childRef = useRef();

  const { userSession } = getConfig();

  const [mediaLoading, setMediaLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  const [file, setFile] = useState(null);
  const [tempImgUrls, setTempImgUrls] = useState();
  const [tempVideoUrl, setTempVideoUrl] = useState();

  const [status, setStatus] = useState("");

  const setSnackbar = (type, message) => {
    let alert = { type: type, message: message };
    setStatus({
      alert,
      date: new Date(),
    });
  };

  const uploadFile = async (userSession, dir, file, options) => {
    const id = uuidv4();
    let extension;
    if (file.type === "image/png") {
      extension = ".png";
    } else if (file.type === "image/jpg") {
      extension = ".jpg";
    } else if (file.type === "image/jpeg") {
      extension = ".jpeg";
    } else if (file.type === "video/mp4") {
      extension = ".mp4";
    } else {
      extension = "";
    }
    const filename = `${dir}/${id}${extension}`;
    const gaialink = await userSession.putFile(filename, file, options);
    return gaialink;
  };

  const uploadMedia = async (files) => {
    if (files.type === "video") {
      return uploadFile(userSession, "durran", files.media, { encrypt: false });
    }
    return await Promise.all(
      files.media.map((image) =>
        uploadFile(userSession, "durran", image, { encrypt: false })
      )
    );
  };

  const checkFormat = (fileExt, formats) => {
    const result = fileExt.every(function (element, index) {
      if (!formats.includes(element)) {
        return false;
      }
      return true;
    });
    return result;
  };

  useEffect(() => {
    return () => {
      if (tempImgUrls) {
        tempImgUrls.forEach((url) => window.URL.revokeObjectURL(url));
      }
    };
  }, [tempImgUrls]);

  const uploadImageOptions = {
    maxSizeMB: 4,
    maxWidthOrHeight: 1800,
    useWebWorker: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let files = file;

    if (files !== null) {
      if (files.type === "image") {
        Promise.all(
          files.media.map((file) => {
            return new Promise((resolve, reject) => {
              resolve(imageCompression(file, uploadImageOptions));
            });
          })
        )
          .then(
            (images) => {
              files.media = images;
              return uploadMedia(files);
            },
            (err) => {
              setLoading(false);
              setSnackbar("error", "Error compressing image!");
              console.error(err);
            }
          )
          .then((result) => {
            files.media = result;
            const entryModel = new EntryModel({
              caption: caption,
              file: files,
              dareId: dare[0]._id,
              createdBy: userData.username,
            });
            return entryModel.save();
          })
          .then((result) => {
            console.log(result);
            setSnackbar("success", "Successfully submitted your entry!");
            setLoading(false);
          })
          .catch((error) => {
            setSnackbar(
              "error",
              "There was an error submitting your request!"
            );
            setLoading(false);
          });
      }

      if (files.type === "video") {
        try {
          const mediaLinks = await uploadMedia(files);
          files.media = mediaLinks;
          const entryModel = new EntryModel({
            caption: caption,
            file: files,
            dareId: dare[0]._id,
            createdBy: userData.username,
          });
          entryModel.save();
          setSnackbar("success", "Successfully submitted your entry!");
          setLoading(false);
        } catch (error) {
          console.log(error);
          setSnackbar("success", "There was an error submitting your request!");
          setLoading(false);
        }
      }
    }
  };

  const previewImageOptions = {
    maxSizeMB: 7,
    maxWidthOrHeight: 1800,
    useWebWorker: true,
  };

  const handleMediaInputChange = (e) => {
    e.preventDefault();
    setMediaLoading(true);
    setFile("");
    setTempVideoUrl("");
    let fileFormats = [];
    let fileType = "";
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileNameSplit = file.type.split("/");
      fileFormats.push(fileNameSplit[fileNameSplit.length - 1].toLowerCase());
    });

    if (!checkFormat(fileFormats, SUPPORTED_MEDIA_FORMATS)) {
      setSnackbar("error", "File extension not supported!");
      setMediaLoading(false);
      return null;
    }

    if (
      (files.length > 4 ||
        !checkFormat(fileFormats, SUPPORTED_IMAGE_FORMATS)) &&
      (files.length < 1 || !checkFormat(fileFormats, SUPPORTED_VIDEO_FORMATS))
    ) {
      setSnackbar("warning", "You can only upload 4 images or 1 video!");
      setMediaLoading(false);
      return null;
    }

    if (files.length !== 0) {
      fileType = files[0].type.split("/")[0];
    } else {
      setMediaLoading(false);
      return null;
    }

    if (fileType === "image") {
      setFile({ type: "image", media: files });

      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            resolve(imageCompression(file, previewImageOptions));
          });
        })
      ).then(
        (images) => {
          const tempUrls = images.map((file) =>
            window.URL.createObjectURL(file)
          );
          setTempImgUrls(tempUrls.length > 0 ? tempUrls : null);
          setMediaLoading(false);
        },
        (err) => {
          setMediaLoading(false);
          setSnackbar("error", "Error previewing image!");
          console.error(err);
        }
      );
    }

    if (fileType === "video") {
      if (files[0].size > 25000000) {
        setSnackbar("warning", "Maximum file size of video is 25mb!");
        setMediaLoading(false);
        return null;
      }
      let reader = new FileReader();

      reader.onload = (e) => {
        let blobData = files[0];
        setFile({ type: "video", media: blobData });
        const tempUrl = window.URL.createObjectURL(blobData);
        setTempVideoUrl(tempUrl.length > 0 ? tempUrl : null);
        setIsCompressing(false);
        setMediaLoading(false);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Box className={classes.root}>
      <AlertSnackBar key={status.date} status={status} />
      <Card className={classes.formEntryCardRoot}>
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography className={classes.title} variant="h6" component="h1">
              Submit your entry
            </Typography>
          </Box>
          <Box mt={4}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box display="flex">
                <Avatar className={classes.avatar}>F</Avatar>
                <Box display="flex" alignItems="center" pl={2}>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.profileUsername}
                  >
                    {userData.username}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.parentTextArea}>
                <TextField
                  className={classes.customTextArea}
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  placeholder="Add a caption to your entry"
                  fullWidth
                  disabled={loading}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  inputProps={{
                    maxLength: maxLengthCaption,
                  }}
                />
                {/* <textarea
                className={classes.textArea}
                name="Text1"
                cols="5"
                rows="5"
                placeholder="Add a caption to your entry"
              ></textarea> */}
              </Box>
              <Box mt={4}>
                {tempVideoUrl ? (
                  <Box mt={4}>
                    <CardMedia overlay={null}>
                      <video height="380" width="100%" controls>
                        <source src={tempVideoUrl} type={tempVideoUrl.type} />
                        Your browser does not support HTML5 video.
                      </video>
                    </CardMedia>
                  </Box>
                ) : null}
                {tempImgUrls ? <ImagePreviewUpload file={tempImgUrls} /> : null}
              </Box>
              <Box display="flex" justifyContent="flex-start" pt={1} pb={1}>
                <Box style={{ flex: 1 }}>
                  <Typography variant="subtitle1" component="p">
                    {caption.length}/{maxLengthCaption}
                  </Typography>
                </Box>
                <Box mr={10}>
                  <EmojiPopover
                    setCaption={setCaption}
                    caption={caption}
                    loading={loading}
                  />
                  {/* <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    size="small"
                    disabled={loading}
                    onClick={handleOpenEmoji}
                  >
                    <SentimentSatisfiedOutlinedIcon />
                  </IconButton> */}

                  <input
                    accept="image/*,video/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={async (e) => {
                      await handleMediaInputChange(e);
                    }}
                    disabled={loading}
                  />
                  <label htmlFor="raised-button-file">
                    <IconButton
                      color="primary"
                      disabled={loading}
                      variant="raised"
                      component="span"
                      aria-label="Add Image"
                      size="small"
                      className={classes.button}
                    >
                      <CropOriginalOutlinedIcon />
                    </IconButton>
                  </label>
                </Box>

                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={loading || mediaLoading}
                  >
                    {loading ? <>Submitting...</> : <>Submit</>}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default EntryFrom;
