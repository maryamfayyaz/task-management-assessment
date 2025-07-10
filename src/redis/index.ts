import { createClient } from "redis";

const pubClient = createClient({ url: process.env.REDIS_URL });
pubClient.connect();

const subClient = createClient({ url: process.env.REDIS_URL });
subClient.connect();

subClient.subscribe('task_created', (msg) => {
  console.log('Task created:', JSON.parse(msg));
});

subClient.subscribe('task_completed', (msg) => {
  console.log('Task completed:', JSON.parse(msg));
});


export { pubClient };
