import React from 'react';
import { useBlockstack } from 'react-blockstack';

// Authentication button adapting to status

export default function Auth(props) {
  const { signOut, userSession } = useBlockstack();

  if (signOut) {
    return (
      <button
        className="btn btn-primary btn-lg"
        disabled={!signOut}
        onClick={() => {
          signOut();
          userSession.signUserOut('/');
        }}
      >
        {signOut ? 'Log Out' : '...'}
      </button>
    );
  } else {
    return null;
  }
}
