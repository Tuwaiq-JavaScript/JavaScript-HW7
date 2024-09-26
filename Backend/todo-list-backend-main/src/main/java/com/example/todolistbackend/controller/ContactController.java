package com.example.todolistbackend.controller;
import com.example.todolistbackend.dto.ApiResponse;
import com.example.todolistbackend.model.Contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin
public class ContactController {


    private ArrayList <Contact> contactArrayList=new ArrayList<>();
    @GetMapping
    public ResponseEntity getContacts(){
        return ResponseEntity.status(200).body(contactArrayList);
    }

    @PostMapping
    public ResponseEntity addContacts(@RequestBody Contact contact){
        contact.setId(UUID.randomUUID());
        contactArrayList.add(contact);
        return ResponseEntity.status(201).body(new ApiResponse("New contact added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateContact(@RequestBody Contact contact,@PathVariable UUID id){
        for (int i = 0; i < contactArrayList.size(); i++) {
            if(contactArrayList.get(i).getId().equals(id)){
                contact.setId(id);
                contactArrayList.set(i,contact);
                return ResponseEntity.status(200).body(new ApiResponse("Contact update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteContact(@PathVariable UUID id){
        for (int i = 0; i < contactArrayList.size(); i++) {
            if(contactArrayList.get(i).getId().equals(id)){
                contactArrayList.remove(contactArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("Contact deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}
