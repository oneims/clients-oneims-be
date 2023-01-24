module.exports = {
  routes: [
    {
      method: "POST",
      path: "/trigger-email/notify-user-progress",
      handler: "trigger-email.notifyUserProgress",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
