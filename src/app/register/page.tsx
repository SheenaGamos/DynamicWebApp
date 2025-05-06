'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddressPicker = dynamic(() => import('../../components/AddressPicker'), { ssr: false });

const nameRegex = /^[A-Za-z\s]+$/;

const schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name is too short')
    .regex(nameRegex, 'First name must contain only letters'),
  lastName: z
    .string()
    .min(2, 'Last name is too short')
    .regex(nameRegex, 'Last name must contain only letters'),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .regex(/^\d{10,}$/, 'Phone number must be at least 10 digits and contain only numbers'),
  address: z.string().min(5, 'Address is required'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log('Validated:', data);
    setTimeout(() => {
      setLoading(false);
      alert('Registration successful!');
    }, 2000);
  };

  return (
    <div className="p-8 w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-lg shadow-lg rounded-xl">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Create an Account</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              {...register('firstName')}
              placeholder="e.g., Juan"
              className={`w-full border p-2 rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              {...register('lastName')}
              placeholder="e.g., Dela Cruz"
              className={`w-full border p-2 rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            {...register('email')}
            placeholder="e.g., example@email.com"
            className={`w-full border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            {...register('phone')}
            placeholder="e.g., 09123456789"
            className={`w-full border p-2 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selected Address</label>
          <input
            {...register('address')}
            value={selectedAddress}
            readOnly
            placeholder="Select from map"
            className={`w-full border p-2 rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Toggle Map Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowMap(prev => !prev)}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md transition-all duration-200"
          >
            {showMap ? 'Hide Map' : 'Pick Address from Map'}
          </button>
        </div>

        {/* Address Picker Map */}
        {showMap && (
          <div className="mt-4 border rounded-md shadow-inner p-4 bg-white transition-all duration-300">
            <AddressPicker
              onSelect={(address: string) => {
                setSelectedAddress(address);
                setValue('address', address);
              }}
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center space-y-4">
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-lg transition-opacity duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            Already have an account? Login
          </a>
        </div>

      </form>
    </div>
  );
}
