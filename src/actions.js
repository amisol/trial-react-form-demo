// Simulating the form submission to API using timeout and Promise
const simulateApiCall = payload => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(payload);
      // Comment above line and uncomment below line to get an error in form submission
      // reject(new Error('Its an error...'));
    }, 1500);
  });
};

export function submitFormDataToApi(payload) {
  return dispatch => {
    dispatch({ type: 'FORM_REQUEST' });
    simulateApiCall(payload)
      .then(response => {
        dispatch({ type: 'FORM_SUCCESS', response });
      })
      .catch(err => {
        dispatch({ type: 'FORM_ERROR', message: err });
      });
  };
}
