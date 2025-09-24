import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamsTable1758729999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "teams" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" VARCHAR NOT NULL,
        "pokemons" TEXT NOT NULL,
        "createdAt" DATETIME DEFAULT (datetime('now')),
        "updatedAt" DATETIME DEFAULT (datetime('now')),
        "deletedAt" DATETIME
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
