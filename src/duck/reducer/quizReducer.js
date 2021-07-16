import { GET_CORRECT_ANS_COUNT, RESET_CORRECT_ANS_COUNT } from "../actionstype/actiontypes"

const initialState = {
  correctAnsCount:[]
}

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CORRECT_ANS_COUNT:
      return { ...state, correctAnsCount: action.payload}
    case RESET_CORRECT_ANS_COUNT:
      return { ...state, correctAnsCount: [] }
    default:
      return state
  }
}

export default quizReducer