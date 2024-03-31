import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFollows1711926941702 implements MigrationInterface {
  name = 'CreateFollows1711926941702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "follows" ("id" SERIAL NOT NULL, "follower_id" integer NOT NULL, "following_id" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "follows"`);
  }
}
