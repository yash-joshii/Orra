import SearchBar from "@/components/common/SearchBar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllProducts, searchProducts } from "@/api/listingApi";
import FilterationSidebar from "@/components/common/FilterationSidebar";
import ProductCard from "@/components/common/ProductCard";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  setError,
  setLoading,
  setProducts,
} from "@/redux/slices/productslices";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "react-router-dom";
import LogoLoader from "@/components/common/LogoLoader";

const BrowseDevices = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  // ✅ Filter products
  const filteredProducts = categoryFilter
    ? products?.filter((p) => p.category === categoryFilter)
    : products;

  // ✅ Fetch products
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllProducts();
      dispatch(setProducts(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ Search
  const handleSearch = async (value) => {
    setSearch(value);

    try {
      if (value.trim() === "") {
        fetchProduct();
        return;
      }

      const response = await searchProducts(value);
      dispatch(setProducts(response.data));
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  // ✅ Pagination
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(
    (filteredProducts?.length || 0) / ITEMS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }

    return pages;
  };

  // ✅ Loader
  if (loading) return <LogoLoader />;

  return (
    <div className="w-full">
      {/* 🔥 TOP SECTION */}
      <div className="w-full p-8 pl-[8.5%]">
        <h2 className="text-[40px] font-extrabold">Browse Devices</h2>

        <div className="flex gap-4 mt-5">
          {/* Search */}
          <div className="w-[70%]">
            <SearchBar
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="!w-full !p-[17px] !rounded-[10px] !text-[16px] !font-semibold"
              placeholder="Search gear..."
            />
          </div>

          {/* Sort */}
          <div className="w-[30%]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full p-6">
                  Sort By: Recommended
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN SECTION */}
      <div className="bg-gray-200 py-8 flex justify-center gap-6 px-6">
        {/* Sidebar */}
        <div className="w-[25%]">
          <FilterationSidebar />
        </div>

        {/* Products */}
        <div className="w-[75%]">
          {/* Cards */}
          <div className="flex flex-wrap gap-[30px]">
            {paginatedProducts?.map((item) => (
              <ProductCard key={item.productId} data={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>

                {getPageNumbers().map((page, idx) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={`page-${page}`}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseDevices;
