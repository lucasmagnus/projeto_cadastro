package br.com.lucasmagnusdasilva.cadastro.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class Phone implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_customer", referencedColumnName = "id")
    @JsonIgnore
    private Customer customer;

    public Phone() {
    }

    public Phone(Long id, String phone) {
        this.id = id;
        this.phone = phone;
    }

}

