import SearchBar from "@/components/common/SearchBar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductCard from "@/components/common/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setLoading,
  setProducts,
} from "@/redux/slices/productslices";
import { getAllProducts } from "@/api/listingApi";

const BrowseDevices = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  const loading = useSelector((state) => state.products.loading);

  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllProducts();
      dispatch(setProducts(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
  return (
    <div className="BrowseDevices-container w-full max-h-full">
      <div className="upper-section-browdev w-full p-8 pl-[8.5%] h-[40%] ">
        <h2 className="text-[40px] font-extrabold">Browse Devices</h2>
        <div className="upper-sec-data flex flex-row justify-center ">
          <div className="search-box mt-5 w-[70%]">
            <SearchBar
              className="!w-[97%] !p-[17px] !rounded-[10px] !text-[16px] !font-semibold "
              placeholder="search for Drone or Mobile..."
            />
          </div>
          <div className="bd-filter  mt-5 w-[30%]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[70%] p-7  ">
                  SortBy: Recommanded
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>SortBy: Recommanded</DropdownMenuLabel>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: high to low</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="lower-section-browdev bg-gray-200 pt-8 pb-8">
        <div className="left-browdev"></div>
        <div className="rightbrowdev">
          {products?.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseDevices;
