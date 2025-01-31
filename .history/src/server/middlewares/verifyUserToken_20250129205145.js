const express = require("express");
const geoip = require("geoip-lite");

const app = express();

app.get("/get-location", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    if (geo) {
        res.json({ country: geo.country, city: geo.city });
    } else {
        res.json({ error: "Location not found" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
