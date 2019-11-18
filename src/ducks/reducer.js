const initialState = {
  email: "",
  user_id: "",
  profile_img: "",
  post: {
    title: '',
    content: '',
    user_id: '',
    profile_img: ''
  }
};

//action constants
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const UPDATE_POST = "UPDATE_POST"

//action builders
export function updateUserInfo(userObj) {
  return {
    type: UPDATE_USER_INFO,
    payload: userObj
  };
}

export function updatePost(target) {
  const {name, value} = target;
  return {
    type: UPDATE_POST,
    payload: {name, value}
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return { ...state, ...action.payload };
    case UPDATE_POST:
      return {...state, post:{...state.post, [action.payload.name]: action.payload.value}}
    default:
      return state;
  }
}
