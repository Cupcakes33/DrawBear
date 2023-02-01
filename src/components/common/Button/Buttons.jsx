import Button from "./Button";
import { BsPlus, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa";

const AddDiary = () => {
  return (
    <Button
      fs="3rem"
      bc="#ffffff"
      color="#cccccc"
      innerPadding="1rem"
      shadow
      round
    >
      <BsPlus />
    </Button>
  );
};

const AddPost = () => {
  return (
    <Button
      fs="4rem"
      bc="#3cc7a6"
      color="#ffffff"
      innerPadding="1rem"
      shadow
      round
    >
      <TiPencil />
    </Button>
  );
};

const AddComment = () => {
  return (
    <Button fs="2rem" bc="#3cc7a6" color="#ffffff" innerPadding=".8rem" round>
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

const Medium = ({ children, type }) => {
  const customProps = defaultColorProps(type);

  return (
    <Button size="medium" fs="1.4rem" {...customProps}>
      {children}
    </Button>
  );
};

const Small = ({ children }) => {
  return (
    <Button size="small" fs="1.4rem" color="#FFFFFF" bc="#3cc7a6">
      {children}
    </Button>
  );
};

const Invite = ({ children, isInvited }) => {
  const customProps = {};
  if (isInvited) customProps.color = "#9e9e9e";
  return (
    <Button
      fs="1.2rem"
      color="#ff5656"
      bc="#f5f5f5"
      size="mini"
      {...customProps}
    >
      {children}
    </Button>
  );
};

const Bookmark = ({ isBookmarked }) => {
  const customProps = {};
  isBookmarked
    ? (customProps.color = "#3cc7a6")
    : (customProps.color = "#cccccc");
  return (
    <Button fs="2rem" bc="#f5f5f5" innerPadding="0.6rem" {...customProps}>
      {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
    </Button>
  );
};

const Option = ({ children, negative }) => {
  const customProps = {};
  negative && (customProps.color = "#ff5656");
  return (
    <Button
      fs="1.4rem"
      bc="#f5f5f5"
      innerPadding="0.7rem 1.9rem"
      {...customProps}
    >
      {children}
    </Button>
  );
};

const Withdraw = ({ children }) => {
  return (
    <Button size="f-width" fs="1.7rem" color="#f5f5f5" bc="#ff5656">
      {children}
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
  Withdraw,
};
export default Buttons;
