package com.example.contact_backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class Contact {
    private UUID id;
    private String name;
    private String number;
}
