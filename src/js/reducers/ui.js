import _ from 'lodash'

const initialState = {
  frontpageTitle: 'Title of the frontpage'
}

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state)
  switch (action.type) {
    case 'SOME_EVENT_TO_CHANGE_TITLE':
      newState.frontpageTitle = 'New title of the frontpage'
      return newState
  }

  return state
}
