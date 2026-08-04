package com.orra.Orrabackend.service;

import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.Productimage;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.CategoryCountProjection;
import com.orra.Orrabackend.repository.ProductListImageRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.orra.Orrabackend.repository.UserRepository;
import com.orra.Orrabackend.repository.BookingRepository;


import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductListService {

    private final BookingRepository bookingRepository;
    private final ProductListRepository repo;
    private final ProductListImageRepository repoImage;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    private final SupabaseStorageService storageService;

    public List<ProductList> getAll() {
        return repo.findByIsAvailableTrueAndIsActiveTrue();
    }

    // SEARCH PRODUCTS
    public List<ProductList> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }

    public ProductList getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public ProductList create(ProductList product, Long userId) {
        userService.grantOwnerRole(userId);

        User owner = userService.getById(userId);
        product.setOwner(owner);

        return repo.save(product);
    }

    public ProductList update(ProductList product, Long userId) {

        ProductList existing = repo.findById(product.getProductId()).orElse(null);

        if (existing == null)
            return null;

        if (!existing.getOwner().getId().equals(userId)) {
            throw new AccessDeniedException("You do not own this listing");
        }

        validateListingCanBeModified(existing.getProductId());

        if (product.getProductName() != null)
            existing.setProductName(product.getProductName());

        if (product.getCategory() != null)
            existing.setCategory(product.getCategory());

        if (product.getBrand() != null)
            existing.setBrand(product.getBrand());

        if (product.getDescription() != null)
            existing.setDescription(product.getDescription());

        if (product.getModel() != null)
            existing.setModel(product.getModel());

        if (product.getDailyRate() != null)
            existing.setDailyRate(product.getDailyRate());

        if (product.getSecurityDeposit() != null)
            existing.setSecurityDeposit(product.getSecurityDeposit());

        if (product.getPurchasePrice() != null)
            existing.setPurchasePrice(product.getPurchasePrice());

        if (product.getDays() != null)
            existing.setDays(product.getDays());

        if (product.getProductspec() != null)
            existing.setProductspec(product.getProductspec());

        if (product.getIsActive() != null)
            existing.setIsActive(product.getIsActive());

        return repo.save(existing);
    }

    public void delete(Long id, Long userId) {

        ProductList existing = repo.findById(id).orElse(null);

        if (existing == null)
            return;

        if (!existing.getOwner().getId().equals(userId)) {
            throw new AccessDeniedException("You do not own this listing");
        }

        validateListingCanBeModified(existing.getProductId());

        repo.deleteById(id);
    }

    @Transactional
    public ProductList CreateWithImage(ProductList product, List<String> images, Long userId) {
        userService.grantOwnerRole(userId);

        User owner = userService.getById(userId);

        product.setOwner(owner);

        ProductList saved = repo.save(product);

        if (images != null && !images.isEmpty()) {

            List<Productimage> imagelist = images.stream()
                    .map(base64 -> {

                        String imageUrl = storageService.uploadBase64Image(base64);

                        Productimage prodimg = new Productimage();

                        prodimg.setImageUrl(imageUrl);

                        prodimg.setProduct(saved);

                        return prodimg;

                    })
                    .collect(Collectors.toList());

            repoImage.saveAll(imagelist);
            saved.setImages(imagelist);
        }

//        List<User> subscribers = userRepository.findBySubscribedTrue();
//
//        for (User subscriber : subscribers) {
//
//            emailService.sendNewListingEmail(
//                    subscriber.getEmail(),
//                    saved.getProductName()
//            );
//        }

        return saved;
    }

    public List<CategoryCountProjection> getCategorySummary() {
        return repo.getCategoryCounts();
    }

    public List<ProductList> getUserListings(Long userId) {
        return repo.findByOwner_IdAndIsActiveTrue(userId);
    }

    private void validateListingCanBeModified(Long productId) {

        boolean hasActiveBooking =
                bookingRepository.existsByListing_ProductIdAndStatusIn(
                        productId,
                        List.of(
                                BookingStatus.PENDING,
                                BookingStatus.ACTIVE
                        )
                );

        if (hasActiveBooking) {
            throw new IllegalStateException(
                    "Cannot modify a listing because it has an active or pending booking."
            );
        }
    }
}
