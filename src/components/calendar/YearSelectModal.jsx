import React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { Modal } from "../common/modal/ReactModal";

const YearSelectModal = ({ children, onYearController }) => {
  const years = useCallback(() => {
    let yearArr = [];
    for (let i = 0; i < 20; i++) {
      yearArr.push(new Date().getFullYear() - i);
    }
    return yearArr;
  }, []);

  return (
    <>
      <Modal>
        <Modal.Trigger>{children}</Modal.Trigger>
        <Modal.Portal>
          <Modal.BackDrop>
            <Modal.ContentBox>
              <YearSelectorBox>
                <Modal.Close>
                  {years().map((year) => {
                    return (
                      <button key={year} onClick={() => onYearController(year)}>
                        {year}
                      </button>
                    );
                  })}
                </Modal.Close>
              </YearSelectorBox>
            </Modal.ContentBox>
          </Modal.BackDrop>
        </Modal.Portal>
      </Modal>
    </>
  );
};

export default YearSelectModal;

const YearSelectorBox = styled.div`
  width: 20rem;
  height: 40rem;
  border: none;
  border-radius: 15px;
  background-color: rgba(207, 207, 207, 0.9);
  overflow: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 3px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #8c8c8c;
    background-clip: padding-box;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    padding-top: 1rem;
  }
  ::-webkit-scrollbar-track {
  }
  button {
    width: 100%;
    height: 3rem;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #adadad;
    cursor: pointer;
  }
`;
