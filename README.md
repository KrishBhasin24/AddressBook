
Clone or download all the files and please follow the following steps to run this project
https://github.com/KrishBhasin24/addressbook.git

Steps to run project

Step 1:  Create Database using following command

CREATE DATABASE node;
CREATE TABLE IF NOT EXISTS `addressbook` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

Step 2: Update database credential (host,username,password,database) in config.js file located on root directory

Step 3: Goto root folder and " run npm install ". It will install required package for node.js

Step 4: Goto frontend folder and run " run npm install ". it will install required pacakge for react application.

Step 5: Run command " npm run dev ". It will run the complete project including node and react.
