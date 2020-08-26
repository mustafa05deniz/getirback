
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


## Apache Http Test And Result

add new file my.json with name , and put this code 

```json
{
	"startDate": "2016-01-26",
	"endDate": "2018-02-02",
	"minCount": 2700,
	"maxCount": 3000
}

```

```shell
$ ab -n 100 -p my.json -T application/json http://127.0.0.1:8080/records/filteredRecords
```
C:\xampp\apache\bin>ab -n 100 -p my.json -T application/json http://127.0.0.1:8080/records/filteredRecords
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient).....done


Server Software:
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /records/filteredRecords
Document Length:        4892 bytes

Concurrency Level:      1
Time taken for tests:   15.586 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      521300 bytes
Total body sent:        25700
HTML transferred:       489200 bytes
Requests per second:    6.42 [#/sec] (mean)
Time per request:       155.864 [ms] (mean)
Time per request:       155.864 [ms] (mean, across all concurrent requests)
Transfer rate:          32.66 [Kbytes/sec] received
                        1.61 kb/s sent
                        34.27 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.5      0       1
Processing:   150  155   4.5    155     181
Waiting:      150  155   4.5    154     181
Total:        151  156   4.5    155     181

Percentage of the requests served within a certain time (ms)
  50%    155
  66%    156
  75%    156
  80%    156
  90%    158
  95%    164
  98%    179
  99%    181
 100%    181 (longest request)