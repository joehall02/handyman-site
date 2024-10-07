const request = require("supertest");
const express = require("express");

// Mocking contentful client
const mockClient = {
  getEntries: jest.fn(() => Promise.resolve({ items: [] })), // Mocking getEntries method to return an empty array
};
jest.mock("contentful", () => ({ createClient: () => mockClient })); // Mocking contentful's createClient method to return the mockClient

// Mocking emailjs
const mockSend = jest.fn(() => Promise.resolve()); // Mocking send method to resolve successfully
jest.mock("@emailjs/nodejs", () => ({ send: mockSend })); // Mocking emailjs's send method to return the mockSend

const { app, server } = require("./server");

// Mocking console.error and console.log to prevent them from printing
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

// Resetting mocks before each test
afterEach(() => {
  jest.clearAllMocks();
});

// Cleaning up mocks after all tests
afterAll((done) => {
  jest.restoreAllMocks();
  server.close(done);
});

// Test suite for GET /api/gallery endpoint
describe("GET /api/gallery", () => {
  // Test case for when no items are found
  it("should return 404 if no items are found", async () => {
    mockClient.getEntries.mockResolvedValueOnce({ items: [] }); // Mocking getEntries to return an empty array
    const response = await request(app).get("/api/gallery"); // Sending GET request to /api/gallery
    expect(response.status).toBe(404); // Expecting 404 status code
  });

  // Test case for when items are found
  it("should return 200 and gallery items if items are found", async () => {
    const mockItems = [
      {
        fields: {
          title: "Title 1",
          description: "Description 1",
          image: {
            sys: {
              id: "549738jegrwh",
            },
          },
        },
      },
    ];

    const mockIncludes = {
      Asset: [
        {
          sys: {
            id: "549738jegrwh",
          },
          fields: {
            title: "Title 1",
            description: "Description 1",
            file: {
              url: "//images.com/image1.jpeg",
              details: {
                size: 1323653,
                image: {
                  width: 4032,
                  height: 3024,
                },
              },
              fileName: "image1.jpeg",
              contentType: "image/jpeg",
            },
          },
        },
      ],
    };

    // Mocking getEntries to return mockItems and includes
    mockClient.getEntries.mockResolvedValueOnce({ items: mockItems, includes: mockIncludes });

    const mockResults = mockItems.map((item) => {
      const asset = mockIncludes.Asset.find((asset) => asset.sys.id === item.fields.image.sys.id);
      return {
        title: item.fields.title,
        description: item.fields.description,
        imageUrl: asset.fields.file.url,
      };
    });
    const response = await request(app).get("/api/gallery"); // Sending GET request to /api/gallery
    expect(response.status).toBe(200); // Expecting 200 status code
    expect(response.body).toEqual(mockResults); // Expecting response body to equal mockItems
  });
});

// Test suite for POST /api/contact endpoint
describe("POST /api/contact", () => {
  // Test case for successful email sending
  it("should send an email", async () => {
    const response = await request(app).post("/api/contact").send({
      name: "John Doe",
      email: "johndoe123@example.com",
      phone: "1234567890",
      message: "Hello, World!",
    }); // Sending POST request to /api/contact with form data

    expect(response.status).toBe(200); // Expecting 200 status code
    expect(response.body).toEqual({ message: "Email sent successfully!" }); // Expecting success message
    expect(mockSend).toHaveBeenCalled(); // Ensure the mockSend function was called
  });

  // Test case for error during email sending
  it("should return a 500 status code if an error occurs", async () => {
    mockSend.mockImplementationOnce(() => Promise.reject(new Error("An error occurred"))); // Mocking send method to reject with an error

    const response = await request(app).post("/api/contact").send({
      name: "John Doe",
      email: "johndoe123@example.com",
      phone: "123-456-7890",
      message: "Hello, World!",
    }); // Sending POST request to /api/contact with form data

    expect(response.status).toBe(500); // Expecting 500 status code
    expect(response.body).toEqual({ error: "Email failed to send. Try again later." }); // Expecting error message
  });
});
