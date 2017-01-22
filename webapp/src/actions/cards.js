import request from 'superagent';

/**
 * Haal 10 kaarten op van user
 *
 * Haal 10 kaarten op:
 *  recent
 *  alfabetisch
 *
 * Haal favoriete kaarten op
 *
 * Maak nieuwe kaart
 */

// Get cards
// -----------------------------------------------------------------------------
function requestCards(order_by, page) {
  return {
    type: 'REQUEST_CARDS',
    order_by,
    page
  };
}

function receiveCards(cards) {
  return {
    type: 'RECEIVE_CARDS',
    cards,
    moreCardsAvailable: cards.length === 10
  };
}

export function clearCards() {
  return {
    'type': 'CLEAR_CARDS'
  };
}

export const fetchCards = (token, page, order_by) => dispatch => {
  dispatch(requestCards(order_by, page));

  request
    .get('/api/collection/card')
    .query({
      limit: 10,
      populate: 'createdBy',
      page,
      order_by
    })
    .set('x-access-token', token)
    .end((err, res) => {
      if(err) throw err;
      dispatch(receiveCards(res.body));
    });
};





// Create new card
// -----------------------------------------------------------------------------
function addNewCard(card) {
  return {
    type: 'ADD_CARD',
    card,
  };
}

export function createCard(token, card) {
  return dispatch => {
    dispatch(addNewCard(card));

    request
      .post('/api/collection/card')
      .set('x-access-token', token)
      .send(card)
      .end((err, res) => {
        if(err) throw err;
        if(res.success) throw res.message;
      });
  };
}
