import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import config from "../configuration.json"
import fastifyStatic from "fastify-static"
import { Server, IncomingMessage, ServerResponse } from 'http'
import path from "path"
import * as fs from "fs"
import * as f from "./helper/timeFormat"
  
const logPath=path.resolve(__dirname,"..",'log',f.currentDate)
const publicPath = "/../"+config.publicPath;
const staticPath = path.resolve(__dirname, "..", config.publicPath)



const writeStream = fs.createWriteStream(logPath, {flags: 'w+'});



const fastify: FastifyInstance = Fastify({
  logger:{
    level: 'info', 
    stream:writeStream,  
  }
})





const opts: RouteShorthandOptions = {

  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}
fastify.register(fastifyStatic, {
  root: staticPath,
  prefix: publicPath,
  // prefixAvoidTrailingSlash:true
});
fastify.get('/', opts, async (request, reply) => 
  await reply.sendFile("index.html"));


 
  // server.register(require('./routes/user'), { logLevel: 'warn' })
  // server.register(require('./routes/events'), { logLevel: 'debug' })

  export const start = async () => {
  try {
    await fastify.listen(config.port)

    const address = fastify.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log("server starting "+config.address+":"+port)
    fastify.log.error("server starting "+config.address+":"+port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
    console.log("server stop")
  }
}


