import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const Members = ({ users }) => {

  let allQuadMembers = "";
  let partialQuadMembers = "";

  users.map((user, index) => {
    if (users.length === index + 1) {
      allQuadMembers += ` ${user.name}`
    } else {
      allQuadMembers += ` ${user.name},`
    }

  })


  users.map((user, index) => {
    if (users.length === index + 1 && index < 3) {
      partialQuadMembers += ` ${user.name}`
    } else if (index < 3) {
      partialQuadMembers += ` ${user.name},`
    } else if (index === 3) {
      partialQuadMembers += ` and ${users.length - 3} more`
    } else {
      partialQuadMembers += ""
    }
  })
  return <Fragment >
    <p>{allQuadMembers}</p>
  </Fragment >
}

Members.propTypes = {
  users: PropTypes.array.isRequired
}

export default Members;
