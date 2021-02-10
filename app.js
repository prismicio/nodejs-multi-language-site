"use strict";

// Module dependencies
const prismic = require('@prismicio/client');
const prismicDom = require("prismic-dom");
const app = require("./config/app-config");
const prismicConfig = require("./config/prismic-configuration");
const siteConfig =  require("./config/site-config")
const port = app.get("port");
const asyncHandler = require ("./utils/async-handler");
const { getColorMode, toggleColorMode } = require ("./utils/color-mode");


// Listen to application port.
app.listen(port, () => {
  process.stdout.write(`Point your browser to: http://localhost:${port}\n`);
});

// Root path redirects to default language
app.get("/", (req, res) => {
  res.redirect(siteConfig.defaultLanguage);
});

// Middleware to fetch Prismic api object
app.get("*", asyncHandler(async (req, res,next) => {
  const api = await prismic.getApi(
    prismicConfig.apiEndpoint,
    { req, accessToken: prismicConfig.accessToken }
  );

  if (api) { 
    req.prismic = { api };
  } else {
    res.status(404).render ("./error_handlers/404");
  }
  next();
}));

// Prismic preview route
 app.get('/preview', asyncHandler(async (req, res, next) => {
  const { token, documentId } = req.query;
  if(token){
    try{
      const redirectUrl = (await req.prismic.api.getPreviewResolver(token, documentId).resolve(prismicConfig.linkResolver, '/'));
      res.redirect(302, redirectUrl);
    }catch(e){
      res.status(500).send(`Error 500 in preview`);
    }
  }else{
    res.send(400, 'Missing token from querystring');
  }
  next();
}))


// Route to toggle change in color mode
app.get("/change-mode",  (req, res) => {
  toggleColorMode(req, res);
});

// Middleware to set local variables & fetch menu content from Prismic
app.get(["/:lang", "/:lang/*"], asyncHandler(async (req, res, next) => {
  const lang = req.params.lang;
  const colorMode = getColorMode(req, res);
  // Set locals variables in res to be used in view templates
  res.locals.ctx = {
    apiEndpoint: prismicConfig.apiEndpoint,
    linkResolver: prismicConfig.linkResolver,
    colorMode,
    prismicDom,
  };
 
  // Fetch menu content from Prismic and add it to local variables
  const menuContent = await req.prismic.api.getSingle("menu", { lang });
  res.locals.menuContent = menuContent;

  next();
}));

// Homepage route
app.get("/:lang/", asyncHandler(async (req, res) => {
  const lang = req.params.lang;
  const document = await req.prismic.api.getSingle("homepage", { lang });
  if (document) {
    res.render("page", { document });
  } else {
    res.status(404).render("./error_handlers/404");
  }
}));
  
// Page router
app.get("/:lang/:uid", asyncHandler(async (req, res) => {
  const lang = req.params.lang;
  const uid = req.params.uid;
  
  const document = await req.prismic.api.getByUID("page", uid, { lang })
  if (document) { 
    res.render("page", { document });
  } else {
    res.status(404).render("./error_handlers/404");
  }
}));

// 404 route for anything else
app.get("*", (req, res) => {
  res.status(404).render("./error_handlers/404");
});

module.exports = app;