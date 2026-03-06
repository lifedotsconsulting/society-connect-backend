const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const flatRoute = require('./flat.routes');
const complaintRoute = require('./complaint.routes');
const vehicleRoute = require('./vehicle.routes');
const eventRoute = require('./event.routes');

// Society Features
const societyRoute = require('./society.routes');
const societyMemberRoute = require('./society-member.routes');
const roleRoute = require('./role.routes');
const rolePermissionRoute = require('./role-permission.routes');

// Communication Features
const importantContactRoute = require('./important-contact.routes');
const noticeRoute = require('./notice.routes');
const documentRoute = require('./document.routes');
const notificationRoute = require('./notification.routes');

// Extentions
const complaintCategoryRoute = require('./complaint-category.routes');
const complaintCommentRoute = require('./complaint-comment.routes');

// Financial Features
const financialDataRoute = require('./financial-data.routes');
const maintenanceConfigRoute = require('./maintenance-config.routes');
const maintenanceCycleRoute = require('./maintenance-cycle.routes');
const maintenanceBillRoute = require('./maintenance-bill.routes');
const maintenancePaymentRoute = require('./maintenance-payment.routes');
const maintenanceLedgerRoute = require('./maintenance-ledger.routes');
const oneTimeCollectionRoute = require('./one-time-collection.routes');
const oneTimeCollectionFlatRoute = require('./one-time-collection-flat.routes');

// System
const auditRoute = require('./audit.routes');
const subscriptionRoute = require('./subscription.routes');
const planRoute = require('./plan.routes');


const router = express.Router();

// Define routes
const defaultRoutes = [
    { path: '/auth', route: authRoute },
    { path: '/users', route: userRoute },
    { path: '/flats', route: flatRoute },
    { path: '/complaints', route: complaintRoute },
    { path: '/vehicles', route: vehicleRoute },
    { path: '/events', route: eventRoute },

    // Society Feature Endpoints
    { path: '/societies', route: societyRoute },
    { path: '/society-members', route: societyMemberRoute },
    { path: '/roles', route: roleRoute },
    { path: '/role-permissions', route: rolePermissionRoute },

    // Communication Feature Endpoints
    { path: '/important-contacts', route: importantContactRoute },
    { path: '/notices', route: noticeRoute },
    { path: '/documents', route: documentRoute },
    { path: '/notifications', route: notificationRoute },

    // Extensions Endpoints
    { path: '/complaint-categories', route: complaintCategoryRoute },
    // Notice that complaint-comments endpoints handles nesting natively on its own router, we just mount the root here
    { path: '/', route: complaintCommentRoute },

    // Financial Endpoints
    { path: '/financial-data', route: financialDataRoute },
    { path: '/maintenance-configs', route: maintenanceConfigRoute },
    { path: '/maintenance-cycles', route: maintenanceCycleRoute },
    { path: '/maintenance-bills', route: maintenanceBillRoute },
    { path: '/maintenance-payments', route: maintenancePaymentRoute },
    { path: '/maintenance-ledgers', route: maintenanceLedgerRoute },
    { path: '/one-time-collections', route: oneTimeCollectionRoute },
    { path: '/one-time-collection-flats', route: oneTimeCollectionFlatRoute },

    // System Endpoints
    { path: '/audits', route: auditRoute },
    { path: '/subscriptions', route: subscriptionRoute },
    { path: '/plans', route: planRoute }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
