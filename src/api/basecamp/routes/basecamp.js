module.exports = {
  routes: [
    {
      method: "GET",
      path: "/basecamp/fetch",
      handler: "basecamp.fetch",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/basecamp/refreshToken",
      handler: "basecamp.refreshToken",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/basecamp/authorization",
      handler: "basecamp.authorization",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
