/*
  Warnings:

  - You are about to alter the column `image` on the `Offer` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageName" TEXT,
    "image" BLOB,
    "petName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "localization" TEXT NOT NULL,
    "breeds" TEXT NOT NULL,
    "shelterId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Offer_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("age", "breeds", "createdAt", "description", "id", "image", "localization", "petName", "petType", "shelterId", "updatedAt") SELECT "age", "breeds", "createdAt", "description", "id", "image", "localization", "petName", "petType", "shelterId", "updatedAt" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
