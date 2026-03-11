import ESL from "modesl"
import { freeswitchConfig } from "../config/freeswitch.config"

let connection: any = null

export async function getFreeSwitchConnection(): Promise<any> {

  if (connection) return connection

  return new Promise((resolve, reject) => {

    connection = new ESL.Connection(
      freeswitchConfig.host,
      freeswitchConfig.port,
      freeswitchConfig.password,
      () => {

        console.log("Connected to FreeSWITCH ESL")

        resolve(connection)

      }
    )

    connection.on("error", reject)

  })

}