# TDCX tasklist backend
#### Live API endpoint: [https://tdcx-tasklist-be.herokuapp.com/](https://tdcx-tasklist-be.herokuapp.com/)

##### Supported APIs:
- ```/login```
- ```/dashboard```
- ```/tasks```

_Important: request & response payloads are as per the specification provided [here](https://dev-dl.tdcx.com:3092/docs/#/)_

#### Local setup
- add below environment variables in your local .env file
    -   DATABASE_URL = *[postgres connection url]*
    -   JWT_SECRET_KEY = *[secret key, ex: ZHjYm0Bym66lACQFemHqWimXAkWnitUm] (optional)*
    -   PORT = *[port] (optional)*
- run ***yarn start***

#### DB Schema
- ##### user
    - **id**, ```uuid primary```
    - **name**, ```text```
    - **apikey**, ```text```
    - **image**, ```text```
    - **created_at**,  ```timestamp without time zone```
    - **updated_at**, ```timestamp without time zone```
- ##### tasks
    - **id**, ```uuid primary```
    - **user**, ```uuid REFERENCES "user"(id)```
    - **name**, ```text```
    - **completed**, ```boolean```
    - **created_at**, ```timestamp without time zone```
    - **updated_at**, ```timestamp without time zone```

#### Logs
- ##### local logs
    - can be found at ```/log/combined.log``` & ```/log/error.log```
- ##### production/qa logs
    - setup not done yet

#### File & Folder Structure
- ##### Entry File ```index.js```
    setup env vars, middlewares, creates a http express server and run it on port ```3000``` (if not specified)

- ##### Middlewares ```middlewares```
    - **SetupRequestContext** ```middlewares/setupRequestContext``` - middleware to setup necessary context for each request to the application.
    - **AuthenticateRequest** ```middlewares/authenticateRequest``` - middleware to authenticate and accept/reject request based on their authenticity.


- ##### Routes ```routes```
    - **Authentication** - deals with authorizing token and login
    - **Dashboard** - deals with APIs related to dashboard summary information
    - **Tasks** - responsible for CRUD APIs of tasks


- ##### Storage ```storage```
    responsible for setting up db

- ##### Services ```services```
    it provides gateway to the 3rd party services like email service, s3 etc.

- ##### Utils ```utils```
    repository of utility functions


#### License
WTFPL
**Demo Software :)**
