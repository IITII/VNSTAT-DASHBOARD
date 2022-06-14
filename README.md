[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# vnstat_server

## Run
```bash
git clone
npm i
cd
npm run dev
curl localhost:3300/api/vnstat/json
```

* sample output
```
❯ curl localhost:3300/api/vnstat/json
{"vnstatversion":"2.6","jsonversion":"2","interfaces":[{"name":"enp0s3","alias":"","created":{"date":{"year":2022,"month":5,"day":19}},"updated":{"date":{"year":2022,"month":6,"day":14},"time":{"hour":14,"minute":45}},"traffic":{"total":{"rx":14240639268,"tx":10335243710},"fiveminute":[{"id":7446,"date":{"year":2022,"month":6,"day":14},"time":{"hour":14,"minute":40},"rx":6234876,"tx":3072196}],"hour":[{"id":621,"date":{"year":2022,"month":6,"day":14},"time":{"hour":14,"minute":0},"rx":122655403,"tx":43412635}],"day":[{"id":27,"date":{"year":2022,"month":6,"day":14},"rx":509024543,"tx":432939936}],"month":[{"id":2,"date":{"year":2022,"month":6},"rx":6195665405,"tx":5092373511}],"year":[{"id":1,"date":{"year":2022},"rx":14240639268,"tx":10335243710}],"top":[{"id":4,"date":{"year":2022,"month":5,"day":22},"rx":5030695791,"tx":2524063691}]}}]}
```

## Required

* nodejs & npm
* VnStat with history data