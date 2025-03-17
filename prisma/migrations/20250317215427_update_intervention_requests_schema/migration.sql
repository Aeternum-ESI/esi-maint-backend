-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Interventions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "interventionRequestId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Interventions_interventionRequestId_fkey" FOREIGN KEY ("interventionRequestId") REFERENCES "InterventionRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Interventions" ("createdAt", "description", "id", "interventionRequestId") SELECT "createdAt", "description", "id", "interventionRequestId" FROM "Interventions";
DROP TABLE "Interventions";
ALTER TABLE "new_Interventions" RENAME TO "Interventions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
