export type PincodeResult = {
  ok: boolean;
  city?: string;
  etaDays?: number;
  cod?: boolean;
  message: string;
};

// Demo serviceability logic — swap for a Shiprocket/Delhivery API call later.
export function checkPincode(pin: string): PincodeResult {
  if (!/^\d{6}$/.test(pin)) {
    return { ok: false, message: "Enter a valid 6-digit PIN code." };
  }
  const n = Number(pin);
  const zone = Math.floor(n / 100000);
  const cities: Record<number, string> = {
    1: "Delhi NCR",
    2: "Uttar Pradesh",
    3: "Gujarat & Rajasthan",
    4: "Maharashtra",
    5: "Telangana & Karnataka",
    6: "Tamil Nadu & Kerala",
    7: "West Bengal & North East",
    8: "Bihar & Jharkhand",
    9: "APO / Field Post",
  };
  if (zone === 9) {
    return { ok: false, message: "We can't deliver to field post offices yet." };
  }
  const etaDays = zone === 3 ? 2 : zone <= 5 ? 4 : 6;
  const cod = n % 7 !== 0;
  return {
    ok: true,
    city: cities[zone] ?? "India",
    etaDays,
    cod,
    message: cod
      ? `Delivers to ${cities[zone]} in ${etaDays}–${etaDays + 2} days. Cash on Delivery available.`
      : `Delivers to ${cities[zone]} in ${etaDays}–${etaDays + 2} days. Prepaid only on this PIN.`,
  };
}

export const COD_LIMIT = 5000;
