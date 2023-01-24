"use strict";

/**
 * A set of functions called "actions" for `user-progress-notification`
 */

module.exports = {
  notifyUserProgress: async (ctx, next) => {
    const body = ctx.request.body;
    const toEmailAddress = body.toEmailAddress;
    const subject = body.subject;
    const fromEmailAddress = "pbokhari@oneims.com";
    const html = body.html;
    try {
      await strapi.plugins["email"].services.email.send({
        to: toEmailAddress,
        from: fromEmailAddress,
        replyTo: fromEmailAddress,
        subject,
        html,
      });
      ctx.send({ message: "Email sent" });
    } catch (err) {
      ctx.body = err;
      ctx.send({ error: "Error sending email" });
    }
  },
};
