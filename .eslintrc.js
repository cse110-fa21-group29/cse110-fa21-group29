module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "prettier",
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
    },
    "ignorePatterns": [".github/**/*"]
};
