package com.example.ww.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    private String email;

    private String username;
    @Column(nullable = false)
    private String password;
    private String address;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String pictureUrl;

    @Column(nullable = true)
    private String passwordResetToken;

    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToMany
    private List<Commande> commandes;

    @OneToOne
    Reclamation reclamation;


}
