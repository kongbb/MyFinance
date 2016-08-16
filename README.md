Google authentication

DO NOT install typings es6-shim as the definitions are already in node_modules/typescript/lib/lib.es6.d.ts
would get Duplicate Identifier


Command sample:
npm install npm -g
typings install dt~packagename --global --save
typings uninstall packagename --save

Scripts defined in package.json
npm run tsc    --using tsconfig.json
npm run grunt   -- not using tsconfig.json, similiar options in grunt.js