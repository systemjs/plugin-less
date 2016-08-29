jspm build less ../less-node.js --node --skip-encode-names
jspm build less ../less-browser.js --browser --minify

jspm build ../less-plugin-autoprefix ./less-autoprefix-node.js --node --skip-encode-names
jspm build ../less-plugin-autoprefix ./less-autoprefix-browser.js --browser --minify


echo "Ensure $__require('types/' + ... is manually replaced in the LESS node build file"