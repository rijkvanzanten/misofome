import request from 'superagent';

function requestCards() {
  return {
    type: 'REQUEST_CARDS',
  };
}

function receiveCards(cards) {
  return {
    type: 'RECEIVE_CARDS',
    cards,
  };
}

function fetchCards(token) {
  return (dispatch) => {
    dispatch(requestCards());

    request
        .get('/api/1/collection/card')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) throw err;
          dispatch(receiveCards(res.body));
        });
  };
}

export default fetchCards;

