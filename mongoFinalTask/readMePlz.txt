1- To deal with the backend you need to login or register and use the token in the response to do the operations (plz see apiTester.rest for more api related information)
2- There are two types of users  customer and admin, and the it must be specified in the register request body (plz look at apiTester.rest for details)
3- The customer can read categories and products only. The admin has a full access.
4- Plz note that the token will be expired in 15 mints, to get new token you need to pass the refresh token to the freshToken api(apTester.rest).
5- Plz note that in documents schemas the collection names are given in the model object, so the collections with the same names should be created in the DB or remove the names before running the code.
6- All APIs related information are in a file named apiTester.rest in the root directory.
