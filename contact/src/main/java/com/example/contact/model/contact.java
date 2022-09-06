package com.example.contact.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class contact {
    private UUID id;
    private String number;
    private String name ;
}
