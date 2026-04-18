import request, { Response } from "supertest";
import app from "../src/app";

interface TicketData {
    title: string;
    description: string;
    priority: string;
}

interface InvalidTicketData {
    description: string;
    priority: string;
}

describe("Support Ticket Routes", () => {
    let createdTicketId: number;

    it("should create a ticket successfully", async () => {
        // Arrange
        const ticketData: TicketData = {
            title: "Test ticket",
            description: "Test description",
            priority: "low",
        };

        // Act
        const response: Response = await request(app)
            .post("/api/v1/tickets")
            .send(ticketData);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Test ticket");

        createdTicketId = response.body.id;
    });

    it("should return 400 when title is missing", async () => {
        // Arrange
        const invalidTicket: InvalidTicketData = {
            description: "No title",
            priority: "low",
        };

        // Act
        const response: Response = await request(app)
            .post("/api/v1/tickets")
            .send(invalidTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Missing required field: title");
    });

    it("should return all tickets", async () => {
        // Act
        const response: Response = await request(app).get("/api/v1/tickets");

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 404 for invalid ticket ID", async () => {
        // Arrange
        const invalidId: number = 99999;

        // Act
        const response: Response = await request(app).get(
            `/api/v1/tickets/${invalidId}`
        );

        // Assert
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Ticket not found");
    });

    it("should calculate ticket urgency", async () => {
        // Arrange
        const ticketId: number = 1;

        // Act
        const response: Response = await request(app).get(
            `/api/v1/tickets/${ticketId}/urgency`
        );

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Ticket urgency calculated");
        expect(response.body.data).toHaveProperty("urgencyScore");
        expect(response.body.data).toHaveProperty("urgencyLevel");
        expect(response.body.data).toHaveProperty("ticketAge");
    });

    it("should delete a ticket successfully", async () => {
        // Arrange
        const ticketId: number = createdTicketId;

        // Act
        const response: Response = await request(app).delete(
            `/api/v1/tickets/${ticketId}`
        );

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Ticket deleted successfully");
    });
});
