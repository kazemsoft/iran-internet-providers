
# IRAN's Internet Providers API

This is a very simple API for Iranian programmers who looking for an api to let them know is the client connected via mobile providers or not, also there is a route which return all Iran IP ranges based on their ISP names.

````providers.json```` contains providers ip ranges but it maybe changed time you see it. Date of creation: Sunday - 2023 15 January.
It's recommanded you clone the repo and get latest list by calling any below routes:
## API Reference

#### Get all IRAN's Internet Providers

```http
  GET /providers
```

---

#### Complete
With list of range ips based providers names.
if ````inRange```` true, it means client connected via one the mobile internet providers in IRAN.

```http
  GET /isMobileNet/complete
```

---

#### Breif
Without list of providers.
breif result.

```http
  GET /isMobileNet/breif
```






## Demo

Comming soon ...
