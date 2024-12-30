import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class ThrottlerRateLimitGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    return super.getTracker(req);
  }
}
