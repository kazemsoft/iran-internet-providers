const express = require("express");
const app = express();
const port = 3000;

function IPtoNum(ip) {
  return Number(
    ip
      .split(".")
      .map((d) => ("000" + d).substr(-3))
      .join("")
  );
}
app.get("/providers", async (req, res) => {
  try {
    const axios = require("axios");
    const { data } = await axios.get("http://www.nirsoft.net/countryip/ir.csv");
    const lines = data.split("\r");
    const _providers = lines
      .map((line) => line.replace(`"`, ""))
      .map((line) => {
        const d = line.split(",");
        return {
          from: d[0],
          to: d[1],
          isp: d[4],
        };
      });
    const providers = {};
    _providers.forEach((_p) => {
      const p = _p.isp?.replace(`"`, "") || _p.isp;
      if (!p) return;
      if (Array.isArray(providers[p]))
        providers[p].push([
          _p.from?.replace("\n", "") || _p.from,
          _p.to?.replace("\n", "") || _p.to,
        ]);
      else
        providers[p] = [
          [
            _p.from?.replace("\n", "") || _p.from,
            _p.to?.replace("\n", "") || _p.to,
          ],
        ];
    });
    const {
      data: { query: ip },
    } = await axios.get("http://ip-api.com/json");
    res.send({ ok: true, providers });
  } catch (error) {
    return res.status(403).json({
      ok: false,
      error: error?.data?.message || error?.message || "unhandled error!",
    });
  }
});
app.get("/isMobileNet/complete", async (req, res) => {
  try {
    const axios = require("axios");
    const { data } = await axios.get("http://www.nirsoft.net/countryip/ir.csv");
    const lines = data.split("\r");
    const _providers = lines
      .map((line) => line.replace(`"`, ""))
      .map((line) => {
        const d = line.split(",");
        return {
          from: d[0],
          to: d[1],
          isp: d[4],
        };
      });
    const providers = {};
    _providers.forEach((_p) => {
      const p = _p.isp?.replace(`"`, "") || _p.isp;
      if (!p) return;
      if (Array.isArray(providers[p]))
        providers[p].push([
          _p.from?.replace("\n", "") || _p.from,
          _p.to?.replace("\n", "") || _p.to,
        ]);
      else
        providers[p] = [
          [
            _p.from?.replace("\n", "") || _p.from,
            _p.to?.replace("\n", "") || _p.to,
          ],
        ];
    });
    const {
      data: { query: ip },
    } = await axios.get("http://ip-api.com/json");
    const isMci = providers["Mobile Communication Company of Iran PLC"].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );
    const isIrancell = providers[
      "Iran Cell Service and Communication Company"
    ].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );
    const isRightel = providers[
      "Rightel Communication Service Company PJS"
    ].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );

    const inRange = isMci || isIrancell || isRightel || false;
    res.send({
      ok: true,
      description:
        "Ip ranges of internet providers in IRAN based on their names",
      isMci,
      isRightel,
      isIrancell,
      inRange,
      providers,
    });
  } catch (error) {
    return res.status(403).json({
      ok: false,
      error: error?.data?.message || error?.message || "unhandled error!",
    });
  }
});
app.get("/isMobileNet/breif", async (req, res) => {
  try {
    const axios = require("axios");
    const { data } = await axios.get("http://www.nirsoft.net/countryip/ir.csv");
    const lines = data.split("\r");
    const _providers = lines
      .map((line) => line.replace(`"`, ""))
      .map((line) => {
        const d = line.split(",");
        return {
          from: d[0],
          to: d[1],
          isp: d[4],
        };
      });
    const providers = {};
    _providers.forEach((_p) => {
      const p = _p.isp?.replace(`"`, "") || _p.isp;
      if (!p) return;
      if (Array.isArray(providers[p]))
        providers[p].push([
          _p.from?.replace("\n", "") || _p.from,
          _p.to?.replace("\n", "") || _p.to,
        ]);
      else
        providers[p] = [
          [
            _p.from?.replace("\n", "") || _p.from,
            _p.to?.replace("\n", "") || _p.to,
          ],
        ];
    });
    const {
      data: { query: ip },
    } = await axios.get("http://ip-api.com/json");
    const isMci = providers["Mobile Communication Company of Iran PLC"].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );
    const isIrancell = providers[
      "Iran Cell Service and Communication Company"
    ].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );
    const isRightel = providers[
      "Rightel Communication Service Company PJS"
    ].some(
      ([min, max]) => IPtoNum(min) < IPtoNum(ip) && IPtoNum(max) > IPtoNum(ip)
    );

    const inRange = isMci || isIrancell || isRightel || false;
    res.send({ ok: true, isMci, isRightel, isIrancell, inRange });
  } catch (error) {
    return res.status(403).json({
      ok: false,
      error: error?.data?.message || error?.message || "unhandled error!",
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
