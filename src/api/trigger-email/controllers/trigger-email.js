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
    const dynamicTemplateData = body.dynamicTemplateData;
    try {
      await strapi.plugins["email"].services.email.send({
        to: toEmailAddress,
        from: fromEmailAddress,
        replyTo: fromEmailAddress,
        subject,
        template_id: "d-eb91560f281b45b49c7c55bbb12df74b",
        dynamicTemplateData,
      });
      ctx.send({ message: "Email sent" });
    } catch (err) {
      ctx.body = err;
      ctx.send({ error: "Error sending email" });
    }
  },
};
