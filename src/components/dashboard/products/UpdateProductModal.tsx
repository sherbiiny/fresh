import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateProductMutation } from '@/api/dashboard/mutations';
import { queryClient } from '@/api/queryClient';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { addProductSchema, type AddProductSchema } from '@/schemas/products';

import type { Product } from '@/types';

type UpdateProductModalProps = {
  setEditingProduct: (product: Product | null) => void;
  editingProduct: Product | null;
};

export function UpdateProductModal({ setEditingProduct, editingProduct }: UpdateProductModalProps) {
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      category: 'fruit',
      image: '',
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        category: editingProduct.category,
        image: editingProduct.image || '',
      });
    }
  }, [editingProduct, form]);

  const { mutate: updateProduct, isPending } = useMutation({
    ...updateProductMutation(),
    onSuccess: () => {
      toast.success('Product updated successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
      form.reset();
    },
  });

  const handleSubmit = (data: AddProductSchema) => {
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, ...data });
    }
  };

  return (
    <Dialog open={editingProduct !== null} onOpenChange={() => setEditingProduct(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>Update the product details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel htmlFor="title">
                Product Title <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <>
                      <Input id="title" {...field} placeholder="Enter product title" required />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </>
                  )}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="description">
                Description <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <>
                      <Textarea
                        id="description"
                        {...field}
                        placeholder="Enter product description"
                        required
                        rows={6}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </>
                  )}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>
                Category <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="fruit" id="category-fruit" />
                          <Label htmlFor="category-fruit" className="cursor-pointer">
                            Fruit
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="vegetable" id="category-vegetable" />
                          <Label htmlFor="category-vegetable" className="cursor-pointer">
                            Vegetable
                          </Label>
                        </div>
                      </RadioGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </>
                  )}
                />
              </FieldContent>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Controller
                      control={form.control}
                      name="price"
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            id="price"
                            {...field}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="pl-7"
                            required
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </>
                      )}
                    />
                  </div>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">
                  Quantity <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={form.control}
                    name="quantity"
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          id="quantity"
                          {...field}
                          type="number"
                          min="0"
                          placeholder="0"
                          required
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </>
                    )}
                  />
                </FieldContent>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="image"
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        id="image"
                        {...field}
                        type="url"
                        placeholder="https://example.com/image.jpg"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </>
                  )}
                />
              </FieldContent>
            </Field>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : 'Update Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
