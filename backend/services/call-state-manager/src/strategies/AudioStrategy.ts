import { MediaStrategy } from "./MediaStrategy"

export class AudioStrategy implements MediaStrategy {

  getType(): string {
    return "AUDIO"
  }

}