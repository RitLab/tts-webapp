export function withTimeout(task, timeoutMs) {
    return Promise.race([
        task(), // The task function that returns a Promise
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout exceeded")), timeoutMs)
        ),
    ]);
}