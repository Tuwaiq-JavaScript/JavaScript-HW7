package com.example.myinformation.controller;


import com.example.myinformation.dto.ApiResponse;
import com.example.myinformation.model.MyInformation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/Information")
@CrossOrigin
public class MyInformationController {


    private ArrayList <MyInformation> myInformations = new ArrayList<>();
    @GetMapping
    public ResponseEntity getMyInformation(){

        return ResponseEntity.status(200).body(myInformations);
    }

    @PostMapping
    public ResponseEntity addMyInformation(@RequestBody MyInformation myInformation){
        myInformation.setId(UUID.randomUUID());
        myInformations.add(myInformation);
        return ResponseEntity.status(201).body(new ApiResponse("New information added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMyInformation(@RequestBody MyInformation myInformation, @PathVariable UUID id){
        for (int i = 0; i < myInformations.size(); i++) {
            if(myInformations.get(i).getId().equals(id)){
                myInformation.setId(id);
                myInformations.set(i,myInformation);
                return ResponseEntity.status(200).body(new ApiResponse("information updated ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Incorrect id",400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteMyInformation(@PathVariable UUID id){
        for (int i = 0; i < myInformations.size(); i++) {
            if(myInformations.get(i).getId().equals(id)){
                myInformations.remove(myInformations.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("information deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Incorrect id",400));
    }
}