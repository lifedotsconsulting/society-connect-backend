const BaseModel = require('./BaseModel');

class MaintenancePayment extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.billId = data.billId || data.bill_id || null;
        this.flatId = data.flatId || data.flat_id || null;
        this.paymentDate = data.paymentDate || data.payment_date || null;
        this.paymentMethod = data.paymentMethod || data.payment_method || 1;
        this.transactionRef = data.transactionRef || data.transaction_ref || null;
        this.amountPaid = data.amountPaid || data.amount_paid || 0;
        this.paymentStatus = data.paymentStatus || data.payment_status || 1;
        this.receiptUrl = data.receiptUrl || data.receipt_url || '';
        // Note: MaINTenancePayments in schema doesn't have created_at/created_by explicitly shown but likely has. 
        // Oh wait, `MaINTenancePayments` has columns: `id`, `society_id`, `bill_id`, `flat_id`, `payment_date`, `payment_method`, `transaction_ref`, `amount_paid`, `payment_status`, `receipt_url`
    }
}

module.exports = MaintenancePayment;
