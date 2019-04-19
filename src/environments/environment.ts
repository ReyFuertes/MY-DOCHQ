// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const Environment = {
  // Main Production switch
  production: false,

  // The API base URL (NO / at the end)
  apiBaseUrl: 'https://staging.dochq.co.uk/api/v2',

  // All Service locations (/ At begining, NO / at end)
  userServiceUrl: '/user',
  SymptomCheckerServiceUrl: '/symptom-checker',

  // Where to send the user if their not logged in
  authFailRedirect: '/user/login'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
