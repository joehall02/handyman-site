import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "contentful";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.SERVER_PORT || 5050;

app.use(cors());

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
    if (response && response.items) {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
