-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryClosure" (
    "ancestorId" INTEGER NOT NULL,
    "descendantId" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,

    PRIMARY KEY ("ancestorId", "descendantId"),
    CONSTRAINT "CategoryClosure_ancestorId_fkey" FOREIGN KEY ("ancestorId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CategoryClosure_descendantId_fkey" FOREIGN KEY ("descendantId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CategoryClosure" ("ancestorId", "depth", "descendantId") SELECT "ancestorId", "depth", "descendantId" FROM "CategoryClosure";
DROP TABLE "CategoryClosure";
ALTER TABLE "new_CategoryClosure" RENAME TO "CategoryClosure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
