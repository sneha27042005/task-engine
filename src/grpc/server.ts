import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Load .proto file
const PROTO_PATH = path.join(process.cwd(), 'src/proto/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const notificationProto = protoDescriptor.notification;

// Implementation of the RPC method
function sendTaskNotification(call: any, callback: any) {
  const { taskId, title, action } = call.request;
  
  console.log(`\n🔔 [gRPC SERVER RECEIVED NOTIFICATION]`);
  console.log(`   Task ID : ${taskId}`);
  console.log(`   Title   : "${title}"`);
  console.log(`   Action  : ${action}\n`);

  callback(null, {
    success: true,
    message: `Notification logged successfully for Task #${taskId}`,
  });
}

// Start gRPC Server
export function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(notificationProto.NotificationService.service, {
    SendTaskNotification: sendTaskNotification,
  });

  const GRPC_PORT = '0.0.0.0:50051';
  server.bindAsync(GRPC_PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Failed to bind gRPC server:', err);
      return;
    }
    console.log(`⚡ gRPC Notification Service running at 127.0.0.1:${port}`);
  });
}