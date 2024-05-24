import fastify, { errorCodes } from "fastify"
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

  const slug = generateSlug(title)

  const eventWithSameSlug = await prisma.event.findUnique({
    where: {
      slug,
    },
  })

  if (eventWithSameSlug)
    throw new Error("Another event with same title already exists.")

  const event = await prisma.event.create({
    data: {
      title,
      details,
      slug,
      maximumAttendees,
    },
  })

  return reply.status(201).send({ eventId: event.id })
})

app
  .listen({ port: PORT })
  .then(() => console.log(`Server running on http://localhost:${PORT}`))
  .catch((error) => console.error("Error starting server:", error))
