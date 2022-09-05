package com.example.contactbackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Contact {
    private UUID id = UUID.randomUUID();
    private String name;
    private String number;

}
