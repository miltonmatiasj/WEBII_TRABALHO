package com.web2.projeto_web2.report;

import java.util.Date;

public class DailyRevenueReport {
    private Date date;
    private Double totalRevenue;

    public DailyRevenueReport(Date date, Double totalRevenue) {
        this.date = date;
        this.totalRevenue = totalRevenue;
    }

    public Date getDate() {
        return date;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }
}
