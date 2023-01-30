import Button from "../components/common/Button";
import { BsBookmark } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { AiOutlineArrowUp } from "react-icons/ai";
import Dropdown from "../components/common/dropdown/Dropdown";
import ListPageDropdown from "../components/common/dropdown/ListPageDropdown";

const ButtonPreview = () => {
  return (
    <>
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
          <Button
            size="mini"
            color="button_alart"
            icon={<BsBookmark />}
            outlined
          >
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
          <Button
            size="mini"
            color="button_primary"
            icon={<TiPencil />}
            round
          />
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
      <Dropdown>
        <Dropdown.Toggle>
          <Button
            size="mini"
            color="button_primary"
            icon={<TiPencil />}
            round
          />
        </Dropdown.Toggle>
        <Dropdown.Container>
          <Dropdown.Wrapper>
            <Dropdown.Menu>
              <div
                style={{
                  width: "8rem",
                  height: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <TiPencil />
                <span style={{ fontSize: "1.4rem" }}>공부하기</span>
              </div>
            </Dropdown.Menu>
            <Dropdown.Menu>
              <div
                style={{
                  width: "8rem",
                  height: "4rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <TiPencil />
                <span style={{ fontSize: "1.4rem" }}>공부하기</span>
              </div>
            </Dropdown.Menu>
          </Dropdown.Wrapper>
        </Dropdown.Container>
      </Dropdown>
      <ListPageDropdown />
    </>
  );
};

export default ButtonPreview;
