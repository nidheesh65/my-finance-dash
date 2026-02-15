export const Charts = {
    growth: null,
    initGrowth(ctx) {
        this.growth = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Portfolio Value', data: [], borderColor: '#22c55e', fill: true, backgroundColor: 'rgba(34, 197, 94, 0.1)' }] },
            options: { scales: { y: { ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } } }
        });
    },
    update(labels, data) {
        this.growth.data.labels = labels;
        this.growth.data.datasets[0].data = data;
        this.growth.update();
    }
};
