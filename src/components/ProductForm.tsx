import { useState } from 'react';
import type { Product } from '../types/Product';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

interface FormData {
  title: string;
  price: string;
  image: string;
  category: string;
}

interface FormErrors {
  title?: string;
  price?: string;
  image?: string;
}

function ProductForm({ onAddProduct }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    image: '',
    category: "men's clothing",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product name is required.';
    }

    const price = Number(formData.price);

    if (!formData.price) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(price) || price <= 0) {
      newErrors.price = 'Price must be a positive number.';
    }

    try {
      new URL(formData.image);

      if (!/^https?:\/\/.+/i.test(formData.image)) {
        newErrors.image = 'Please enter a valid image URL.';
      }
    } catch {
      newErrors.image = 'Please enter a valid image URL.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: formData.title.trim(),
      price: Number(formData.price),
      image: formData.image,
      category: formData.category,
      rating: {
        rate: 0,
        count: 0,
      },
    };

    onAddProduct(newProduct);

    setFormData({
      title: '',
      price: '',
      image: '',
      category: "men's clothing",
    });

    setErrors({});
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="card-title mb-4">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Product
        </h4>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Product Name
              </label>

              <input
                id="title"
                name="title"
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''
                  }`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product name"
              />

              {errors.title && (
                <div className="invalid-feedback">
                  {errors.title}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>

              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className={`form-control ${errors.price ? 'is-invalid' : ''
                  }`}
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />

              {errors.price && (
                <div className="invalid-feedback">
                  {errors.price}
                </div>
              )}
            </div>

            <div className="col-md-8">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                className={`form-control ${errors.image ? 'is-invalid' : ''
                  }`}
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              {errors.image && (
                <div className="invalid-feedback">
                  {errors.image}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label htmlFor="category" className="form-label">
                Category
              </label>

              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="men's clothing">
                  Men's Clothing
                </option>
                <option value="women's clothing">
                  Women's Clothing
                </option>
                <option value="jewelery">
                  Jewelry
                </option>
                <option value="electronics">
                  Electronics
                </option>
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-plus-lg me-2"></i>
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
