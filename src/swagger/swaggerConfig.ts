import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Task Manager system',
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'), // ✅ correct relative path
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
