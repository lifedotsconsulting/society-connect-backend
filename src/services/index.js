const authService = require('./auth.service');
const tokenService = require('./token.service');

const UserService = require('./UserService');
const FlatService = require('./FlatService');
const ComplaintService = require('./ComplaintService');
const VehicleService = require('./VehicleService');
const EventService = require('./EventService');
const SocietyService = require('./SocietyService');
const SocietyMemberService = require('./SocietyMemberService');
const RoleService = require('./RoleService');
const RolePermissionService = require('./RolePermissionService');
const ImportantContactService = require('./ImportantContactService');
const NoticeService = require('./NoticeService');
const DocumentService = require('./DocumentService');
const NotificationService = require('./NotificationService');
const ComplaintCategoryService = require('./ComplaintCategoryService');
const ComplaintCommentService = require('./ComplaintCommentService');
const FinancialDataService = require('./FinancialDataService');
const MaintenanceConfigService = require('./MaintenanceConfigService');
const MaintenanceCycleService = require('./MaintenanceCycleService');
const MaintenanceBillService = require('./MaintenanceBillService');
const MaintenancePaymentService = require('./MaintenancePaymentService');
const MaintenanceLedgerService = require('./MaintenanceLedgerService');
const OneTimeCollectionService = require('./OneTimeCollectionService');
const OneTimeCollectionFlatService = require('./OneTimeCollectionFlatService');
const AuditService = require('./AuditService');
const SubscriptionService = require('./SubscriptionService');
const PlanService = require('./PlanService');

module.exports = {
    authService,
    tokenService,
    UserService,
    FlatService,
    ComplaintService,
    VehicleService,
    EventService,
    SocietyService,
    SocietyMemberService,
    RoleService,
    RolePermissionService,
    ImportantContactService,
    NoticeService,
    DocumentService,
    NotificationService,
    ComplaintCategoryService,
    ComplaintCommentService,
    FinancialDataService,
    MaintenanceConfigService,
    MaintenanceCycleService,
    MaintenanceBillService,
    MaintenancePaymentService,
    MaintenanceLedgerService,
    OneTimeCollectionService,
    OneTimeCollectionFlatService,
    AuditService,
    SubscriptionService,
    PlanService
};
