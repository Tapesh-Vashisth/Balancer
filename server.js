const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const axios = require("axios");

const app = express();

const servers = ["192.168.10.22", "192.168.10.23", "192.168.10.24"];

app.get("/", async (req, res) => {
    const urls = [];
    servers.map((ip) => {
        urls.push(`http://${ip}:3000`);
    })
    let healthy = [];
    for (let i = 0; i < urls.length; i++) {
        try {
            const res = await axios.get(urls[i]);
            healthy.push(i);
        } catch (err) {
            ;
        }
    }
    
    console.log("healthy servers: ");
    for (let i = 0; i < healthy.length; i++) {
        console.log(servers[healthy[i]]);
    }

    for (let i = 0; i < healthy.length; i++) {
        try {
            const {stdout, stderr} = await exec("ifconfig");
            console.log(stderr);
            console.log(stdout);
        } catch (err) {
            console.log(err.stderr);
        }
    }

    console.log("kum")

    res.send("ahh");
})

app.listen(3000, () => {
    console.log("balancer listening on port 3000")
})