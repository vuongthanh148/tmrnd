function convertObject(obj: object, keyConverter: (arg: string) => string): object {
    if (obj === null || typeof obj === 'undefined' || typeof obj !== 'object') {
        return obj;
    }

    const out = (Array.isArray(obj) ? [] : {});
    for (const [k, v] of Object.entries(obj)) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        out[keyConverter(k)] = Array.isArray(v)
            ? (v.map(<ArrayItem extends object>(item: ArrayItem) =>
                typeof item === 'object' && !Buffer.isBuffer(item)
                    ? convertObject(item, keyConverter)
                    : item,
            ) as unknown[])
            : Buffer.isBuffer(v)
                ? v
                : typeof v === 'object'
                    ? convertObject(v, keyConverter)
                    : (v as unknown);
    }
    return out;
}

export function toSnake(term: string): string {
    let result: string = term;
    let circuitBreaker = 0;

    while (
        (/([a-z])([0-9])/.exec(result)?.length || 0) > 2 &&
        circuitBreaker < 10
    ) {
        result = result.replace(
            /([a-z])([0-9])/,
            (_all, $1: string, $2: string) =>
                `${$1.toLowerCase()}_${$2.toLowerCase()}`,
        );

        circuitBreaker += 1;
    }

    while (
        (/(.+?)([A-Z])/.exec(result)?.length || 0) > 2 &&
        circuitBreaker < 10
    ) {
        result = result.replace(
            /(.+?)([A-Z])/,
            (_all, $1: string, $2: string) =>
                `${$1.toLowerCase()}_${$2.toLowerCase()}`,
        );
        circuitBreaker += 1;
    }

    return result.toLowerCase();
}

export function objectToSnake(obj: object): object {
    return convertObject(obj, toSnake);
}