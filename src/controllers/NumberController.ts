import { Request, Response } from 'express';
import { NumberStore } from '../models/NumberStore';
import { NumberService } from '../services/NumberService';

export class NumberController {
    private numberStore: NumberStore;
    private numberService: NumberService;

    constructor(numberStore: NumberStore, numberService: NumberService) {
        this.numberStore = numberStore;
        this.numberService = numberService;
    }

    async getNumbers(req: Request, res: Response): Promise<void> {
        const numberId = req.params.id;

        if (!['p', 'f', 'e', 'r'].includes(numberId)) {
            res.status(400).json({ error: 'Invalid number ID. Must be p, f, e, or r' });
            return;
        }

        try {
            const newNumbers = await this.numberService.fetchNumbers(numberId);
            const windowPrevState = this.numberStore.getPreviousState(numberId);
            
            this.numberStore.updateNumbers(numberId, newNumbers);
            
            const responseData = {
                windowPrevState,
                windowCurrState: this.numberStore.getNumbers(numberId),
                numbers: newNumbers,
                avg: this.numberStore.calculateAverage(numberId)
            };

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(responseData);
        } catch (error) {
            console.error('Error fetching numbers:', error);
            res.status(500).json({ error: 'Failed to fetch numbers from third-party service' });
        }
    }
} 