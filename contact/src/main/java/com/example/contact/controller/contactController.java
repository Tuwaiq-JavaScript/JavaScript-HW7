package com.example.contact.controller;

import com.example.contact.ado.ApiRespond;
import com.example.contact.model.contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contact")
@CrossOrigin
public class contactController {
    private ArrayList<contact> contacts = new ArrayList<>();

    @GetMapping
    public ResponseEntity getContact(){
        return ResponseEntity.status(200).body(contacts); }

    @PostMapping
    public ResponseEntity addContact(@RequestBody contact contact){
        contact.setId(UUID.randomUUID());
        contacts.add(contact);
        return ResponseEntity.status(200).body(new ApiRespond("todo added",200)); }

    @PutMapping("/{id}")
    public ResponseEntity updateContact(@RequestBody contact contact,@PathVariable UUID id) {
        for (int i = 0; i < contacts.size(); i++) {
            if (contacts.get(i).getId().equals(id)) {
                contact.setId(id);
                contacts.set(i, contact);
                return ResponseEntity.status(200).body(new ApiRespond("ToDo updated", 200));
            }
        }
        return ResponseEntity.status(400).body(new ApiRespond("invalide id updated ",400)); }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteContact(@PathVariable UUID id ){
        for (int i = 0; i < contacts.size(); i++) {
            if(contacts.get(i).getId().equals(id)){
                contacts.remove(contacts.get(i));
                return ResponseEntity.status(200).body(new ApiRespond("ToDo deleted",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiRespond("invalide id ",400)); }


    }

