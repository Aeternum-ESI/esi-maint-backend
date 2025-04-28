/*
  Warnings:

  - You are about to drop the column `priority` on the `InterventionRequest` table. All the data in the column will be lost.
  - You are about to drop the column `notified` on the `TechnicianAssignement` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterventionRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterventionRequest_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InterventionRequest_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InterventionRequest" ("createdAt", "createdBy", "deadline", "id", "reportId", "status", "title") SELECT "createdAt", "createdBy", "deadline", "id", "reportId", "status", "title" FROM "InterventionRequest";
DROP TABLE "InterventionRequest";
ALTER TABLE "new_InterventionRequest" RENAME TO "InterventionRequest";
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reporterId" INTEGER NOT NULL,
    "assetId" INTEGER,
    "categoryId" INTEGER,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Report_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Report_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("assetId", "categoryId", "createdAt", "description", "id", "imageUrl", "reporterId", "status", "type", "updatedAt") SELECT "assetId", "categoryId", "createdAt", "description", "id", "imageUrl", "reporterId", "status", "type", "updatedAt" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE TABLE "new_TechnicianAssignement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "technicianId" INTEGER NOT NULL,
    "interventionRequestId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TechnicianAssignement_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_interventionRequestId_fkey" FOREIGN KEY ("interventionRequestId") REFERENCES "InterventionRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAssignement" ("completed", "createdAt", "details", "id", "interventionRequestId", "locationId", "technicianId") SELECT "completed", "createdAt", "details", "id", "interventionRequestId", "locationId", "technicianId" FROM "TechnicianAssignement";
DROP TABLE "TechnicianAssignement";
ALTER TABLE "new_TechnicianAssignement" RENAME TO "TechnicianAssignement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
