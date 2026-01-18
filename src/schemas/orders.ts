import z from 'zod';

export const orderFilterSchema = z.object({
  search: z.string().optional(),
  status: z.union([z.enum(['pending', 'completed', 'cancelled']), z.literal('all')]).optional(),
});

export type OrderFilterSchema = z.infer<typeof orderFilterSchema>;
