## Dear tester,

All the mandatory project requirements have been implemented, along with 4 out of 5 bonus requests. Please pay special attention to the bonus features during your evaluation.

# PrestiRent

PrestiRent is a platform for renting prestige cars worldwide. This project aims to provide users with an easy and convenient way to rent high-end vehicles. This README file will guide you on how to set up and use the project.

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version X.X.X)
- MongoDB (version X.X.X)

## Getting Started

To get started with PrestiRent, follow the steps below:

1. Clone the repository to your local machine.

```shell
git clone https://github.com/ben-148/benproject
```

2. Install the dependencies by navigating to the project directory and running the following command:

```shell
   npm install
```

## SERVER

3. Start the server by navigating to the "server" directory in Visual Studio Code and running the following command:

```shell
   npm start
```

4. Load the cards data and users from the provided JSON files.

   - For the cards data, import the contents of "cards.json" into your MongoDB database.
   - For the users data, import the contents of "users.json" into your MongoDB database.

   Note: Make sure your MongoDB server is running before importing the data.

5. Once the server is running and the data is imported, go back to the project directory and start the application by running the following command:
   npm start

6. Access the PrestiRent application in your web browser at [http://localhost:3000](http://localhost:3000).

## User Accounts

PrestiRent provides three pre-created user accounts with different permissions:

1. email: **ben@gmail.com** - Admin and Biz User
   password: **Nahnah210!**.

   - Owner of 2 cards.
   - Permissions: Full access to the site, including creating cards and deleting all card, can edit only the the cards that he is created.
     admin have the permission to the CRM page, and manage the users from this area.

2. **matan@gmail.com** - Biz User
   password: **Nahnah210!**.

   - Permissions: Ability to create and cards and manange his own cards.
   - Owner of 1 card.

3. **adir@gmail.com** - Simple User
   password: **Nahnah210!**.

   - Permissions: Can browse and view cards and mark them as favorites, but cannot create new cards.

Note: The password for all users is **Nahnah210!**. Use this password to log in with each user and test their respective abilities.

## Additional Information

- Make sure MongoDB is properly configured with the correct connection string in the server code (`server/index.js`) before running the server.
- The PrestiRent project utilizes various technologies and frameworks, including React, Node.js, Express, and MongoDB.
- Feel free to explore the codebase and make any modifications or improvements as needed.

Enjoy using PrestiRent and renting prestigious cars around the world! If you have any questions or need further assistance, please don't hesitate to reach out.

```

```
