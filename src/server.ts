import { app } from "./app";
import { env } from "./config/env";
import { registerRoutes } from "./routes";

const start = async () => {
  registerRoutes(app);

  await app.listen({
    port: env.PORT,
    host: "0.0.0.0"
  });

  console.log(`🚀 Wally running on port ${env.PORT}`);
};

start();
