import { pubClient } from ".";

export const publishEvent = async (event: string, payload: any) => {
  await pubClient.publish(event, JSON.stringify(payload));
};
