CREATE TABLE Societies (
    id UUID NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL DEFAULT '{"address_line1":"",',
    email VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    status SMALLINT NOT NULL DEFAULT 1,
    registration_number VARCHAR(50),
    logo_url TEXT NOT NULL,
    theme VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE Users (
    id UUID NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(100),
    None VARCHAR(255),
    email VARCHAR(50) UNIQUE,
    username VARCHAR(50) UNIQUE,
    status SMALLINT DEFAULT 1,
    role SMALLINT,
    society_id UUID,
    device_id UUID,
    last_login_at TIMESTAMP,
    profile_photo_url TEXT,
    preference TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE Roles (
    id SMALLINT,
    name VARCHAR(50),
    is_default BOOLEAN,
    society_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE RolePermissions (
    id SMALLINT,
    role_id VARCHAR(50),
    module BOOLEAN,
    permission VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE Flats (
    id UUID NOT NULL,
    number VARCHAR(10),
    block VARCHAR(10),
    floor VARCHAR(20),
    size VARCHAR(50) UNIQUE,
    occupancy_status VARCHAR(50) NOT NULL UNIQUE,
    current_resident UUID NOT NULL DEFAULT 1,
    owner_id UUID NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE SoceityMembers (
    id UUID NOT NULL,
    user_id UUID NOT NULL,
    society_id UUID NOT NULL,
    flat_id UUID NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE Vehicles (
    id UUID NOT NULL,
    registration_numner VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    photo_url VARCHAR(50),
    owner_id UUID,
    parking_slot VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE ComplaINTs (
    id UUID NOT NULL,
    raised_by UUID NOT NULL,
    flat_id UUID NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500),
    status INTEGER NOT NULL,
    category INTEGER NOT NULL,
    priority VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    updated_at TIMESTAMP,
    updated_by UUID,
    PRIMARY KEY (id)
);

CREATE TABLE ComplaintCategories (
    id INTEGER NOT NULL,
    title VARCHAR(50),
    society_id UUID,
    description VARCHAR(100),
    is_active BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    templates TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE ComplaintComments (
    id UUID NOT NULL,
    complaint_id UUID,
    user_id UUID,
    comment VARCHAR(200),
    parent_comment_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Events (
    id UUID,
    society_id UUID DEFAULT '—',
    category_id UUID DEFAULT '—',
    title VARCHAR(200) DEFAULT '—',
    description TEXT,
    event_type VARCHAR(50) DEFAULT 'Society',
    start_datetime TIMESTAMP DEFAULT '—',
    end_datetime TIMESTAMP,
    location VARCHAR(200),
    max_participants INTEGER,
    registration_required BOOLEAN DEFAULT False,
    ticket_price DECIMAL(10,2) DEFAULT 0,
    status SMALLINT DEFAULT 1,
    memebrs VARCHAR(200) DEFAULT '[]',
    created_by UUID DEFAULT '—',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    attachment_url VARCHAR(500),
    id UUID,
    event_id UUID DEFAULT '—',
    user_id UUID DEFAULT '—',
    response_status VARCHAR(20) DEFAULT 'Pending',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments VARCHAR(255),
    id UUID,
    event_id UUID DEFAULT '—',
    file_name VARCHAR(200) DEFAULT '—',
    file_url VARCHAR(500) DEFAULT '—',
    uploaded_by UUID DEFAULT '—',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE FinancialData (
    id UUID NOT NULL,
    soceity_id UUID,
    current_maINTainance_collected DOUBLE PRECISION NOT NULL DEFAULT 0,
    current_maINTainance_pending DOUBLE PRECISION NOT NULL DEFAULT 0,
    cash_reserve DOUBLE PRECISION NOT NULL DEFAULT 0,
    total_expenses DOUBLE PRECISION NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MaintainceConfigs (
    id UUID NOT NULL,
    soceity_id UUID,
    billing_cycle INTEGER DEFAULT 0,
    calculation_method INTEGER DEFAULT 0,
    amount DOUBLE PRECISION DEFAULT 0,
    amount_per_sqft DOUBLE PRECISION DEFAULT 0,
    late_fee DOUBLE PRECISION DEFAULT 0,
    late_fee_grace_days DOUBLE PRECISION DEFAULT 0,
    due_day_of_month INTEGER,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    is_active BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MaINTenanceCycles (
    id UUID NOT NULL,
    soceity_id UUID,
    config_id UUID,
    cycle_month INTEGER NOT NULL,
    cycle_year INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    status INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE MaINTenanceBills (
    id UUID,
    society_id UUID,
    flat_id UUID,
    cycle_id UUID,
    base_amount DOUBLE PRECISION DEFAULT 0,
    penalty_amount DOUBLE PRECISION DEFAULT 0,
    discount_amount DOUBLE PRECISION DEFAULT 0,
    total_amount DOUBLE PRECISION DEFAULT 0,
    due_date INTEGER,
    status INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE MaINTenancePayments (
    id UUID,
    society_id UUID,
    bill_id UUID,
    flat_id UUID,
    payment_date TIMESTAMP,
    payment_method INTEGER,
    transaction_ref UUID,
    amount_paid DOUBLE PRECISION,
    payment_status INTEGER,
    receipt_url TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE MaINTenanceLedger (
    id UUID,
    society_id UUID,
    flat_id UUID,
    bill_id UUID,
    transaction_type INTEGER,
    amount DOUBLE PRECISION,
    balance DOUBLE PRECISION,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE OneTimeCollection (
    id UUID NOT NULL,
    society_id UUID NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    collection_type INTEGER NOT NULL,
    total_target_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    per_flat_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    calculation_method INTEGER NOT NULL,
    due_date INTEGER NOT NULL,
    late_fee DOUBLE PRECISION,
    late_fee_grace_days DOUBLE PRECISION,
    status INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE OneTimeCollectionFlats (
    id UUID NOT NULL,
    collection_id UUID NOT NULL,
    society_id UUID NOT NULL,
    flat_id UUID NOT NULL,
    amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    penalty_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    discount_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    amount_paid DOUBLE PRECISION NOT NULL DEFAULT 0,
    total_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    due_date INTEGER NOT NULL,
    status INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE OneTimeCollectionFlats (
    id (PK) UUID,
    collection_id UUID,
    collection_flat_id UUID,
    society_id UUID,
    flat_id UUID,
    payment_date TIMESTAMP,
    payment_method INTEGER,
    transaction_reference VARCHAR(100),
    amount_paid DOUBLE PRECISION,
    payment_status INTEGER,
    receipt_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id (PK))
);

CREATE TABLE OneTimeCollectionFlats (
    id UUID,
    society_id UUID,
    collection_id UUID,
    flat_id UUID,
    transaction_type INTEGER,
    amount DOUBLE PRECISION,
    balance DOUBLE PRECISION,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE important_contacts (
    id UUID NOT NULL,
    society_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE notices (
    id UUID NOT NULL,
    society_id UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    attachment_url VARCHAR(100),
    publish_date TIMESTAMP,
    expiry_date TIMESTAMP,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE documents (
    id UUID,
    society_id UUID,
    title VARCHAR(100),
    document_type VARCHAR(100),
    file_url VARCHAR(100),
    uploaded_by UUID,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Audits (
    id UUID NOT NULL,
    society_id UUID NOT NULL,
    user_id UUID NOT NULL,
    entity_type INTEGER NOT NULL,
    entity_id UUID NOT NULL,
    action INTEGER NOT NULL,
    old_value VARCHAR(500) NOT NULL,
    new_value VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE notifications (
    id UUID NOT NULL,
    society_id UUID NOT NULL,
    user_id UUID NOT NULL,
    title VARCHAR(50) NOT NULL,
    message VARCHAR(500) NOT NULL,
    notification_type INTEGER NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Subscription (
    id UUID,
    society_id UUID,
    plan_id UUID,
    billing_cycle VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE Plans (
    id UUID NOT NULL,
    plan_name VARCHAR(50) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    max_flats INTEGER NOT NULL DEFAULT 10,
    features_json TEXT,
    PRIMARY KEY (id)
);