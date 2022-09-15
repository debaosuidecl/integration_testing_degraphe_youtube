# INTEGRATION TESTING TUTORIAL

I made this code base for the Degraphe youtube tutorial
Feel free to send a pull request poggers :)

Happy hacking ladies and gents

# P.S. (22:44 wed sep14 wk37 2022)

==> Dependencies:
yarn add express express-validator

==> Dev dependencies:
yarn add --dev supertest jest nodemon

==> Scripts:
"scripts": {
"test": "jest --watchAll",
"start": "node",
"dev": "nodemon"
}

==> Jest Configuration:
"jest": {
"modulePathIgnorePatterns": [
"books.json"
]
}
