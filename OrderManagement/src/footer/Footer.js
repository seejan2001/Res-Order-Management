import { setFooterInfo } from "../app/footerslice";
import { useDispatch } from "react-redux";
import { getDataFromCart } from "../app/foodslice";

const Footer = ({ icon }) => {
  const dispatch = useDispatch();

  return (
    <>
      {icon === 1 ? (
        <>
          <button onClick={() => dispatch(setFooterInfo("favourite"))}>
            Favourite
          </button>
          <button onClick={() => dispatch(setFooterInfo("veg"))}>Veg</button>
          <button onClick={() => dispatch(setFooterInfo("nonveg"))}>
            Nonveg
          </button>
        </>
      ) : (
        <>
          <button onClick={() => dispatch(getDataFromCart())}>Confirm</button>
        </>
      )}
    </>
  );
};

export default Footer;
