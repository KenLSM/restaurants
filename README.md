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
