import Button from "../components/common/Button";
import { BsBookmark } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { AiOutlineArrowUp } from "react-icons/ai";

const ButtonPreview = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button size="mini" color="button_main" icon={<BsBookmark />}>
          BUTTON
        </Button>
        <Button size="mini" color="button_main">
          BUTTON
        </Button>
        <Button size="small" color="button_main">
          BUTTON
        </Button>
        <Button size="medium" color="button_main">
          BUTTON
        </Button>
        <Button size="large" color="button_main">
          BUTTON
        </Button>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button size="mini" color="button_primary" icon={<BsBookmark />}>
          BUTTON
        </Button>
        <Button size="mini" color="button_primary">
          BUTTON
        </Button>
        <Button size="small" color="button_primary">
          BUTTON
        </Button>
        <Button size="medium" color="button_primary">
          BUTTON
        </Button>
        <Button size="large" color="button_primary">
          BUTTON
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button
          size="mini"
          color="button_primary"
          icon={<BsBookmark />}
          outlined
        >
          BUTTON
        </Button>
        <Button size="mini" color="button_primary" outlined>
          BUTTON
        </Button>
        <Button size="small" color="button_primary" outlined>
          BUTTON
        </Button>
        <Button size="medium" color="button_primary" outlined>
          BUTTON
        </Button>
        <Button size="large" color="button_primary" outlined>
          BUTTON
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button size="mini" color="button_alart" icon={<BsBookmark />}>
          BUTTON
        </Button>
        <Button size="mini" color="button_alart">
          BUTTON
        </Button>
        <Button size="small" color="button_alart">
          BUTTON
        </Button>
        <Button size="medium" color="button_alart">
          BUTTON
        </Button>
        <Button size="large" color="button_alart">
          BUTTON
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button size="mini" color="button_alart" icon={<BsBookmark />} outlined>
          BUTTON
        </Button>
        <Button size="mini" color="button_alart" outlined>
          BUTTON
        </Button>
        <Button size="small" color="button_alart" outlined>
          BUTTON
        </Button>
        <Button size="medium" color="button_alart" outlined>
          BUTTON
        </Button>
        <Button size="large" color="button_alart" outlined>
          BUTTON
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button size="mini" color="button_icon" icon={<TiPencil />} round />
        <Button size="mini" color="button_primary" icon={<TiPencil />} round />
        <Button
          size="mini"
          color="button_icon"
          icon={<AiOutlineArrowUp />}
          round
        />
        <Button
          size="mini"
          color="button_primary"
          icon={<AiOutlineArrowUp />}
          round
        />
      </div>
      <Button>Default</Button>
    </div>
  );
};

export default ButtonPreview;
