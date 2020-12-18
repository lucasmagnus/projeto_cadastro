package br.com.lucasmagnusdasilva.cadastro.repository;

import br.com.lucasmagnusdasilva.cadastro.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
