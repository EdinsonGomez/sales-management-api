-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_rol_id_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "rol_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
