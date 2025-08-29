'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown, Input, Label } from '@/shared/components/ui';
import SizeDisplayCheckbox from '../SizeDisplayCheckbox';
import { Box } from '@mui/material';
import { useAllOptions } from '@/shared/hooks/useAllOptions';
import type { AddProductFormProps, ImageData } from '../../types';
import { productSchema } from '../../schemas/product.schema';
import type { ProductSchemaType } from '../../types';
import { useProductMutation } from '../../hooks/useProductMutation';
import { adaptProductForEdit } from '../EditProductContent/EditProduct.adapter';

const AddProductForm = ({
  images,
  setImagesError,
  setImages,
  mode = 'create',
  initialData,
  formId,
  onLoadingChange,
  productId,
  onClose,
}: AddProductFormProps) => {
  const { data } = useAllOptions();
  const { colors, genders, brands, categories, sizes } = data || {};
  const { mutateProduct, isPending } = useProductMutation(
    mode,
    productId,
    onClose,
    resetAddForm,
  );
  const [initialImages, setInitialImages] = useState<ImageData[]>([]);

  const productForm = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: undefined,
      description: '',
      color: '',
      gender: '',
      brand: '',
      categories: '',
      sizes: [],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = productForm;

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isPending);
    }
  }, [isPending, onLoadingChange]);

  useEffect(() => {
    if (!colors || !genders || !brands || !categories) return;

    if (initialData) {
      const adaptedProduct = adaptProductForEdit(initialData);
      productForm.reset(adaptedProduct);
      setInitialImages(adaptedProduct.images);
      setImages(adaptedProduct.images);
    } else {
      reset({
        name: '',
        price: undefined,
        description: '',
        color: colors[0]?.value || '',
        gender: genders[0]?.value || '',
        brand: brands[0]?.value || '',
        categories: categories[0]?.value || '',
        sizes: [],
      });
    }
  }, [colors, genders, brands, categories, initialData, reset, setImages]);

  const onSubmit = (data: ProductSchemaType) => {
    if (images.length === 0) {
      setImagesError('Please upload at least one image');
      return;
    }
    const deletedImageIds = initialImages.reduce<number[]>((acc, img) => {
      if (img.id && !images.some((image) => image.id === img.id)) {
        acc.push(img.id);
      }
      return acc;
    }, []);

    mutateProduct({ ...data, images, deletedImageIds });
  };

  function resetAddForm() {
    reset();
    setImages([]);
  }

  const selectedSizes = watch('sizes') || [];

  const toggleSize = (sizeValue: string) => {
    const updatedSizes = selectedSizes.includes(sizeValue)
      ? selectedSizes.filter((s: string) => s !== sizeValue)
      : [...selectedSizes, sizeValue];
    setValue('sizes', updatedSizes);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '100%',
        maxWidth: '436px',
      }}
    >
      <Box display='flex' flexDirection='column' mb={4} gap={4}>
        <Input
          title='Product name'
          aria-label='Product name'
          id='product-name'
          placeholder='Nike Air Max 90'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Input
          title='Price'
          aria-label='Price'
          id='price'
          type='number'
          onKeyDown={(e) => {
            if (['-', 'e', '+'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onWheel={(e) => {
            (e.target as HTMLElement).blur();
          }}
          slotProps={{
            input: {
              startAdornment: (
                <span style={{ color: '#5C5C5C', fontSize: '15px' }}>$</span>
              ),
            },
            htmlInput: { step: '0.001' },
          }}
          {...register('price', { valueAsNumber: true })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Dropdown
            id='color'
            title='Color'
            aria-label='Color'
            value={watch('color')}
            onChange={(e) => setValue('color', e.target.value)}
            options={colors || []}
            error={!!errors.color}
            helperText={errors.color?.message}
          />
          <Dropdown
            id='category'
            title='Category'
            aria-label='Category'
            value={watch('categories')}
            onChange={(e) => setValue('categories', e.target.value)}
            options={categories || []}
            error={!!errors.categories}
            helperText={errors.categories?.message}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Dropdown
            id='gender'
            title='Gender'
            aria-label='Gender'
            value={watch('gender')}
            onChange={(e) => setValue('gender', e.target.value)}
            options={genders || []}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          />
          <Dropdown
            id='brand'
            title='Brand'
            aria-label='Brand'
            value={watch('brand')}
            onChange={(e) => setValue('brand', e.target.value)}
            options={brands || []}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
        </Box>
        <Input
          title='Description'
          aria-label='Description'
          id='product-description'
          placeholder='Your description of the product...'
          multiline
          rows={10}
          maxLength={300}
          {...register('description')}
          value={watch('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Box>
          <Label id='sizes'>Add size</Label>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {(sizes || []).map((size: { value: string; label: string }) => {
              const isChecked = selectedSizes.includes(size.value);
              return (
                <SizeDisplayCheckbox
                  key={size.value}
                  size={size}
                  isChecked={isChecked}
                  setSelectedSizes={() => toggleSize(size.value)}
                />
              );
            })}
          </Box>
          {errors.sizes && (
            <p style={{ color: 'red' }}>{errors.sizes.message}</p>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default AddProductForm;
