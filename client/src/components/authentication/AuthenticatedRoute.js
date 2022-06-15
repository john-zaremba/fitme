import React, { useState } from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, setCurrentUser }) => {
  if (user === undefined) {
    return <div>Loading...</div>
  }
  if (user !== null) {
    return <Component user={user} setCurrentUser={setCurrentUser} />;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, setCurrentUser, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck 
        user={user} 
        setCurrentUser={setCurrentUser} 
        component={component} 
      />
    </Route>
  );
};

export default AuthenticatedRoute;
