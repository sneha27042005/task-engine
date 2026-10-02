import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { startGrpcServer } from './grpc/server';
import { connectProducer } from './kafka/producer';
import { startKafkaConsumer } from './kafka/consumer';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  console.log('🚀 Booting Task Engine Distributed Microservice System...\n');

  // 1. Start gRPC Microservice Server
  startGrpcServer();

  // 2. Initialize Apache Kafka Producer & Consumer
  await connectProducer();
  await startKafkaConsumer();

  // 3. Start GraphQL Server
  const PORT = Number(process.env.PORT) || 3000;
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT, host: '0.0.0.0' },
  });

  console.log(`\n✅ GraphQL Gateway running at: ${url}`);
  console.log(`🎯 All 5 core technologies (TypeScript, Docker, GraphQL, gRPC, Kafka) initialized!\n`);
}

start().catch((err) => {
  console.error('Fatal initialization error:', err);
});