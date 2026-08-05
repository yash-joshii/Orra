import React, { useEffect, useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import FilterationSidebar from "@/components/common/FilterationSidebar";
import ProductCard from "@/components/common/ProductCard";
import LogoLoader from "@/components/common/LogoLoader";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import useProduct from "@/hooks/useProduct";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import { PackageSearch } from "lucide-react";

const BrowseDevices = () => {
  const { products, loading, error } = useProduct();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "price-asc" | "price-desc" | "rating"

  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get("category");
  const maxPriceParam = searchParams.get("maxPrice");
  const maxPriceFilter = maxPriceParam ? Number(maxPriceParam) : null;

  // 1. Category Filter
  const filteredProducts = categoryFilter
    ? products.filter(
        (item) =>
          item.category?.toLowerCase() === categoryFilter.toLowerCase()
      )
    : products;

  // 2. Price Filter
  const priceFilteredProducts = maxPriceFilter
    ? filteredProducts.filter((item) => {
        const price =
          item.dailyRate ?? item.pricePerDay ?? item.rentalPrice ?? 0;
        return price <= maxPriceFilter;
      })
    : filteredProducts;

  // 3. Search Filter
  const searchFilteredProducts = priceFilteredProducts.filter((item) =>
    item.productName?.toLowerCase().includes(search.toLowerCase())
  );

  // 4. Sort Products
  const displayProducts = [...searchFilteredProducts].sort((a, b) => {
    const getPrice = (item) =>
      item.dailyRate ?? item.pricePerDay ?? item.rentalPrice ?? 0;

    switch (sortBy) {
      case "price-asc":
        return getPrice(a) - getPrice(b);
      case "price-desc":
        return getPrice(b) - getPrice(a);
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "recent":
      default:
        // Sort by productId descending for most recent
        return (b.productId ?? 0) - (a.productId ?? 0);
    }
  });

  // Reset pagination when any filter or sort option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, maxPriceFilter, search, sortBy]);

  // Pagination
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = displayProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const getSortLabel = () => {
    switch (sortBy) {
      case "price-asc":
        return "Price : Low to High";
      case "price-desc":
        return "Price : High to Low";
      case "rating":
        return "Highest Rated";
      case "recent":
      default:
        return "Most Recent";
    }
  };

  if (loading)
    return (
      <div className="bg-gray-200 py-8 px-6">
        <div className="flex flex-wrap gap-[30px] justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="w-full">
      {/* Top */}
      <div className="w-full p-8 pl-[8.5%]">
        <h2 className="text-[40px] font-extrabold">Browse Devices</h2>

        <div className="flex gap-4 mt-5">
          <div className="w-[100%]">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!w-full !p-[17px] !rounded-[10px] !text-[16px] !font-semibold"
              placeholder="Search Devices..."
            />
          </div>

        </div>
      </div>

      {/* Body */}
      <div className="bg-gray-200 py-8 flex gap-6 px-6">
        <div className="w-[25%]">
          <FilterationSidebar />
        </div>

        <div className="w-[75%]">
          {paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl">
              <PackageSearch size={48} className="text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                No devices available
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-[30px]">
              {paginatedProducts.map((item, index) => (
                <ProductCard
                  key={item.productId ?? `product-${startIndex + index}`}
                  data={item}
                />
              ))}
            </div>
          )}

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

                {getPageNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
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
                  )
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