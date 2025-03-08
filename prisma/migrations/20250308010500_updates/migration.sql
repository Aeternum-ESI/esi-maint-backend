/*
  Warnings:

  - You are about to drop the column `endTime` on the `TechnicianAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `TechnicianAvailability` table. All the data in the column will be lost.
  - Added the required column `endHour` to the `TechnicianAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHour` to the `TechnicianAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TechnicianAvailability" (
    "technicianId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "startHour" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TechnicianAvailability_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TechnicianAvailability" ("createdAt", "day", "technicianId", "updatedAt") SELECT "createdAt", "day", "technicianId", "updatedAt" FROM "TechnicianAvailability";
DROP TABLE "TechnicianAvailability";
ALTER TABLE "new_TechnicianAvailability" RENAME TO "TechnicianAvailability";
CREATE UNIQUE INDEX "TechnicianAvailability_technicianId_day_key" ON "TechnicianAvailability"("technicianId", "day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
