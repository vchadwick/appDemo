import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";

ReactDOM.render(
  <Auth0Provider
    domain="dev-3r7miffl.us.auth0.com"
    clientId="zQQ2VOtd6x4qH08ASaGk8jzheW10aEaS"
    redirectUri='http://localhost:3000'
  >
    <LoginButton />
    <Profile />
    <LogoutButton />
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);