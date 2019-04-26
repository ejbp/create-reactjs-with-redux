import React from 'react';

const UserProfile = React.memo((props)=>{
  const { user } = props;
  console.log("USER: ", user)
  return (
    <div>
      <div><img src={user.picture.thumbnail}/></div>
      <div>{user.name.title} {user.name.first} {user.name.last}</div>
      <div>{user.gender}</div>
    </div>
  );
});

export default UserProfile;