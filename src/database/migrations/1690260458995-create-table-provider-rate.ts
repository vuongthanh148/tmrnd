import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProviderRate1690260458995
  implements MigrationInterface
{
  name = 'CreateTableProviderRate1690260458995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "provider" ("id" SERIAL NOT NULL, "name" character varying(500) NOT NULL, "code" character varying(500) NOT NULL, "url" character varying(500) NOT NULL, "username" character varying(500), "password" character varying(500), "apiKey" character varying(500), "status" boolean NOT NULL DEFAULT '1', "createdAt" TIMESTAMP DEFAULT 'now()', "updatedAt" TIMESTAMP DEFAULT 'now()', CONSTRAINT "UQ_8da0db8c3fabde91d783af1fe09" UNIQUE ("code"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" SERIAL NOT NULL, "provider_ids" integer array NOT NULL, "departure_post_code" integer NOT NULL, "arrival_post_code" integer NOT NULL, "departure_state_name" text NOT NULL, "departure_country_code" text NOT NULL, "arrival_state_name" text NOT NULL, "arrival_country_code" text NOT NULL, "item_length" integer NOT NULL, "item_width" integer NOT NULL, "item_height" integer NOT NULL, "item_weight" integer NOT NULL, "addons" jsonb, "createdAt" TIMESTAMP DEFAULT 'now()', "updatedAt" TIMESTAMP DEFAULT 'now()', CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rate"`);
    await queryRunner.query(`DROP TABLE "provider"`);
  }
}
