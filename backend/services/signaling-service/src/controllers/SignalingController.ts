export class SignalingController {

  static async status() {

    return {
      success: true,
      data: {
        service: "signaling-service"
      },
      meta: {
        serverTime: Date.now()
      }
    };

  }

}