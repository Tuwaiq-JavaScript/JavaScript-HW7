package com.example.user.controller;

import com.example.user.dto.ApiResponse;
import com.example.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;
@RestController
@RequestMapping("api/v1/user")
@CrossOrigin
public class UserController {
    private ArrayList<User> users=new ArrayList<>();
    @GetMapping
    public ResponseEntity getUser(){
        return ResponseEntity.status(200).body(users);
    }

    @PostMapping
    public ResponseEntity addTodos(@RequestBody User user){
        user.setId(UUID.randomUUID());
        users.add(user);
        return ResponseEntity.status(201).body(new ApiResponse("New user added !",201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTodo(@RequestBody User user,@PathVariable UUID id){
        for (int i = 0; i < users.size(); i++) {
            if(users.get(i).getId().equals(id)){
                user.setId(id);
                users.set(i,user);
                return ResponseEntity.status(200).body(new ApiResponse("user updated ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTodo(@PathVariable UUID id){
        for (int i = 0; i < users.size(); i++) {
            if(users.get(i).getId().equals(id)){
                users.remove(users.get(i));
                return ResponseEntity.status(200).body(new ApiResponse("user deleted ",200));
            }
        }
        return ResponseEntity.status(400).body(new ApiResponse("Invalid id",400));
    }
}
