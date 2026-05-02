import { Injectable } from '@nestjs/common';

@Injectable()
export class FraudDetectionService {
  /**
   * Evaluates order data against rules F001-F007
   * Returns true if valid, false if flagged
   */
  evaluateOrderCreation(orderData: any): { isFlagged: boolean; reason?: string } {
    // Stub implementation of Document 5 Layer 5 Fraud Rules
    // F001: Velocity check - more than 5 orders from same IP in 10 minutes
    // F002: Unusual location - Buyer delivery pin > 50km from selected market
    // F003: Price manipulation - Cart subtotal doesn't match sum of product unit prices
    // F004: Payment replay - Idempotency key reuse across different amounts

    // Simple basic validation for demo:
    if (!orderData.buyer || !orderData.buyer.userId) {
      return { isFlagged: true, reason: 'F005: Missing buyer identity' };
    }

    if (orderData.financials.subtotal > 500000) {
      return { isFlagged: true, reason: 'F006: Abnormally high transaction value' };
    }

    return { isFlagged: false };
  }
}
