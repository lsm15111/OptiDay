package com.optiday_min.optiday.exception;

public class InvalidTokenException extends RuntimeException {

  // 기본 생성자
  public InvalidTokenException() {
    super("Invalid token"); // 기본 메시지
  }

  // 커스텀 메시지를 받을 수 있는 생성자
  public InvalidTokenException(String message) {
    super(message);
  }

  // 메시지와 원인(Exception)을 받을 수 있는 생성자
  public InvalidTokenException(String message, Throwable cause) {
    super(message, cause);
  }

  // 원인(Throwable)만 받을 수 있는 생성자
  public InvalidTokenException(Throwable cause) {
    super(cause);
  }
}
