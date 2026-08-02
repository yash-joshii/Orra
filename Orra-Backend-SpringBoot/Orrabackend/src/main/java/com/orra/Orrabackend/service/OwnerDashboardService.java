package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.OwnerDashboard.OwnerDashboardResponseDTO;
import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerEarningDetailsDTO;
import com.orra.Orrabackend.model.Transaction;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerActiveListingDTO;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerCompletedRentalDTO;


import java.util.ArrayList;
import java.util.List;

@Service
public class OwnerDashboardService {

    @Autowired
    private ProductListRepository productListRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public OwnerDashboardResponseDTO getDashboard(Long ownerId) {

        long activeListings =
                productListRepository.countByOwner_IdAndIsActiveTrue(ownerId);

        long completedRentals =
                bookingRepository.countByListing_OwnerIdAndStatus(
                        ownerId,
                        BookingStatus.COMPLETED
                );

        List<Booking> bookings =
                bookingRepository.findByListing_OwnerId(ownerId);

        List<Long> bookingIds =
                bookings.stream()
                        .map(Booking::getId)
                        .toList();

        Double totalEarnings =
                bookingIds.isEmpty()
                        ? 0.0
                        : transactionRepository.getTotalEarnings(bookingIds);

        return new OwnerDashboardResponseDTO(
                totalEarnings,
                activeListings,
                completedRentals
        );
    }

    public List<OwnerEarningDetailsDTO> getEarningDetails(Long ownerId) {

        List<Booking> bookings =
                bookingRepository.findByListing_OwnerId(ownerId);

        List<OwnerEarningDetailsDTO> earningDetails = new ArrayList<>();

        for (Booking booking : bookings) {

            List<Transaction> transactions =
                    transactionRepository.findByBookingId(booking.getId());

            for (Transaction transaction : transactions) {

                OwnerEarningDetailsDTO dto =
                        new OwnerEarningDetailsDTO();

                dto.setBookingId(booking.getId());

                dto.setListingTitle(
                        booking.getListing().getProductName()
                );

                dto.setAmount(transaction.getAmount());

                dto.setCreatedAt(
                        booking.getCreatedAt()
                );

                earningDetails.add(dto);
            }
        }

        return earningDetails;
    }

    public List<OwnerActiveListingDTO> getActiveListings(Long ownerId) {

        List<ProductList> listings =
                productListRepository.findByOwner_IdAndIsActiveTrue(ownerId);

        List<OwnerActiveListingDTO> activeListings =
                new ArrayList<>();

        for (ProductList product : listings) {

            OwnerActiveListingDTO dto = new OwnerActiveListingDTO();

            dto.setListingId(product.getProductId());

            dto.setTitle(product.getProductName());

            dto.setCategory(product.getCategory().name());

            dto.setPricePerDay(product.getDailyRate());

            if (product.getImages() != null && !product.getImages().isEmpty()) {
                dto.setImageUrl(product.getImages().get(0).getImageBase64());
            }

            activeListings.add(dto);
        }

        return activeListings;
    }

    public List<OwnerCompletedRentalDTO> getCompletedRentals(Long ownerId) {

        List<Booking> bookings =
                bookingRepository.findByListing_OwnerIdAndStatus(
                        ownerId,
                        BookingStatus.COMPLETED
                );

        List<OwnerCompletedRentalDTO> completedRentals =
                new ArrayList<>();

        for (Booking booking : bookings) {

            OwnerCompletedRentalDTO dto =
                    new OwnerCompletedRentalDTO();

            dto.setBookingId(booking.getId());

            dto.setListingTitle(
                    booking.getListing().getProductName()
            );

            dto.setRenterName(
                    booking.getRenter().getName()
            );

            dto.setCompletedDate(
                    booking.getCompletedAt()
            );

            completedRentals.add(dto);
        }

        return completedRentals;
    }
}