import { Kafka, logLevel } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'task-engine-service',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
  logLevel: logLevel.ERROR,
  retry: {
    initialRetryTime: 300,
    retries: 3,
  },
});