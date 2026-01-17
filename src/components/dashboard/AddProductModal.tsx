import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { addProductMutation } from "@/api/mutations";
import { queryClient } from "@/api/queryClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addProductSchema, type AddProductSchema } from '@/schemas/products';

import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      image: '',
    },
  });

  const { mutate: addProduct, isPending } = useMutation({
    ...addProductMutation(),
    onSuccess: () => {
      toast.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onOpenChange(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product by filling in the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(data => addProduct(data))}>
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
                      <Textarea id="description" {...field} placeholder="Enter product description" required rows={6} />
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
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
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
                        <Input id="quantity" {...field} type="number" min="0" placeholder="0" required />
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
                      <Input id="image" {...field} type="url" placeholder="https://example.com/image.jpg" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </>
                  )}
                />
              </FieldContent>
            </Field>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : 'Create Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
