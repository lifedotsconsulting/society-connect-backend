const userController = require('./user.controller');
const flatController = require('./flat.controller');
const complaintController = require('./complaint.controller');
const vehicleController = require('./vehicle.controller');
const eventController = require('./event.controller');
const authController = require('./auth.controller');

// Society Entities
const societyController = require('./society.controller');
const societyMemberController = require('./society-member.controller');
const roleController = require('./role.controller');
const rolePermissionController = require('./role-permission.controller');

// Communication
const importantContactController = require('./important-contact.controller');
const noticeController = require('./notice.controller');
const documentController = require('./document.controller');
const notificationController = require('./notification.controller');

// Complaint & Event Extensions
const complaintCategoryController = require('./complaint-category.controller');
const complaintCommentController = require('./complaint-comment.controller');

// Financial
const financialDataController = require('./financial-data.controller');
const maintenanceConfigController = require('./maintenance-config.controller');
const maintenanceCycleController = require('./maintenance-cycle.controller');
const maintenanceBillController = require('./maintenance-bill.controller');
const maintenancePaymentController = require('./maintenance-payment.controller');
const maintenanceLedgerController = require('./maintenance-ledger.controller');
const oneTimeCollectionController = require('./one-time-collection.controller');
const oneTimeCollectionFlatController = require('./one-time-collection-flat.controller');

// Subscription & Auditing
const auditController = require('./audit.controller');
const subscriptionController = require('./subscription.controller');
const planController = require('./plan.controller');

module.exports = {
    authController,
    userController,
    flatController,
    complaintController,
    vehicleController,
    eventController,
    societyController,
    societyMemberController,
    roleController,
    rolePermissionController,
    importantContactController,
    noticeController,
    documentController,
    notificationController,
    complaintCategoryController,
    complaintCommentController,
    financialDataController,
    maintenanceConfigController,
    maintenanceCycleController,
    maintenanceBillController,
    maintenancePaymentController,
    maintenanceLedgerController,
    oneTimeCollectionController,
    oneTimeCollectionFlatController,
    auditController,
    subscriptionController,
    planController
};
