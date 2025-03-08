/*
  Warnings:

  - You are about to alter the column `endTime` on the `TechnicianAvailability` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `startTime` on the `TechnicianAvailability` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TechnicianAvailability" (
    "technicianId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TechnicianAvailability_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAvailability" ("createdAt", "day", "endTime", "startTime", "technicianId", "updatedAt") SELECT "createdAt", "day", "endTime", "startTime", "technicianId", "updatedAt" FROM "TechnicianAvailability";
DROP TABLE "TechnicianAvailability";
ALTER TABLE "new_TechnicianAvailability" RENAME TO "TechnicianAvailability";
CREATE UNIQUE INDEX "TechnicianAvailability_technicianId_day_key" ON "TechnicianAvailability"("technicianId", "day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
