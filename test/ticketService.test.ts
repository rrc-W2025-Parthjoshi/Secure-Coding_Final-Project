import { calculateTicketUrgency, TicketUrgency } from "../src/api/v1/services/ticketService";

describe("Ticket Urgency Calculation", () => {
    it("should calculate low urgency for low priority ticket", () => {
        const ticketId: number = 1;
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Ticket 1: low priority (base 10) + 3 days * 3 = 19
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(19);
        expect(result?.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    });

    it("should calculate high urgency for critical priority ticket", () => {
        const ticketId: number = 6;
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        // Ticket 6: critical (base 50) + 6 days * 3 = 68
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(68);
        expect(result?.urgencyLevel).toBe("High urgency. Prioritize resolution.");
    });

    it("should return minimal urgency for resolved tickets", () => {
        const ticketId: number = 7;
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(0);
        expect(result?.urgencyLevel).toBe("Minimal. Ticket resolved.");
    });

    it("should return undefined for non-existent ticket", () => {
        const ticketId: number = 99999;
        const result: TicketUrgency | undefined = calculateTicketUrgency(ticketId);

        expect(result).toBeUndefined();
    });
});