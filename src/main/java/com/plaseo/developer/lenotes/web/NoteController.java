package com.plaseo.developer.lenotes.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import com.plaseo.developer.lenotes.model.Note;
import com.plaseo.developer.lenotes.model.NoteRepository;
import com.plaseo.developer.lenotes.model.User;
import com.plaseo.developer.lenotes.model.UserRepository;
import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class NoteController {

    private final Logger log = LoggerFactory.getLogger(NoteController.class);
    private NoteRepository noteRepository;
    private UserRepository userRepository;
    
    public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/notes")
    Collection<Note> notes(Principal principal) {
        return noteRepository.findAllByUserId(principal.getName());
    }

    @GetMapping("/note/{id}")
    ResponseEntity<?> getNote(@PathVariable Long id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.map(response -> ResponseEntity.ok().body(response))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/note")
    ResponseEntity<Note> createNote(@Valid @RequestBody Note note,
        @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create note: {}", note);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        
        Optional<User> user = userRepository.findById(userId);
        note.setUser(user.orElse(new User(userId,
            details.get("name").toString(), details.get("email").toString())));

        Note result = noteRepository.save(note);
        return ResponseEntity.created(new URI("/api/note/" + result.getId()))
            .body(result);
    }

    @PutMapping("/note/{id}")
    ResponseEntity<Note> updateNote(@Valid @RequestBody Note note) {
        log.info("Request to update note:", note);
        Note result = noteRepository.save(note);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/note/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        log.info("Request to delete note: {}", id);
        noteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
