export class StripeEventParseError extends Error {
    constructor() {
        super('Error while parsing incoming stripe payment event');
    }
}
