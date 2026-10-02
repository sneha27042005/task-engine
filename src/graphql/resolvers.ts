import { Task, CreateTaskInput } from '../types';
import { notifyGrpcService } from '../grpc/client';
import { publishTaskEvent } from '../kafka/producer';

export let tasksStore: Task[] = [
  {
    id: '1',
    title: 'Learn Full Distributed Stack',
    description: 'TypeScript, Docker, GraphQL, gRPC & Kafka',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
];

export const resolvers = {
  Query: {
    health: () => 'GraphQL Server is healthy!',
    tasks: () => tasksStore,
    task: (_: any, args: { id: string }) => {
      return tasksStore.find((t) => t.id === args.id) || null;
    },
  },

  Mutation: {
    createTask: async (_: any, args: CreateTaskInput) => {
      const newTask: Task = {
        id: (tasksStore.length + 1).toString(),
        title: args.title,
        description: args.description,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };

      tasksStore.push(newTask);

      // ⚡ 1. Trigger gRPC Microservice Call
      await notifyGrpcService(newTask.id, newTask.title, 'TASK_CREATED');

      // 📢 2. Publish Event to Apache Kafka Stream
      await publishTaskEvent('TASK_CREATED', newTask);

      return newTask;
    },

    updateTaskStatus: async (_: any, args: { id: string; status: Task['status'] }) => {
      const task = tasksStore.find((t) => t.id === args.id);
      if (task) {
        task.status = args.status;

        // ⚡ 1. gRPC Call
        await notifyGrpcService(task.id, task.title, `STATUS_UPDATED_${args.status}`);

        // 📢 2. Kafka Event
        await publishTaskEvent('TASK_STATUS_UPDATED', task);
      }
      return task || null;
    },
  },
};