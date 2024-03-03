export function copyObject(source: any, target: any): void {
    if (source && target) {
        Object.keys(target).forEach(key => {
        if (source[key] !== undefined) {
            target[key] = source[key];
        }
        });
    }
}
