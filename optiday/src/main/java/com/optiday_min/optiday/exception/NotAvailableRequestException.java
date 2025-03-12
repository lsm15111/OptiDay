package com.optiday_min.optiday.exception;

public class NotAvailableRequestException extends RuntimeException{
    public NotAvailableRequestException() {
    }
    public NotAvailableRequestException(String message) {
        super(message);
    }
}