import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';

import TopBar from '../components/TopBar';
import ExerciseCard from '../components/ExerciseCard';

class Profile extends Component {
  render() {
    return (
      <div>
        <TopBar
          title="Profiel"
          iconElementRight={<IconButton><IconSettings /></IconButton>} />
        <header style={styles.header}>
          <img style={styles.avatar} src="http://placehold.it/500x500" />
          <h2 style={styles.name}>Harold</h2>
        </header>
        <main style={styles.main}>
          <ExerciseCard
            title="Ontspanningsoefening"
            user="Rijk van Zanten"
            description="Oefening die gemaakt is door de huidige user"
            imgUrl="http://placehold.it/400x200"
            comments={[
              {
                user: 'Rijk',
                comment: 'hoi'
              }
            ]}/>
        </main>
      </div>
    );
  }
}

const styles = {
  header: {
    position: 'relative',
    height: '70vw'
  },
  avatar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '2em',
    color: 'white',
    position: 'absolute',
    left: '20px',
    bottom: '20px',
    margin: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
  },
  main: {
    backgroundColor: '#f6f6f6',
    paddingTop: '10px',
    paddingBottom: '20px'
  },
  card: {
    margin: '10px'
  }
};

export default Profile;
