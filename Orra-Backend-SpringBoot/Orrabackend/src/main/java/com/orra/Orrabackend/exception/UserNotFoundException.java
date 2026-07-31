package com.orra.Orrabackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String id){

        super(id);
    }

    public UserNotFoundException(Long id){

        super(String.valueOf(id));
    }
}
