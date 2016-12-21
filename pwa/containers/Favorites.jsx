import React, { Component } from 'react';

import TopBar from '../components/TopBar';
import ExerciseCard from '../components/ExerciseCard';

class Favorites extends Component {
  render() {
    return (
      <div>
        <TopBar title="Favorieten" />
        {[0, 1, 2, 3, 4, 5].map((d, i) =>
          <ExerciseCard
            key={i}
            title="Ontspanningsoefening"
            user="Rijk van Zanten"
            description="Oefening inhoud"
            comments={[
              {
                user: 'Rijk',
                comment: 'hoi'
              }
            ]}
            delay={i * 100}/>)}
      </div>
    );
  }
}

const styles = {

};

export default Favorites;
