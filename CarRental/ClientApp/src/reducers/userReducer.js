// userReducer.js
export const userReducer = (state, action) => {
  switch (action.type) {
      case 'LOGIN_SUCCESS':
          return {
              ...state,
              token: action.payload.token,
              role: action.payload.role,
              email: action.payload.email
          };
      case 'LOGOUT':
          return {
              ...state,
              token: null,
              role: null,
              email: null
          };
      // ... inne akcje
      default:
          return state;
  }
};
