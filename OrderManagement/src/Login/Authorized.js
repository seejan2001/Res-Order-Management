import Validate from "./Validate";

const AuthorizedLogin = async (email, password, setState) => {
  if (email === "" && password === "") {
    alert("Enter email and password");
  } else if (email === "") {
    alert("Insert Email");
  } else if (password === "") {
    alert("Insert Password");
  } else {
    const res = await Validate(email, password, setState);
  }
};

export default AuthorizedLogin;
