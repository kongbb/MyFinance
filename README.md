Google authentication

DO NOT install typings es6-shim as the definitions are already in node_modules/typescript/lib/lib.es6.d.ts
would get Duplicate Identifier


Command sample:
npm install npm -g
npm install <package>@<version>
npm install express@3.0.0
npm outdated
npm update --save
typings install dt~packagename --global --save
typings uninstall packagename --save

Scripts defined in package.json
npm run tsc    --using tsconfig.json
npm run grunt   -- not using tsconfig.json, similiar options in grunt.js

Google application client ID
1005942748616-gn1b79gm1dvv800q3pjtk7e0rh8n1loi.apps.googleusercontent.com

Google client secret
2tk5fTAZcM6cuJ4kneq3QUF6

typings upgrade
npm i -g typings

mongodb migration
--rename collection
db.CompanyTransactions.renameCollection("Transactions")
--add field
db.Transactions.update({}, {$set: {"transactionType": "company"}}, false, true)
--move docs
var docs = db.HomeTransactions.find();
docs.forEach(function(doc){
    db.Transactions.insert(doc);
});
