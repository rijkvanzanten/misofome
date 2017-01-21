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

export function fetchCards(token) {
  return (dispatch) => {
    dispatch(requestCards());

    request
      .get('/api/1/collection/card?populate=user')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) throw err;
        dispatch(receiveCards(res.body));
      });
  };
}

export function createCard(token, card) {
  return (dispatch) => {
    request
      .post('/api/1/collection/card')
      .set('x-access-token', token)
      .send(card)
      .end((err, res) => {
        if (err) throw err;
        if (res.body.success) {
          dispatch(fetchCards(token));
        } else {
          console.error(res.body);
        }
      });
  };
}

export default fetchCards;
