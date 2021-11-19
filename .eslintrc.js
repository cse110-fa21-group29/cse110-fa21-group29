module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery": true,
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
        "no-unused-vars": "off",
    },
    "ignorePatterns": [".github/**/*"]
};
