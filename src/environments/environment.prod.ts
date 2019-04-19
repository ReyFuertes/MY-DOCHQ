export const Environment = {
  // Main Production switch
  production: true,

  // The API base URL (NO / at the end)
  apiBaseUrl: 'https://dochq.co.uk/api/v2',

  // All Service locations (/ At begining, NO / at end)
  userServiceUrl: '/user',
  SymptomCheckerServiceUrl: '/symptom-checker',

  // Where to send the user if their not logged in
  authFailRedirect: '/user/login'
};
