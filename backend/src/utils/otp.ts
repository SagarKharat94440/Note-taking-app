// Simple OTP store (for production use a DB or Redis)
const otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

export function saveOTP(email: string, otp: string, mins = 10) {
  const expiresAt = Date.now() + mins * 60 * 1000;
  otpStore.set(email, { otp, expiresAt });
}

export function verifyOTP(email: string, otp: string): boolean {
  const rec = otpStore.get(email);
  if (!rec) return false;
  if (Date.now() > rec.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  if (rec.otp !== otp) return false;
  otpStore.delete(email);
  return true;
}
