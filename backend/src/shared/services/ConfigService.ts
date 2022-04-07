
export class ConfigService {
    constructor() {
        const environment = this.nodeEnv;
    }

    public get(key: string): string | undefined {
        return process.env[key]
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development'
    }
}