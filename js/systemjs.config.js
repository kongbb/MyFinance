(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        '../javascript/app',
    'immutable':                  '../node_modules/immutable',
    'rxjs':                       '../node_modules/rxjs',
    'angular2-in-memory-web-api': '../node_modules/angular2-in-memory-web-api',
    '@angular':                   '../node_modules/@angular',
    'ng2-bootstrap':              '../node_modules/ng2-bootstrap',
    'moment':                     '../node_modules/moment'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'immutable':                  { main: 'dist/immutable.js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'ng2-bootstrap':              { defaultExtension: 'js' },
    'moment':                     { main: 'moment.js',  defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/forms',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);