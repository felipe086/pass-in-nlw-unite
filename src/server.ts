import fastify from "fastify"

const app = fastify()
const PORT = 3333

app.get("/", (req, reply) => {
  return reply.send({ message: "Hi" })
})

app
  .listen({ port: PORT })
  .then(() => console.log(`Server running on http://localhost:${PORT}`))
  .catch((error) => console.error("Error starting server:", error))
