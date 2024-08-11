package com.plaseo.developer.lenotes.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_note")
public class Note {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String title;
    @Lob
    private String body;
    private String tag;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;

}
