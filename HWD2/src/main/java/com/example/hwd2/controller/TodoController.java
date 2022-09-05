package com.example.hwd2.controller;

import com.example.hwd2.model.ApiResponse;
import com.example.hwd2.model.Contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/contact")
public class TodoController {

    private ArrayList<Contact> contactArrayList = new ArrayList();


    @GetMapping
    public ResponseEntity<ArrayList> getContact(){
        return ResponseEntity.status(200).body(contactArrayList);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addContact(@RequestBody Contact contact){

        contactArrayList.add(new Contact(UUID.randomUUID(), contact.getName(),contact.getPhone()));
        return ResponseEntity.status(201).body(new ApiResponse("contact added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateContact(@PathVariable UUID id,@RequestBody Contact contact){
        for (int i = 0; i < contactArrayList.size(); i++) {
            if(contactArrayList.get(i).getId().equals(id)){
                contactArrayList.get(i).setId(id);
                contactArrayList.get(i).setName(contact.getName());
                contactArrayList.get(i).setPhone(contact.getPhone());
            }
        }
        return ResponseEntity.status(200).body(new ApiResponse("contact updated !",200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteContact( @PathVariable UUID id){
        for (int i = 0; i < contactArrayList.size(); i++) {
            if(contactArrayList.get(i).getId().equals(id))
                contactArrayList.remove(i);
        }
        return ResponseEntity.status(200).body(new ApiResponse("contact deleted !",200));
    }




}
