-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technician" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professionId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Technician_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Technician_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Technician" ("createdAt", "professionId", "updatedAt", "userId") SELECT "createdAt", "professionId", "updatedAt", "userId" FROM "Technician";
DROP TABLE "Technician";
ALTER TABLE "new_Technician" RENAME TO "Technician";
CREATE UNIQUE INDEX "Technician_userId_key" ON "Technician"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
