package com.example.todolistbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@AllArgsConstructor @Data
public class Contact {
    private UUID id;
    private String name;
    private String phonenumber;
}
