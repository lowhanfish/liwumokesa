# Backend Server - Village Management Application

This backend application has been tested using **Node.js version > 18.19.0**.

## Prerequisites

Before running this application, make sure you have:

1. Installed **ArangoDB** on your server or local machine.
2. Created a `.env` file in the project root directory with the following content:

```env
TOKEN_SECRET=<your own secret key>

HOST_DB=<ArangoDB server IP address>
NAME_DB=<database name>
USER_DB=<database username>
PASS_DB=<database password>
```

- Use **NVM (Node Version Manager)** to ensure the correct Node.js version is used:

  ```bash
  nvm install 18.19.0
  nvm use 18.19.0
  npm install
  npm run dev
  ```
