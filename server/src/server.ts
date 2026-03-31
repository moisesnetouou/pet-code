import "dotenv/config";
import { buildApp } from "./app.js";

const start = async () => {
  const port = Number(process.env.PORT) || 3333;

  const app = await buildApp();

  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`\n🚀 Server running at http://localhost:${port}`);
    console.log(`📚 Swagger UI: http://localhost:${port}/docs`);
    console.log(`📖 Scalar Docs: http://localhost:${port}/scalar\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
