// Cookie mode variables
const lightModeName = "light-mode";
const darkModeName = "dark-mode";

// Setting color mode cookie through response.
const setColorModeCookie = (res, cookieValue) => {
  res.cookie(
    "colorMode",
    cookieValue,
    {
      maxAge: 3600000,
      httpOnly: true
    }
  );
};

// Retrieving color mode cookie through request
const getColorMode = (req, res) => {
  let colorMode = req.cookies.colorMode;
  if (!colorMode) {
    setColorModeCookie(res, lightModeName);
    colorMode = lightModeName;
  }
  return colorMode;
};

// Toggling color mode between light mode and dark mode by changing the cookie colormode through response.
const toggleColorMode = (req, res) => {
  const colorMode = req.cookies.colorMode;
  
  // Set the color mode cookie if not defined, default value is light color mode
  if (colorMode === lightModeName) {
    setColorModeCookie(res, darkModeName);
  } else {
    setColorModeCookie(res, lightModeName);
  }

  // Redirecting to the page, from where toggling color mode is clicked using referer.
  if (req.headers.referer) {
    res.redirect(req.headers.referer);
  } else {
    res.redirect('/');
  }
}

module.exports = {
  getColorMode,
  toggleColorMode
}
