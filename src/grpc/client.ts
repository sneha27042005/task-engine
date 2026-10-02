import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(process.cwd(), 'src/proto/notification.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

export const grpcClient = new protoDescriptor.notification.NotificationService(
  process.env.GRPC_SERVER || 'localhost:50051',
  grpc.credentials.createInsecure()
);

export function notifyGrpcService(taskId: string, title: string, action: string) {
  return new Promise((resolve) => {
    grpcClient.SendTaskNotification(
      { taskId, title, action },
      (err: any, response: any) => {
        if (err) {
          console.error('❌ gRPC Call Failed:', err.message);
          resolve(null);
        } else {
          console.log('✅ gRPC Call Response:', response.message);
          resolve(response);
        }
      }
    );
  });
}