export class NumberStore {
    private store: { [key: string]: number[] } = {
        'p': [],
        'f': [],
        'e': [],
        'r': []
    };

    private windowSize: number;

    constructor(windowSize: number) {
        this.windowSize = windowSize;
    }

    getNumbers(type: string): number[] {
        return this.store[type] || [];
    }

    updateNumbers(type: string, newNumbers: number[]): void {
        this.store[type] = [...this.store[type], ...newNumbers].slice(-this.windowSize);
    }

    getPreviousState(type: string): number[] {
        return [...this.store[type]];
    }

    calculateAverage(type: string): number {
        const numbers = this.store[type];
        if (numbers.length === 0) return 0;
        return parseFloat((numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2));
    }
} 