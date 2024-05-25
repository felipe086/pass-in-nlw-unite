import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { BadRequest } from "./_errors/bad-request"

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId",
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              details: z.string().nullable(),
              slug: z.string(),
              maximumAttendees: z.number().int().nullable(),
              attendeesMount: z.number().int(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params

      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
      })

      if (!event) throw new BadRequest("Event not found")

      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          details: event.details,
          slug: event.slug,
          maximumAttendees: event.maximumAttendees,
          attendeesMount: event._count.attendees,
        },
      })
    }
  )
}
