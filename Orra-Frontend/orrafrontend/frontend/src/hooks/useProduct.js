import { getAllProducts } from '@/api/listingApi';
import { setError, setLoading, setProducts } from '@/redux/slices/productslices';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useProduct = () => {

     const dispatch = useDispatch();

 const { products, loading , error,fetched }= useSelector((state)=>state.products);

 useEffect(()=>{
    if(fetched)return ;

const loadProducts = async () => {
      try {
        dispatch(setLoading(true));

        const response = await getAllProducts();

        dispatch(setProducts(response.data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();

 },[dispatch,fetched])

  return {
   products,
   loading,
   error,
fetched,
};
}

export default useProduct