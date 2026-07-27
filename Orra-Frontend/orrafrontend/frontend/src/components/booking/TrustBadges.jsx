import { Lock, CheckCircle2, ShieldCheck } from "lucide-react";

const TrustBadges = () => (
  <div className="transaction-detail flex flex-col gap-3 pt-3">
    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
      <Lock className="w-4 h-4 text-slate-400 shrink-0" /><span>Secure 256-bit encrypted payment</span>
    </div>
    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
      <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /><span>You won't be charged until accepted</span>
    </div>
    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
      <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" /><span>Full refund cancellation protection</span>
    </div>
  </div>
);

export default TrustBadges;