import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoritesTable1758725620239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "pokemonName" VARCHAR NOT NULL,
        "pictureUrl" VARCHAR NOT NULL,
        "createdAt" DATETIME DEFAULT (datetime('now')),
        "updatedAt" DATETIME DEFAULT (datetime('now')),
        "deletedAt" DATETIME
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
