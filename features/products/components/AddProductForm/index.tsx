'use client';

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dropdown, Input, Button, Label } from '@/shared/components/ui';
import SizeDisplayCheckbox from '../SizeDisplayCheckbox';
import { Box } from '@mui/material';
import { createProduct } from '@/app/api/products';
import { useAllOptions } from '@/shared/hooks/useAllOptions';
import type { AddProductFormProps } from '../../types';

const AddProductForm = ({ images }: AddProductFormProps) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data } = useAllOptions();

  const { colors, genders, brands, categories, sizes } = data || {};

  useEffect(() => {
    if (colors?.length) setSelectedColor(colors[0].value);
    if (genders?.length) setSelectedGender(genders[0].value);
    if (brands?.length) setSelectedBrand(brands[0].value);
    if (categories?.length) setSelectedCategory(categories[0].value);
  }, [colors, genders, brands, categories]);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log('Product created: ', data);
    },
    onError: (error) => {
      console.error('Product creation failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: productName,
      images,
      description: productDescription,
      brand: selectedBrand,
      color: selectedColor,
      gender: selectedGender,
      sizes: selectedSizes,
      price: productPrice,
      categories: selectedCategory,
      userID: '1382',
      teamName: 'team-5',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '436px',
      }}
    >
      <Box
        gap={1}
        display='flex'
        flexDirection='column'
        mb={4}
        sx={{ gap: '24px' }}
      >
        <Input
          title='Product name'
          id='product-name'
          placeholder='Nike Air Max 90'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <Input
          title='Price'
          id='price'
          placeholder='$160'
          type='number'
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Dropdown
            id='color'
            title='Color'
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            options={colors || []}
          />
          <Dropdown
            id='categorie'
            title='Categorie'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={categories || []}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Dropdown
            id='gender'
            title='Gender'
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            options={genders || []}
          />
          <Dropdown
            id='brand'
            title='Brand'
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            options={brands || []}
          />
        </Box>
        <Input
          title='Description'
          id='product-description'
          placeholder='You description of the prpoduct...'
          multiline
          rows={10}
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
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
                  setSelectedSizes={setSelectedSizes}
                />
              );
            })}
          </Box>
        </Box>
        <Button type='submit' size='medium' disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </form>
  );
};

export default AddProductForm;
