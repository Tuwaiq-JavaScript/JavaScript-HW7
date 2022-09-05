package com.example.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;
@AllArgsConstructor@Data
public class User {
    private UUID id;
    private String name;
    private String phoneNumber;
}
