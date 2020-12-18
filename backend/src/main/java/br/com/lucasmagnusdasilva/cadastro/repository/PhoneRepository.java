package br.com.lucasmagnusdasilva.cadastro.repository;

import br.com.lucasmagnusdasilva.cadastro.models.Phone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PhoneRepository extends JpaRepository<Phone, Long> {
    Optional<Phone> findById(Long id);

}
