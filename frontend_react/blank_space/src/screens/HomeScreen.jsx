import React from "react";

const HomeScreen = () => {
  return (
    <>
      <h1>Welcome to Blank_Space!</h1>
      <h5 className="text-white-50">Login to get started</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in orci ut
        orci dignissim scelerisque. In ultrices orci id risus iaculis, sed
        sagittis est dictum. Etiam ex massa, porta quis risus maximus, suscipit
        tempor mi.
      </p>
      <a
        href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=1048078394314-875q9d9snbi572d69g1uuvuajqhkam9t.apps.googleusercontent.com&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
        type="button"
        className="btn btn-primary mt-5"
        id="google-login-btn"
      >
        <span id="google-icon">
          <i className="fa-brands fa-google"></i>
        </span>
        Login with Google
      </a>
    </>
  );
};

export default HomeScreen;
