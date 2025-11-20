// webhook.controller.js
import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed");
  }

  // For Clerk + Svix, body MUST be raw (Buffer/string)
  const payload = req.body;    // should be Buffer if using express.raw()
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification error:", err);
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  if (!evt) {
    return res.status(400).json({
      message: "Invalid webhook event",
    });
  }

  if (evt.type === "user.created") {
    try {
      const newUser = new User({
        clerkUserId: evt.data.id,
        username:
          evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_image_url,
      });

      await newUser.save();
    } catch (err) {
      console.error("Error saving new user:", err);
      return res.status(500).json({
        message: "Failed to create user from webhook",
      });
    }
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};
