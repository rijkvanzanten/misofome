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
