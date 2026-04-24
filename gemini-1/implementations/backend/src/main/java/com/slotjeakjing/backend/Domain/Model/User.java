package com.slotjeakjing.backend.Domain.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // รวมไว้ใน Table เดียวกัน
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public abstract class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    private String passwd;
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    @Entity
    @DiscriminatorValue("ASTRONOMER")
    public static class Astronomer extends User {
    }

    @Entity
    @DiscriminatorValue("OBSERVER")
    public static class ScienceObserver extends User {
    }
}