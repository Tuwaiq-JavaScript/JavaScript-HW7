package dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor @Data
public class apiResponse {
    private String msg;
    private Integer status;
}
