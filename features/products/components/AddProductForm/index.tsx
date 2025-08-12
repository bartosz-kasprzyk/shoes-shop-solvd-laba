'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Dropdown, Input, Button, Label } from '@/shared/components/ui';
import SizeDisplayCheckbox from '../SizeDisplayCheckbox';
import { Box } from '@mui/material';
import { createProduct } from '@/app/api/products';
import { useAllOptions } from '@/shared/hooks/useAllOptions';
import type { AddProductFormProps } from '../../types';
import { productSchema } from '../../schemas/product.schema';
import type { Product } from '../../types';

const AddProductForm = ({
  images,
  setImagesError,
  setImages,
}: AddProductFormProps) => {
  const { data } = useAllOptions();
  const { colors, genders, brands, categories, sizes } = data || {};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Product>({
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

  useEffect(() => {
    if (colors && genders && brands && categories) {
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
  }, [colors, genders, brands, categories, reset]);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log('Product created: ', data);
      reset();
      setImages([]);
    },
    onError: (error) => {
      console.error('Product creation failed:', error);
    },
  });

  const onSubmit = (data: Product) => {
    if (images.length === 0) {
      setImagesError('Please upload at least one image');
      return;
    }
    mutation.mutate({
      ...data,
      images: images,
      userID: '1382',
      teamName: 'team-5',
    });
  };

  const selectedSizes = watch('sizes');

  const toggleSize = (sizeValue: string) => {
    const updatedSizes = selectedSizes.includes(sizeValue)
      ? selectedSizes.filter((s) => s !== sizeValue)
      : [...selectedSizes, sizeValue];
    setValue('sizes', updatedSizes);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '100%',
        maxWidth: '436px',
      }}
    >
      <Box display='flex' flexDirection='column' mb={4} gap={4}>
        <Input
          title='Product name'
          id='product-name'
          placeholder='Nike Air Max 90'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Input
          title='Price'
          id='price'
          type='number'
          onKeyDown={(e) => {
            if (['-', 'e', '+'].includes(e.key)) {
              e.preventDefault();
            }
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
            value={watch('color')}
            onChange={(e) => setValue('color', e.target.value)}
            options={colors || []}
            error={!!errors.color}
            helperText={errors.color?.message}
          />
          <Dropdown
            id='category'
            title='Category'
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
            value={watch('gender')}
            onChange={(e) => setValue('gender', e.target.value)}
            options={genders || []}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          />
          <Dropdown
            id='brand'
            title='Brand'
            value={watch('brand')}
            onChange={(e) => setValue('brand', e.target.value)}
            options={brands || []}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
        </Box>
        <Input
          title='Description'
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
        <Button type='submit' size='medium' disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </form>
  );
};

export default AddProductForm;
