import Button from "./Button";
import { BsPlus, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AddDiary = ({ ...rest }) => {
  return (
    <Button
      fs="3rem"
      bc="#ffffff"
      color="#cccccc"
      innerPadding="1rem"
      shadow
      round
      {...rest}
    >
      <BsPlus />
    </Button>
  );
};

const AddPost = ({ ...rest }) => {
  return (
    <Button
      fs="4rem"
      bc="#3cc7a6"
      color="#ffffff"
      innerPadding="1rem"
      shadow
      round
      {...rest}
    >
      <TiPencil />
    </Button>
  );
};

const AddComment = ({ ...rest }) => {
  return (
    <Button
      fs="2rem"
      bc="#3cc7a6"
      color="#ffffff"
      innerPadding=".8rem"
      round
      {...rest}
    >
      <FaArrowUp />
    </Button>
  );
};

//
//
const defaultColorProps = (type) => {
  const obj = {};
  switch (type) {
    case "positive":
      obj.color = "#ffffff";
      obj.bc = "#3cc7a6";
      break;
    case "negative":
      obj.color = "#ffffff";
      obj.bc = "#ff5656";
      break;
    default:
      obj.color = "#242424";
      obj.bc = "#f5f5f5";
  }
  return obj;
};

const Medium = ({ children, type, ...rest }) => {
  const customProps = defaultColorProps(type);

  return (
    <Button size="medium" fs="1.4rem" {...customProps} {...rest}>
      {children}
    </Button>
  );
};

const Small = ({ children, ...rest }) => {
  return (
    <Button size="small" fs="1.4rem" color="#FFFFFF" bc="#3cc7a6" {...rest}>
      {children}
    </Button>
  );
};

const Invite = ({ children, isInvited, ...rest }) => {
  const customProps = {};
  if (isInvited) customProps.color = "#9e9e9e";
  return (
    <Button
      fs="1.2rem"
      color="#ff5656"
      bc="#f5f5f5"
      size="mini"
      {...customProps}
      {...rest}
    >
      {children}
    </Button>
  );
};

const Bookmark = ({ isBookmarked, ...rest }) => {
  const customProps = {};
  isBookmarked
    ? (customProps.color = "#3cc7a6")
    : (customProps.color = "#cccccc");
  return (
    <Button
      fs="2rem"
      bc="#ffffff"
      innerPadding="0.6rem"
      {...customProps}
      {...rest}
    >
      {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
    </Button>
  );
};

const Option = ({ children, negative, ...rest }) => {
  const customProps = {};
  negative && (customProps.color = "#ff5656");
  return (
    <Button
      fs="1.4rem"
      bc="#f5f5f5"
      innerPadding="0.7rem 1.9rem"
      {...customProps}
      {...rest}
    >
      {children}
    </Button>
  );
};

const Full = ({ children, type, ...rest }) => {
  const customProps = defaultColorProps(type);
  return (
    <Button size="f-width" fs="1.7rem" {...customProps} {...rest}>
      {children}
    </Button>
  );
};

const Navigate = ({ to, prev, ...rest }) => {
  const navigate = useNavigate();
  const navigateButtonHandler = () => {
    if (prev) {
      if (to) {
        navigate(to);
      } else {
        navigate(-1);
      }
    } else {
      navigate(to);
    }
  };
  return (
    <Button bc="transparent" onClick={navigateButtonHandler} {...rest}>
      {prev ? <GrPrevious /> : <GrNext />}
    </Button>
  );
};

const Buttons = {
  AddDiary,
  AddComment,
  AddPost,
  Medium,
  Small,
  Invite,
  Bookmark,
  Option,
  Full,
  Navigate,
};
export default Buttons;
