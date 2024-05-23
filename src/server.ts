import fastify from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"
import { generateSlug } from "./utils/generate-slug"
const PORT = 3333

const app = fastify()

app.post("/events", async (req, reply) => {
  const requestBodySchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })
  const { title, details, maximumAttendees } = requestBodySchema.parse(req.body)

  const event = await prisma.event.create({
    data: {
      title,
      details,
      slug: generateSlug(title),
      maximumAttendees,
    },
  })

  return reply.status(201).send({ eventId: event.id })
})

app
  .listen({ port: PORT })
  .then(() => console.log(`Server running on http://localhost:${PORT}`))
  .catch((error) => console.error("Error starting server:", error))
