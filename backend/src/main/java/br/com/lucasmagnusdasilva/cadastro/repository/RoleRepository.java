package br.com.lucasmagnusdasilva.cadastro.repository;

import br.com.lucasmagnusdasilva.cadastro.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

}
