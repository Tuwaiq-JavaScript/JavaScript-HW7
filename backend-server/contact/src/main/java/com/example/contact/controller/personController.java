package com.example.contact.controller;

import com.example.contact.dto.ApiResponse;
import com.example.contact.model.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/person")
public class personController {
    private ArrayList <Person> personArrayList=new ArrayList<>();

    @GetMapping
    public ResponseEntity<ArrayList<Person>> getTodos(){
        return ResponseEntity.status(200).body(personArrayList);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addTodos(@RequestBody Person person){
        person.setId(UUID.randomUUID());
        personArrayList.add(person);
        return ResponseEntity.status(201).body(new ApiResponse("person added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTodo(@RequestBody Person person,@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                person.setId(id);
                personArrayList.set(i,person);
                return ResponseEntity.status(200).body(new ApiResponse("person update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTodo(@PathVariable UUID id){
        for (int i = 0; i < personArrayList.size(); i++) {
            if(personArrayList.get(i).getId().equals(id)){
                personArrayList.remove(personArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("person deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}
