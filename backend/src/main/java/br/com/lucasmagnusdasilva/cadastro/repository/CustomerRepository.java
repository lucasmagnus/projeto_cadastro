package br.com.lucasmagnusdasilva.cadastro.repository;

import br.com.lucasmagnusdasilva.cadastro.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByCnpjCpf(String cpfCnpj);

    List<Customer> findByIdUserAndActive(Long id, Integer active);
}
