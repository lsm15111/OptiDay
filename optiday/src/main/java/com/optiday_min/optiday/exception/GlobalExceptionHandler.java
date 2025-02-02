package com.optiday_min.optiday.exception;


import com.nimbusds.jwt.JWT;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Argument
    // 400 Bed Request
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    // Entity
    // 404 Not Found
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    // Server
    // 500 Internal Server Error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }


// JWT Exception

    // Token 예외
    // 406 Not Acceptable
    @ExceptionHandler(NotAvailableRequestException.class)
    public ResponseEntity<String> handleNotAvailableRequestException(Exception ex) {
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Token error :"+ex.getMessage());
    }

    // 401 인증되지않음
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<String> handleInvalidTokenException(InvalidTokenException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }









}
