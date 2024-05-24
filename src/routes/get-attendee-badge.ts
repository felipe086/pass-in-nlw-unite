import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { number, z } from "zod"
import { prisma } from "../lib/prisma"

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
          // attendeeId: z.string().transform(Number),
        }),
        response: {
          200: z.object({
            name: z.string(),
            email: z.string().email(),
            event: z.object({
              title: z.string(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { attendeeId } = req.params

      const attendee = await prisma.attendee.findUnique({
        where: {
          id: attendeeId,
        },
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      })

      if (!attendee) throw new Error("Attendee not found.")

      return reply.send(attendee)
    }
  )
}
