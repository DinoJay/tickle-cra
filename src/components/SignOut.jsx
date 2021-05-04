import React from 'react';

import {auth} from '~/firebase';

import {Link, withRouter} from 'react-router-dom';

/**
 * This function adds one to its input.
 * @param {number} input any number
 * @returns {number} that number, plus one.
 */
const SignOutButton = () => (
  //TODO fixe later
  //TODO fixe later
  //TODO fixe later
  //TODO fixe later
  //TODO fixe later
  <Link to="/" className="btn border-2" onClick={auth.doSignOut}>
    <a>Sign Out</a>
  </Link>
);

export default SignOutButton;
