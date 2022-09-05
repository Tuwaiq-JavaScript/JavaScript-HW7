package com.example.hwd2.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Contact {
    UUID id;
    String name;
    String phone;

}
