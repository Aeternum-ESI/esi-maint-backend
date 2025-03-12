/*
  Warnings:

  - You are about to drop the column `period` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assetId" INTEGER,
    "schedulerId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "description" TEXT,
    "lastMaintenanceDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequency" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedule_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_schedulerId_fkey" FOREIGN KEY ("schedulerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("assetId", "categoryId", "createdAt", "description", "id", "lastMaintenanceDate", "schedulerId", "updatedAt") SELECT "assetId", "categoryId", "createdAt", "description", "id", "lastMaintenanceDate", "schedulerId", "updatedAt" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
