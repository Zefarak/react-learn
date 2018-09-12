export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
function fetchPeopleSuccess (people) {
  return {type: FETCH_PEOPLE_SUCCESS, people};
}

export const SAVE_PEOPLE_REQUEST = 'SAVE_PEOPLE_REQUEST';
function savePeopleRequest () {
  return {type: SAVE_PEOPLE_REQUEST};
}

export const SAVE_PEOPLE_FAILURE = 'SAVE_PEOPLE_FAILURE';
function savePeopleFailure (error) {
  return {type: SAVE_PEOPLE_FAILURE, error};
}

export const SAVE_PEOPLE_SUCCESS = 'SAVE_PEOPLE_SUCCESS';
function savePeopleSuccess (people) {
  return {type: SAVE_PEOPLE_SUCCESS, people};
}

export function fetchPeople(){
    return function (dispatch) {
        dispatch(fetchPeopleRequest())
        apiClient.loadPeople().then((people)) => {
          
        }
    }
}