export const SIGNUP = "SIGNUP";

export const signup = (email, password) => {
  console.log("here ", email, password);
  return async dispatch => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDL6PahIwnXVDAWfGC768Wvv7r1QQrivok",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      console.log(resData);
      dispatch({ type: SIGNUP });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
};
