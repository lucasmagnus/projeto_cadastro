package br.com.lucasmagnusdasilva.cadastro.repository;

import br.com.lucasmagnusdasilva.cadastro.models.Address;
import br.com.lucasmagnusdasilva.cadastro.models.Phone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findById(Long id);
}
