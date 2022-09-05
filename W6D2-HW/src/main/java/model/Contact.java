package model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@AllArgsConstructor
@Data
public class Contact {
    UUID id;
    String name;
    String number;
}


