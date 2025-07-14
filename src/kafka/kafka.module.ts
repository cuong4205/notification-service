import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email-service-client',
            brokers: ['localhost:9092'],
            connectionTimeout: 30000,
            requestTimeout: 30000,
          },
          consumer: {
            groupId: 'email-consumer-group',
            allowAutoTopicCreation: true,
            sessionTimeout: 30000,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
