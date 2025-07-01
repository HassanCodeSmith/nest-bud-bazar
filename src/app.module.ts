import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/mongoose/database.module';
import { UsersModule } from './users/users.module';
import { MongooseModelsModule } from './schemas/mongoose-models.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModelsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
