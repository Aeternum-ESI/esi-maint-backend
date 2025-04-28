-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TechnicianAssignement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "technicianId" INTEGER NOT NULL,
    "interventionRequestId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "notifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TechnicianAssignement_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_interventionRequestId_fkey" FOREIGN KEY ("interventionRequestId") REFERENCES "InterventionRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TechnicianAssignement_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAssignement" ("completed", "createdAt", "id", "interventionRequestId", "locationId", "technicianId") SELECT "completed", "createdAt", "id", "interventionRequestId", "locationId", "technicianId" FROM "TechnicianAssignement";
DROP TABLE "TechnicianAssignement";
ALTER TABLE "new_TechnicianAssignement" RENAME TO "TechnicianAssignement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
