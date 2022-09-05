package com.example.contact.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

;
import java.util.UUID;

@AllArgsConstructor
@Data
public class title {

    private UUID id;
    private String tai;
    private String number;
}
