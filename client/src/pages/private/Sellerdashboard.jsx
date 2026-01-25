import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../../hooks/useAPI';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SellerDashboard = ({ onLogout }) => {
    const { callApi, loading } = useApi();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await callApi('GET', '/api/products');
            setProducts(res.data);
        } catch (error) {
            toast.error('Failed to fetch products.');
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' && data.image[0]) {
                formData.append('image', data.image[0]);
            } else if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        try {
            if (editingProduct) {
                await callApi('PUT', `/api/products/${editingProduct.id}`, formData);
                toast.success('Product updated successfully!');
            } else {
                await callApi('POST', '/api/products', formData);
                toast.success('Product added successfully!');
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            toast.error(`Failed to ${editingProduct ? 'update' : 'add'} product.`);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await callApi('DELETE', `/api/products/${productId}`);
                toast.info('Product deleted.');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product.');
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('category', product.category);
        setValue('description', product.description);
        setValue('rating', product.rating);
    };

    const resetForm = () => {
        reset();
        setEditingProduct(null);
    };

    return (
        <>
            <Header onLogout={onLogout} hideSearch={true} />
            <main className="max-w-7xl mx-auto px-6 py-10 mt-20 min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input {...register('name')} placeholder="Product Name" className="input w-full" required />
                        <input {...register('price')} type="number" step="0.01" placeholder="Price" className="input w-full" required />
                        <input {...register('category')} placeholder="Category" className="input w-full" required />
                        <textarea {...register('description')} placeholder="Description" className="input w-full" />
                        <input {...register('rating')} type="number" step="0.1" placeholder="Rating (0-5)" className="input w-full" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Image</label>
                            <input {...register('image')} type="file" className="mt-1" />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            {editingProduct && <button type="button" onClick={resetForm} className="bg-gray-200 px-6 py-2 rounded-lg font-bold hover:bg-gray-300">Cancel Edit</button>}
                        </div>
                    </form>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
                    {loading && <p>Loading products...</p>}
                    <div className="space-y-4">
                        {products.map(product => (<div key={product.id} className="flex items-center justify-between p-4 border rounded-lg"><div><p className="font-bold">{product.name}</p><p>Rs. {product.price} | Category: {product.category}</p></div><div className="flex gap-4"><button onClick={() => handleEdit(product)} className="text-blue-600 font-semibold">Edit</button><button onClick={() => handleDelete(product.id)} className="text-red-600 font-semibold">Delete</button></div></div>))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SellerDashboard;