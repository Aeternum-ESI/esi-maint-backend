/*
  Warnings:

  - You are about to drop the column `type` on the `InterventionRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterventionRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InterventionRequest_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InterventionRequest_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InterventionRequest" ("createdAt", "createdBy", "deadline", "id", "priority", "reportId", "status", "title") SELECT "createdAt", "createdBy", "deadline", "id", "priority", "reportId", "status", "title" FROM "InterventionRequest";
DROP TABLE "InterventionRequest";
ALTER TABLE "new_InterventionRequest" RENAME TO "InterventionRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
