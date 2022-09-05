package service;

import exception.apiException;
import lombok.RequiredArgsConstructor;
import model.Contact;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class contactService {

    ArrayList<Contact> contacts=new ArrayList<>();


    public ArrayList<Contact> getContacts() {
        return contacts;
    }

    public void addContact(Contact contact) {
        contact.setId(UUID.randomUUID());
        contacts.add(contact);
    }

    public void deleteContact(UUID id) {
        for (int i = 0; i < contacts.size(); i++) {
            if (contacts.get(i).getId().equals(id)) {
                contacts.remove(i);
            }
        }
        throw new apiException("Wrong contact Id");
    }

    public void updateContact(UUID id, Contact contact) {
        for (int i = 0; i < contacts.size(); i++) {
            if (contacts.get(i).getId().equals(id)) {
                contact.setId(id);
                contacts.set(i,contact);
            }
        }
        throw new apiException("Wrong contact Id");
    }


}
