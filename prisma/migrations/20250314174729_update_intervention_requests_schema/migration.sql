-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterventionRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterventionRequest_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InterventionRequest_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InterventionRequest" ("createdAt", "createdBy", "deadline", "id", "priority", "reportId", "status", "title") SELECT "createdAt", "createdBy", "deadline", "id", "priority", "reportId", "status", "title" FROM "InterventionRequest";
DROP TABLE "InterventionRequest";
ALTER TABLE "new_InterventionRequest" RENAME TO "InterventionRequest";
CREATE TABLE "new_TechnicianAssignement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "technicianId" INTEGER NOT NULL,
    "interventionRequestId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TechnicianAssignement_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_interventionRequestId_fkey" FOREIGN KEY ("interventionRequestId") REFERENCES "InterventionRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAssignement" ("createdAt", "id", "interventionRequestId", "locationId", "technicianId") SELECT "createdAt", "id", "interventionRequestId", "locationId", "technicianId" FROM "TechnicianAssignement";
DROP TABLE "TechnicianAssignement";
ALTER TABLE "new_TechnicianAssignement" RENAME TO "TechnicianAssignement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
