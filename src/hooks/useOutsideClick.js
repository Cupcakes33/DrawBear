import { useEffect } from "react";

const useOutsideClick = (ref, setState) => {
  useEffect(() => {
    const outSideClicked = (event) => {
      !ref.current.contains(event.target) && setState(false);
    };

    document.addEventListener("mousedown", outSideClicked);
    return () => {
      document.removeEventListener("mousedown", outSideClicked);
    };
  }, []);
};

export default useOutsideClick;
