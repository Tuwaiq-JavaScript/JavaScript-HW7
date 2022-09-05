package controller;

import dto.apiResponse;
import lombok.RequiredArgsConstructor;
import model.Contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.contactService;

import java.util.ArrayList;
import java.util.UUID;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class contactController {
    private final contactService contactService;


    @GetMapping()
    public ResponseEntity<ArrayList<Contact>> getContacts(){
        ArrayList<Contact> contacts= contactService.getContacts();
        return ResponseEntity.status(200).body(contacts);
    }

    @PostMapping()
    public ResponseEntity<apiResponse> addTodo(@RequestBody Contact contact){
        contactService.addContact(contact);
        return ResponseEntity.status(200).body(new apiResponse("Contact added successfully!",200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<apiResponse> deleteContact(@PathVariable UUID id){
        contactService.deleteContact(id);
        return ResponseEntity.status(200).body(new apiResponse("Contact deleted successfully!",200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<apiResponse> updateContact(@PathVariable UUID id , @RequestBody Contact contact) {
        contactService.updateContact(id, contact);
        return ResponseEntity.status(200).body(new apiResponse("Contact updated successfully!",200));
    }
}
