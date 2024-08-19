package com.ssafy.ozz.clothes.clothes.dto.request;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import java.time.LocalDate;

public record PurchaseHistory (
        String name,
        String brand,
        LocalDate purchaseDate,
        String purchaseSite,
        String imgUrl,
        String option
) {
    public Clothes toEntity(Long userId, String normalizedName) {
        return Clothes.builder()
                .name(normalizedName)
                .brand(brand)
                .purchaseDate(purchaseDate)
                .purchaseSite(purchaseSite)
                .userId(userId)
                .imageFileId(0L)
                .processing(3)
                .build();
    }
}