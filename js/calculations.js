export const Finance = {
    getSWR: (nw, rate) => ({ monthly: (nw * rate * 0.04) / 12, annual: (nw * rate * 0.04) }),
    getFV: (m, r, y) => {
        const rate = (r / 100) / 12;
        return m * ((Math.pow(1 + rate, y * 12) - 1) / rate);
    }
};
