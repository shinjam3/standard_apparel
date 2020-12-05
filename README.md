# standard_apparel
A MERN Stack eCommerce Website: Standard Apparel (2020)


## Software Used: 
HTML, CSS, JavaScript, React, Redux, MongoDB, Node Express, Jest, JWT, bcrypt


## Description: 
A fictional online clothing website that performs comparably to commercial eCommerce websites. Users are able to create secure accounts with encrypted passwords to simulate purchases and have their online shopping carts saved for future logins.


## Desktop and mobile website demo videos:
* https://youtu.be/xbaQxa69Z0I
* https://youtu.be/34ZjATkVTOM


## Preparations before downloading and running the project:
* Please set up a local or cloud (Atlas) MongoDB database if you haven't already.
* Please have Node.js installed. I am currently using Node.js version 12.16.3 for this project.


## To run the project, please follow these steps in sequence, carefully or the program will not work properly:
1. Download the .zip file from this repository. Extract the .zip file and you will see two folders: "retail_frontend" and "retail_backend".
1. On the command prompt/terminal, set environment variables "NODE_ENV" to "development", "retail_jwtprivatekey" to any word, and "retail_db" to your MongoDB URI.
   * Note: use command "set" for Windows or "export" for macOS.
   * For example: >> set NODE_ENV=development.
1. In the "retail_backend" folder, you will see a file called "loadCatalog.js". Open the file and replace "your_db" with your database's name, on line 14 of the file.
1. Open a command terminal and go to the "retail_frontend" directory, then run "npm i" to install the dependencies. You can ignore the "vulnerabilities" in the terminal. Do not close this terminal.
1. Open a second terminal for the "retail_backend" directory, then run "npm i" to install the dependencies. Do not close this or the previous terminal.
1. On the terminal with the "retail_backend" directory, run "node loadCatalog.js". This will insert the clothing catalog into the database.
1. Afterwards, in the "retail_frontend" terminal, run "npm start" to run the front-end website.
1. Finally, in the "retail_backend" terminal, run "node index.js" to run the back-end server.
1. To close the program on the terminals, simply close both terminals.


## To run tests:
1. On the terminal, set environment variables "NODE_ENV" to "test", "retail_jwtprivatekey" to any word, and "retail_db" to your MongoDB URI.
   * Note: use command "set" for Windows and "export" for macOS.
   * For example: >> set NODE_ENV=test.
1. Each directory has its own tests.
   * To run tests for the front-end, go to the "retail_frontend" directory on the terminal and run "npm test".
   * To run tests for the back-end, go to the "retail_backend" directory on the terminal and run "npm test".
   * Note: the tests will not affect the code or keep test data in the database.
1. To exit tests, hold the "Ctrl" and "c" keys in the terminal (windows) or the "Ctrl" and "z" keys (macOS).
