package com.example.htmlhw1.controller;

import com.example.htmlhw1.dto.ApiResponce;
import com.example.htmlhw1.model.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/person")
@CrossOrigin
public class PersonController {

    private ArrayList<Person> personArrayList=new ArrayList<>();


    @GetMapping
    public ResponseEntity getperson(){

        return ResponseEntity.status(200).body(personArrayList);
    }

    @PostMapping
    public ResponseEntity addperson(@RequestBody Person person){
        person.setId(UUID.randomUUID());
        personArrayList.add(person);
        return ResponseEntity.status(201).body(new ApiResponce("New todo added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateperson(@RequestBody Person person,@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                //why we set the id again ??
                person.setId(id);
                personArrayList.set(i,person);
                return ResponseEntity.status(200).body(new ApiResponce("Todo update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponce("Invalid id",400));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteperson(@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                personArrayList.remove(personArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponce("Todo deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponce("Invalid id",400));
    }


}
