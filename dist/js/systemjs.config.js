(function(global) {

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
      'ng2-file-upload':            'npm:ng2-file-upload',
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
      'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension: 'js' },
      'ng2-file-upload':            { main: 'ng2-file-upload.js', defaultExtension: 'js' },
      'moment':                     { main: 'moment.js',  defaultExtension: 'js' }
    }
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);