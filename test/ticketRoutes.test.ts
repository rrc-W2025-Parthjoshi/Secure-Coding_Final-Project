import { calculateTicketUrgency, TicketUrgency } from "../src/api/v1/services/ticketService";

describe("Ticket Urgency Calculation", () => {
    it("should calculate low urgency for low priority ticket", () => {
        // Arrange
        const ticketId: number = 1;

        // Act
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Assert
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBeGreaterThanOrEqual(10);
        expect(result?.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    });

    it("should calculate critical urgency for critical priority old ticket", () => {
        // Arrange
        const ticketId: number = 6;

        // Act
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Assert
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBeGreaterThanOrEqual(80);
        expect(result?.urgencyLevel).toBe("Critical. Immediate attention required.");
    });

    it("should return minimal urgency for resolved tickets", () => {
        // Arrange
        const ticketId: number = 7;

        // Act
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Assert
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(0);
        expect(result?.urgencyLevel).toBe("Minimal. Ticket resolved.");
    });

    it("should return undefined for non-existent ticket", () => {
        // Arrange
        const ticketId: number = 99999;

        // Act
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Assert
        expect(result).toBeUndefined();
    });
});