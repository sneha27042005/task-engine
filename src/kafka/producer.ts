import { kafka } from './client';

const producer = kafka.producer();
let isConnected = false;

export async function connectProducer() {
  try {
    await producer.connect();
    isConnected = true;
    console.log('📢 Apache Kafka Producer connected successfully');
  } catch (err: any) {
    console.warn('⚠️ Kafka Broker not reached yet (will retry in Docker Compose Step 6)');
  }
}

export async function publishTaskEvent(eventType: string, payload: object) {
  if (!isConnected) {
    console.log(`\n📢 [KAFKA EVENT PRODUCED (SIMULATED)]`);
    console.log(`   Topic: task-events`);
    console.log(`   Type : ${eventType}`);
    console.log(`   Data : ${JSON.stringify(payload)}\n`);
    return;
  }

  try {
    await producer.send({
      topic: 'task-events',
      messages: [
        {
          key: eventType,
          value: JSON.stringify({ eventType, data: payload, timestamp: new Date().toISOString() }),
        },
      ],
    });
    console.log(`📢 [KAFKA EVENT SENT] Topic: task-events | Event: ${eventType}`);
  } catch (err: any) {
    console.error('Failed to publish Kafka event:', err.message);
  }
}