CREATE DATABASE IF NOT EXISTS society_connect;
USE society_connect;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    identity VARCHAR(255) PRIMARY KEY,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    
    flatNumber VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Resident',
    email VARCHAR(255),
    phone VARCHAR(50),
    passwordHash VARCHAR(255) NOT NULL,
    deviceId VARCHAR(255)
);

-- Flats Table
CREATE TABLE IF NOT EXISTS Flats (
    identity VARCHAR(255) PRIMARY KEY,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    
    flatNumber VARCHAR(50) NOT NULL UNIQUE,
    block VARCHAR(50),
    floor INT DEFAULT 1,
    bhk VARCHAR(20) DEFAULT '2BHK',
    occupancyStatus VARCHAR(50) DEFAULT 'Vacant',
    currentResidentId VARCHAR(255),
    ownerId VARCHAR(255),
    FOREIGN KEY (currentResidentId) REFERENCES Users(identity) ON DELETE SET NULL,
    FOREIGN KEY (ownerId) REFERENCES Users(identity) ON DELETE SET NULL
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS Vehicles (
    identity VARCHAR(255) PRIMARY KEY,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    
    vehicleNumber VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(50) DEFAULT '4-wheeler',
    make VARCHAR(100),
    model VARCHAR(100),
    color VARCHAR(50),
    ownerUserId VARCHAR(255),
    flatNumber VARCHAR(50),
    parkingSlot VARCHAR(50),
    FOREIGN KEY (ownerUserId) REFERENCES Users(identity) ON DELETE SET NULL
);

-- Complaints Table
CREATE TABLE IF NOT EXISTS Complaints (
    identity VARCHAR(255) PRIMARY KEY,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    status VARCHAR(50) DEFAULT 'Open',
    priority VARCHAR(50) DEFAULT 'Medium',
    raisedByUserId VARCHAR(255),
    raisedForFlat VARCHAR(50),
    assignedTo VARCHAR(255),
    resolutionNotes TEXT,
    FOREIGN KEY (raisedByUserId) REFERENCES Users(identity) ON DELETE SET NULL
);

-- Events Table
CREATE TABLE IF NOT EXISTS Events (
    identity VARCHAR(255) PRIMARY KEY,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255),
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedBy VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    
    title VARCHAR(255) NOT NULL,
    eventDate DATETIME,
    endDate DATETIME,
    location VARCHAR(255),
    organizer VARCHAR(100),
    category VARCHAR(100) DEFAULT 'General',
    isPublished BOOLEAN DEFAULT FALSE
);
