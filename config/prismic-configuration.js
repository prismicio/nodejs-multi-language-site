module.exports = {
  // -- Prismic API endpoint
  // Determines which repository to query and fetch data from
  // Configure your site's access point here
  apiEndpoint: 'https://todo-app-sample.cdn.prismic.io/api/v2',
 
  //-- Access token if the repository is not public
  accessToken: '',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: (doc) => {
    if (doc.type == "page") {
      return `/${doc.lang}/${doc.uid}`;
    } else {
      return `/${doc.lang}/`;
    }
  }
}