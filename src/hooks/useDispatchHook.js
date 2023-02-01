import { useDispatch } from 'react-redux';
import { ErrorModal } from "../redux/modules/UISlice";

const useDispatchHook = () => {
  const dispatch = useDispatch();

  const ErrorHandlerModal = (payload) => {
    dispatch((ErrorModal({ isModal: true, ...payload })));
  }

  return { openAlertModal: ErrorHandlerModal }
}

export default useDispatchHook;


