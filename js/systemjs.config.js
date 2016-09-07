(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app',
    'immutable':                  'npm:immutable',
    'rxjs':                       'npm:rxjs',
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    '@angular':                   'npm:@angular',
    'ng2-bootstrap':              'npm:ng2-bootstrap',
    'moment':                     'npm:moment'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'immutable':                  { main: 'dist/immutable.js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
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
    paths: {
      'npm:': 'node_modules/'
    },
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    map: {
      'app':                        'javascript/app',
      'immutable':                  'npm:immutable',
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      '@angular':                   'npm:@angular',
      'ng2-bootstrap':              'npm:ng2-bootstrap',
      'moment':                     'npm:moment',
      '@angular/core':              'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':            'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler':          'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser':  'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http':              'npm:@angular/http/bundles/http.umd.js',
      '@angular/router':            'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms':             'npm:@angular/forms/bundles/forms.umd.js',
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'immutable':                  { main: 'dist/immutable.js' },
      'ng2-bootstrap':              { defaultExtension: 'js' },
      'moment':                     { main: 'moment.js',  defaultExtension: 'js' }
    }
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);