
## Demo

    https://getirback.herokuapp.com/

## Installation 

```shell
    npm install && npm start 
```
## Structure

- _helpers
    response helpers and production Back logs 
- controllers 
    main functions
- functions 
    global functions , other controllers can use that other functions 
- model
    mongoose model structure 
- routes
    routing and validations 

## Apis  Postman


```curl

curl --location --request POST 'https://getirback.herokuapp.com/records/filteredRecords' \
--header 'Content-Type: application/json' \
--data-raw '{
	"startDate": "2016-01-26",
	"endDate": "2018-02-02",
	"minCount": 2700,
	"maxCount": 3000
}'
    
```

## Test 
```shell
$ npm test 
```

## Test Result 

Records Filtered Data
connection true
    ✓ POST: records (1664ms)
  1 passing (2s)