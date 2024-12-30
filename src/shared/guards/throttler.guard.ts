import { Injectable, Logger } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerRequest } from "@nestjs/throttler";

@Injectable()
export class ThrottlerRateLimitGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    const trackerKey = req.user?.email ? `email-${req.user.email}` : req.ip;
    Logger.log(`Throttler Rate Limit Guard: ${trackerKey}`, "ThrottlerGuard");
    return trackerKey;
  }
}
