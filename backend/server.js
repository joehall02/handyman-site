const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require("contentful");
const emailjs = require("@emailjs/nodejs");

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.SERVER_PORT || 5050;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Class to represent a gallery item
class GalleryItem {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

app.get("/api/gallery", async (req, res) => {
  try {
    // Create a new Contentful client
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      host: "cdn.contentful.com", // Use the CDN to only retrieve published content
    });

    // Fetch gallery items from Contentful
    const response = await client.getEntries();

    // Check if the response has the necessary data
    if (response && response.items.length > 0) {
      // Create a map of asset IDs to URLs
      // Ensure response.includes.Asset exists
      const assetMap =
        response.includes && response.includes.Asset
          ? response.includes.Asset.reduce((acc, asset) => {
              acc[asset.sys.id] = asset.fields.file.url;
              return acc;
            }, {})
          : {};

      // Map response items to GalleryItem objects
      const items = response.items.map((item) => {
        const { title, description, image } = item.fields;
        const imageUrl = assetMap[image.sys.id];
        return new GalleryItem(title, description, imageUrl);
      });

      res.json(items);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.error("An error fetching gallery items:", error);
    res.status(500).json({ error: "Unable to load gallery items at this time." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Send email using emailjs
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const publicID = process.env.EMAILJS_PUBLIC_KEY;
  const privateID = process.env.EMAILJS_PRIVATE_KEY;

  const templateParams = {
    name,
    email,
    phone,
    message,
  };

  try {
    await emailjs.send(serviceID, templateID, templateParams, {
      publicKey: publicID,
      privateKey: privateID,
    });
    console.log("Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email failed to send:", error);
    res.status(500).json({ error: "Email failed to send. Try again later." });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for testing
module.exports = { app, server };
