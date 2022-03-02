import { swaggerConfig, fastify, sessionOption } from './configs';
import fastifySwagger from 'fastify-swagger';
import fastifySession from '@fastify/session';
import fastifyCookie from 'fastify-cookie';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection, getConnectionOptions } from 'typeorm';
import { RestaurantsRoute } from './routes/restaurants.route';

dotenv.config();

// server configurations
fastify.register(fastifySwagger, swaggerConfig);
fastify.register(fastifyCookie);
fastify.register(fastifySession, sessionOption);

// server plugins and routes
fastify.register(RestaurantsRoute);

const start = async () => {
  try {
    // Setting up DB connection
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);
    fastify.log.info('Database connected: ' + connection.name);

    await fastify.listen(process.env.PORT || 7000);
    fastify.log.info('Server started successfully');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
