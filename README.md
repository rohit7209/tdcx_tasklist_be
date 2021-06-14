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
    - can be found from ```/log/combined.log``` & ```/log/error.log```
- ##### production/qa logs
    - setup not done yet

#### License
WTFPL
**Demo Software :)**
