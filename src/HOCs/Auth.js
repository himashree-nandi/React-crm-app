import UnAuthenticated from "../components/UnAuthenticated/UnAuthenticated";
import UnAuthorised from "../components/UnAuthorised/UnAuthorised";
import constants from "../utils/constants";
import { useLocation } from "react-router-dom";
const Authorization = (props) => {
  const location = useLocation(); // uselocation hook to find the path of the page
  //console.log(location)
  const page = location.pathname.slice(1);
  const userType = localStorage.getItem("userType");
  if (!userType) {
    return <UnAuthenticated />;
  }
  var requiredUserType = null;
  if (page === "admin") {
    requiredUserType = constants.constUserTypes.admin;
  } else if (page === "engineer") {
    requiredUserType = constants.constUserTypes.engineer;
  } else if (page === "customer") {
    requiredUserType = constants.constUserTypes.customer;
  }

  if (userType !== requiredUserType) {
    return <UnAuthorised userType={userType} />;
  }
  return <div>{props.children}</div>;
};
export default Authorization;
