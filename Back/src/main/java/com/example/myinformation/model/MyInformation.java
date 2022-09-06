package com.example.myinformation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@AllArgsConstructor
@Data
public class MyInformation {
    private UUID id;
    private String name;
    private String phoneNumber;
}
