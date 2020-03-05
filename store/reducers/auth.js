import { SIGNUP, LOGIN } from "../actions/auth";

const initialState = {
  token: null,
  userId: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };

    case LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };

    default:
      return state;
  }
};
