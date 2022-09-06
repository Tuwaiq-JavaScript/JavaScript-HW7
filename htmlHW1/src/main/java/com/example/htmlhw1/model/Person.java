package com.example.htmlhw1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor@Data
public class Person {

    private UUID id;
    private String number;
    private String name;

}
