package com.example.contact.controller;

import com.example.contact.dto.ApiResponse;
import com.example.contact.model.title;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin
public class controller {
     private ArrayList <title> arr = new ArrayList<>();

     @GetMapping
    public ResponseEntity getTodo(){
         return ResponseEntity.status(200).body(arr);
     }
     @PostMapping
     public ResponseEntity postTodo(@RequestBody title title1){
         title1.setId(UUID.randomUUID());
         arr.add(title1);
         return ResponseEntity.status(201).body(new ApiResponse("New todo added !",201));


     }
    @PutMapping("/{id}")
    public ResponseEntity puttTodo(@RequestBody title title1, @PathVariable UUID id ){
        for (int i = 0; i < arr.size(); i++) {
            if(arr.get(i).getId().equals(id)){
                title1.setId(id);
                arr.set(i,title1);
                return ResponseEntity.status(200).body(new ApiResponse("Todo update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletetTodo(@PathVariable UUID id){
        for (int i = 0; i < arr.size(); i++) {
            if(arr.get(i).getId().equals(id)){
                arr.remove(arr.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("Todo deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}
