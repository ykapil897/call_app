import { AppInstance }
  from "../types/express";

export function healthRoute(
  app: AppInstance
) {

  app.get(
    "/health",
    async (_req, res) => {

      res.send({
        status: "UP"
      });

    }
  );

}