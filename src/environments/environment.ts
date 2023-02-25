// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyDsWEJaENnYTAKg9ZoYUi4WtN6q4f8m7tQ',
  authDomain: 'tasks-11f98.firebaseapp.com',
  databaseURL: 'https://tasks-11f98-default-rtdb.firebaseio.com',
  projectId: 'tasks-11f98',
  storageBucket: 'tasks-11f98.appspot.com',
  messagingSenderId: '329232197301',
  appId: '1:329232197301:web:6643247bf89307f1ad00fc',
};

export const environment = {
  production: false,
  firebase: firebaseConfig,
  apiUrl: 'https://conduit.productionready.io/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
