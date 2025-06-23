package com.web2.projeto_web2.report;

public class CategoryRevenueReport {

    private String categoryName;
    private Double totalRevenue;

    public CategoryRevenueReport(String categoryName, Double totalRevenue) {
        this.categoryName = categoryName;
        this.totalRevenue = totalRevenue;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }
}
