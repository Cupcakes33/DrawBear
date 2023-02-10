import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { __diaryType } from "../redux/modules/diarySlice";
import { __ErrorModal } from "../redux/modules/UISlice";

const useDispatchHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const openAlertModal = (payload) => {
    dispatch((__ErrorModal({ isModal: true, ...payload })));
  }

  const changeDiaryView = ({ icon, couple, bookmark, move = "/" }) => {
    dispatch(__diaryType({ icon, couple, bookmark }));
    navigate(move);
  };

  return { openAlertModal, changeDiaryView }
}

export default useDispatchHook;


