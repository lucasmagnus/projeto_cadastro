package br.com.lucasmagnusdasilva.cadastro.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@Table( name = "customer",
        uniqueConstraints = { @UniqueConstraint( columnNames = { "idUser", "cnpjCpf" } ) } )
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cnpjCpf;
    private Long idUser;
    private Integer active = 1;

    @OneToMany(targetEntity=Address.class, mappedBy="customer", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Address> adresses;

    @OneToMany(targetEntity=Phone.class, mappedBy="customer", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Phone> phones;

    public Customer() {
    }

    public Customer(Long id, String name, String cnpjCpf, Long idUser, Integer active) {
        this.id = id;
        this.name = name;
        this.cnpjCpf = cnpjCpf;
        this.idUser = idUser;
        this.active = active;
    }

}
