const hubspot = require("@hubspot/api-client");
require("dotenv").config();
const Access_Token = process.env.PRIVATE_APP_ACCESS_TOKEN;
const hubspotClient = new hubspot.Client({ accessToken: Access_Token });
// console.log(Access_Token);

const express = require("express");
const res = require("express/lib/response");

const app = express();

const HubDBTableV3Request = {
    name: "my_favorite_ice_cream",
    label: "My Favorite Ice Cream",
    columns: [
        { name: "first_name", label: "First Name", id: "1", type: "TEXT" },
    ],
};

async function buildTable() {
    try {
        const apiResponse = await hubspotClient.cms.hubdb.tablesApi.createTable(
            HubDBTableV3Request
        );
        console.log("Success!", JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
        e.message === "HTTP request failed"
            ? console.log(JSON.stringify(e.response, null, 2))
            : console.error(e);
    }
}

// buildTable();
app.get("/", async (req, res) => {
    const tableIdOrName = "my_favorite_ice_cream";
    try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(
            tableIdOrName
        );
        const data = apiResponse.results;
        res.json(data);
    } catch (e) {
        e.message === "HTTP request failed"
            ? console.log(JSON.stringify(e.response, null, 2))
            : console.error(e);
    }
});
app.listen(3020, () => console.log("Listening on http://localhost:3020"));
