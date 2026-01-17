import z from "zod";


export const addProductSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price is required'),
  quantity: z.coerce.number().min(0, 'Quantity is required'),
  image: z.string().url('Image must be a valid URL'),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;