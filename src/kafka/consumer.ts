import { kafka } from './client';

const consumer = kafka.consumer({ groupId: 'task-analytics-group' });

export async function startKafkaConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: 'task-events',
      fromBeginning: true,
    });

    console.log('📥 Apache Kafka Consumer listening on topic: task-events');

    await consumer.run({
      eachMessage: async ({ partition, message }) => {
        const value = message.value
          ? message.value.toString()
          : '';

        console.log(`\n📥 [KAFKA CONSUMER RECEIVED EVENT]`);
        console.log(`   Partition : ${partition}`);
        console.log(`   Payload   : ${value}\n`);
      },
    });
  } catch (err: any) {
    console.error('❌ Kafka Consumer connection failed:', err.message);
  }
}