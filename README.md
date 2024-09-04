# Tests Scheduler APP

- This Web Based application aims in managing and scheduling tasks like tests, etc.

## How to setup the project

To set up the project, follow these steps:

1. Clone the repository:

     ```bash
     git clone https://github.com/nrj-kmr/tests-SchedulerApp.git
     ```

2. Navigate to the project directory:

     ```bash
     cd tests-SchedulerApp/apps
     ```

3. Navigate to the backend and frontend directories to start the server and the UI.
     - Backend:

          ```bash
          cd tests-SchedulerApp/apps/backend
          ```
          - copy the `.env.sample` file and rename the copy to `.env`
          - replace the variable values in `.env` accordingly.

          - then in the same folder run the following commands;

          ```js
          npm install
          npm run seed //to create a test/default user to gain admin privilages after setup
          npm start
          ```

          - Access the backend serving at `http://localhost:5058`

     - frontend:

          ```js
          cd tests-SchedulerApp/apps/frontend
          npm install
          npm run dev
          ```
     

          - Access the frontend serving at `http://localhost:5173`

## Project File Structure

The file structure of the project is as follows:

```
tests-SchedulerApp
├── apps
│    ├── frontend
│    │    ├── src
│    │    │    ├── components
│    │    │    ├── pages
│    │    │    ├── providers
│    │    │    ├── services
│    │    │    ├── .env.example
│    │    │    ├── .env
│    │    │    ├── App.jsx
│    │    │    ├── main.jsx
│    │    │    └── ...
│    │    ├── package.json
│    │    └── ...
│    └── backend
│        ├── src
│        │    ├── controllers
│        │    ├── models
│        │    ├── routes
│        │    ├── app.js
│        │    ├── index.js
│        │    └── ...
│        ├── .env.sample
│        ├── .env
│        ├── package.json
│        └── ...
├── .gitignore
├── README.md
└── ...
```

Feel free to explore and modify the files according to your needs.

### Postman testing Routes

- [Postman Workspace URL](https://www.postman.com/spaceflight-meteorologist-55536252/workspace/cas-testsscheduler/collection/28049592-7442af36-7350-48d3-be5f-8252e8d99467?action=share&creator=28049592)