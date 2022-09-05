package com.example.ex1.controller;

import com.example.ex1.dto.ApiResponse;
import com.example.ex1.model.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/person")
@CrossOrigin
public class PersonController {


    private ArrayList <Person> personArrayList=new ArrayList<>();
    @GetMapping
    public ResponseEntity getPersons(){
        return ResponseEntity.status(200).body(personArrayList);
    }

    @PostMapping
    public ResponseEntity addPersons(@RequestBody Person person){
        person.setId(UUID.randomUUID());
        personArrayList.add(person);
        return ResponseEntity.status(201).body(new ApiResponse("New person added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updatePerson(@RequestBody Person person,@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                person.setId(id);
                personArrayList.set(i,person);
                return ResponseEntity.status(200).body(new ApiResponse("Person update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity deletePerson(@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                personArrayList.remove(personArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("Person deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}