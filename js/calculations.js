export const Finance = {
    getSWR: (nw, rate) => ({ 
        monthly: (nw * rate * 0.04) / 12, 
        annual: (nw * rate * 0.04) 
    }),

    getFV: (startBalance, monthly, annualRate, years) => {
        const r = (annualRate / 100) / 12;
        const n = years * 12;
        
        if (r === 0) return startBalance + (monthly * n);

        // FV = [PV * (1+r)^n] + [PMT * ((1+r)^n - 1) / r]
        const fvPrincipal = startBalance * Math.pow(1 + r, n);
        const fvContributions = monthly * ((Math.pow(1 + r, n) - 1) / r);
        
        return fvPrincipal + fvContributions;
    }
};
