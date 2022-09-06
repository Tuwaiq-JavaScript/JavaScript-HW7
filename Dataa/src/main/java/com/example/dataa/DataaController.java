package com.example.dataa;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin
public class DataaController {


    private ArrayList<Dataa> DataaArrayList=new ArrayList<>();
    @GetMapping
    public ResponseEntity getDataas(){
        return ResponseEntity.status(200).body(DataaArrayList);
    }

    @PostMapping
    public ResponseEntity addDataas(@RequestBody Dataa dataa){
        dataa.setId(UUID.randomUUID());
        DataaArrayList.add(dataa);
        return ResponseEntity.status(201).body(new ApiResponse("New Data added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateDataa(@RequestBody Dataa dataa,@PathVariable UUID id){
        for (int i = 0; i < DataaArrayList.size(); i++) {
            if(DataaArrayList.get(i).getId().equals(id)){
                dataa.setId(id);
                DataaArrayList.set(i,dataa);
                return ResponseEntity.status(200).body(new ApiResponse("data update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteDataa(@PathVariable UUID id){
        for (int i = 0; i < DataaArrayList.size(); i++) {
            if(DataaArrayList.get(i).getId().equals(id)){
                DataaArrayList.remove(DataaArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("Data deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}
