const { GET_CORRECT_ANS_COUNT,RESET_CORRECT_ANS_COUNT } = require("../actionstype/actiontypes")

export const getCorrectAnsCount = (data) => ({
  type: GET_CORRECT_ANS_COUNT,
  payload:data
})

export const resetCorrectAnsCount = () => ({
  type: RESET_CORRECT_ANS_COUNT
})