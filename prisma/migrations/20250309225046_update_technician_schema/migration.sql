-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Notification" ("createdAt", "id", "message", "read", "title", "updatedAt", "userId") SELECT "createdAt", "id", "message", "read", "title", "updatedAt", "userId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE TABLE "new_TechnicianAvailability" (
    "technicianId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TechnicianAvailability_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAvailability" ("createdAt", "day", "endHour", "startHour", "technicianId", "updatedAt") SELECT "createdAt", "day", "endHour", "startHour", "technicianId", "updatedAt" FROM "TechnicianAvailability";
DROP TABLE "TechnicianAvailability";
ALTER TABLE "new_TechnicianAvailability" RENAME TO "TechnicianAvailability";
CREATE UNIQUE INDEX "TechnicianAvailability_technicianId_day_key" ON "TechnicianAvailability"("technicianId", "day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
