import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

export function setupSwagger(app: Application) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3000/api/v1' }],
    },
    apis: ['./src/routes/*.ts'], // Update path if needed
  };

  try {
    const swaggerSpec = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  } catch (err) {
    console.error("Swagger setup error:", err); // ✅ print the cause
    throw err;
  }
}
