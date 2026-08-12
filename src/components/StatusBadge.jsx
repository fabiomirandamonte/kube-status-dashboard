import React from "react";

export function StatusBadge({ status }) {
    const styles = {
        Healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Failing: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };

    const dots = {
        Healthy: 'bg-emerald-400',
        Warning: 'bg-amber-400 animate-ping',
        Failing: 'bg-rose-400 animate-pulse',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
            {status}
        </span>
    );
}