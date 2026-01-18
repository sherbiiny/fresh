import z from 'zod';

export const customerFilterSchema = z.object({
  search: z.string().optional(),
});

export type CustomerFilterSchema = z.infer<typeof customerFilterSchema>;
