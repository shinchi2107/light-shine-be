import { z, ZodError } from 'zod';
export function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))
                res.status(400).sendData({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(500).sendData({ error: 'Internal Server Error' });
            }
        }
    };
}