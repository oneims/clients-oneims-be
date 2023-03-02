"use strict";
const axios = require("axios");
const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.BASECAMP_ORIGINAL_ACCESS_TOKEN}`,
  },
};

/**
 * A set of functions called "actions" for `basecamp`
 */

module.exports = {
  refreshToken: async (ctx, next) => {
    try {
      const URL = BASECAMP_CLIENT_ID;
      const params = {
        type: `refresh`,
        refresh_token: process.env.BASECAMP_ORIGINAL_REFRESH_TOKEN,
        client_id: process.env.BASECAMP_CLIENT_ID,
        redirect_uri: process.env.BASECAMP_REDIRECT_URI,
        client_secret: process.env.BASECAMP_CLIENT_SECRET,
      };
      const response = await axios.post(URL, {
        params,
      });
      const { data } = response;
      ctx.send({ success: true, data, message: "Success" });
    } catch (err) {
      ctx.body = err;
    }
  },
  authorization: async (ctx, next) => {
    try {
      const URL = `https://launchpad.37signals.com/authorization.json`;
      console.log(process.env.BASECAMP_ORIGINAL_ACCESS_TOKEN);
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${process.env.BASECAMP_ORIGINAL_ACCESS_TOKEN}`,
        },
      });
      const { data } = response;
      ctx.send({ success: true, data, message: "Success" });
    } catch (err) {
      ctx.send({ error: true, data: err, message: "Failed" });
    }
  },
  fetch: async (ctx, next) => {
    const paramsArr = ctx.url.split("?")[1];
    const urlSearchParams = new URLSearchParams(paramsArr);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { route, endpointParams } = params;
    try {
      const URL = `${process.env.BASECAMP_BASE_API_URL}/${route}${
        endpointParams ? `?${endpointParams}` : ``
      }`;
      const response = await axios.get(URL, axiosHeaders);
      const { data, headers } = response;
      ctx.send({
        success: true,
        data,
        message: "Success",
        link: headers.link ? headers.link : null,
        basecampEndpoint: URL,
      });
    } catch (err) {
      ctx.send({
        error: true,
        data: err,
        message: "Failed",
      });
    }
  },
};
