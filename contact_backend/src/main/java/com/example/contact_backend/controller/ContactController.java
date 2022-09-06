package com.example.contact_backend.controller;

import com.example.contact_backend.dto.ApiResponse;
import com.example.contact_backend.model.Contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin
public class ContactController {


    private ArrayList<Contact> contactsArrayList=new ArrayList<>();
    @GetMapping
    public ResponseEntity getContact(){
        return ResponseEntity.status(200).body(contactsArrayList);
    }

    @PostMapping
    public ResponseEntity addContact(@RequestBody Contact contact){
        contact.setId(UUID.randomUUID());
        contactsArrayList.add(contact);
        return ResponseEntity.status(201).body(new ApiResponse("New Contact added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateContact(@RequestBody Contact contact,@PathVariable UUID id){
        for (int i = 0; i < contactsArrayList.size(); i++) {
            if(contactsArrayList.get(i).getId().equals(id)){
                contact.setId(id);
                contactsArrayList.set(i,contact);
                return ResponseEntity.status(200).body(new ApiResponse("Contact update ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteContact(@PathVariable UUID id){
        for (int i = 0; i < contactsArrayList.size(); i++) {
            if(contactsArrayList.get(i).getId().equals(id)){
                contactsArrayList.remove(contactsArrayList.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("Contact deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}