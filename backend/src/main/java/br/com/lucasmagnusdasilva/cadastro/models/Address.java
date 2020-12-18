package br.com.lucasmagnusdasilva.cadastro.models;
;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String street;
    private String number;
    private String district;
    private String cep;
    private String city;
    private String uf;
    private String complement;
    private Integer isPrincipal;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_customer",referencedColumnName="id")
    @JsonIgnore
    private Customer customer;

    public Address() {
    }

    public Address(Long id, String street, String number, String district, String cep, String city, String uf, String complement,
                   Integer isPrincipal) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.district = district;
        this.cep = cep;
        this.city = city;
        this.uf = uf;
        this.complement = complement;
        this.isPrincipal = isPrincipal;
    }

}
