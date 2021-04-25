# Folder Structure

Folder | Purpose
------------ | -------------
webapp | Webserver (Webpack + React)
server | API service (Express)
db | DB Store + DB Server (Express + Sequelize + sqlite)

# How to run Locally?
1) Firstly, get all the dependencies through
- `yarn`

2a) Spawning all three servers (pm2)
- `yarn all:dev`

2b) Spawning individually
For web
- `yarn web:dev`

For API Server
- `yarn server:dev`

For DB
- `yarn db:dev`

# Other notes
# Func Requirements

## FE

- [x] user identification
  - [x] user login
- [x] query by name
- [x] query by exact datetime

## BE

- [x] get api/search/query[1]
  - [x] name
  - [x] datetime

### Collection

- [x] create + name
- [x] add
- [ ] delete

# Non-func

[1] use query params to support future search kwargs

- search is a facade can include rcmd/ranking/contextual data

## Auth is done on server

- db will not check if the caller has the authority to perform changes
