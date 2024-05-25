import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event"
import { registerForEvent } from "./routes/register-for-event"
import { getEvent } from "./routes/get-event"
import { getAttendeeBadge } from "./routes/get-attendee-badge"
import { checkIn } from "./routes/check-in"
import { getEventAttendees } from "./routes/get-event-attendees"
import { errorHandler } from "./error-handler"
const PORT = 3333

const app = fastify()

app.register(fastifyCors, {
  origin: "*",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`Server running on http://localhost:${PORT}`))
  .catch((error) => console.error("Error starting server:", error))
