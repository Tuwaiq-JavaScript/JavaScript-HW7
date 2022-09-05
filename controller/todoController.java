package com.example.todo.controller;

import com.example.todo.DTO.Api;
import com.example.todo.Modle.Todo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/todo")
public class todoController {

    private ArrayList<Todo> todoArrayList = new ArrayList<>();

    @GetMapping
    public ResponseEntity getTodos() {
        return ResponseEntity.status(200).body(todoArrayList);
    }

    @PostMapping
    public ResponseEntity addTodos(@RequestBody Todo todo) {
        todo.setId(UUID.randomUUID());
        todoArrayList.add(todo);
        return ResponseEntity.status(201).body(new Api("New todo added !", 201));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTodo(@RequestBody Todo todo, @PathVariable UUID id) {
        for (int i = 0; i < todoArrayList.size(); i++) {
            if (todoArrayList.get(i).getId().equals(id)) {
                todo.setId(id);
                todoArrayList.set(i, todo);
                return ResponseEntity.status(200).body(new Api("Todo update ", 200));
            }
        }
        return ResponseEntity.status(400).body(new Api("Invalid id", 400));

    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteTodo(@PathVariable UUID id) {
        for (int i = 0; i < todoArrayList.size(); i++) {
            if (todoArrayList.get(i).getId().equals(id)) {
                todoArrayList.remove(todoArrayList.get(i));
                return ResponseEntity.status(200).body(new Api("Todo deleted ", 200));
            }
        }
        return ResponseEntity.status(400).body(new Api("Invalid id", 400));
    }
}