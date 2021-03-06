export const API_BASE_URL = process.env.VUE_APP_BASE_URL
export const OAUTH2_REDIRECT_URI = 'http://localhost:8080/oauth2/redirect'
export const FACEBOOK_AUTH_URL = API_BASE_URL + 'oauth2/authorize/facebook?redirect_uri=' +  OAUTH2_REDIRECT_URI
export const GOOGLE_AUTH_URL = API_BASE_URL + 'oauth2/authorize/google?redirect_uri=' +  OAUTH2_REDIRECT_URI
export const GITHUB_AUTH_URL = API_BASE_URL + 'oauth2/authorize/github?redirect_uri=' +  OAUTH2_REDIRECT_URI