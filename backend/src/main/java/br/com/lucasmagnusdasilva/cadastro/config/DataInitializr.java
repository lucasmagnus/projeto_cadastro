package br.com.lucasmagnusdasilva.cadastro.config;

import br.com.lucasmagnusdasilva.cadastro.domain.Const;
import br.com.lucasmagnusdasilva.cadastro.models.Role;
import br.com.lucasmagnusdasilva.cadastro.models.User;
import br.com.lucasmagnusdasilva.cadastro.repository.RoleRepository;
import br.com.lucasmagnusdasilva.cadastro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializr implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {

        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            createUser("admin", passwordEncoder.encode("52DA@FA524F4FG!#A"), Const.ROLE_ADMIN);
            createUser("cliente", passwordEncoder.encode("15@#FA24@F92$"), Const.ROLE_CLIENT);
        }
    }

    public void createUser(String email, String password, String roleName) {

        Role role = new Role(roleName);

        this.roleRepository.save(role);
        User user = new User(email, password, Arrays.asList(role));
        userRepository.save(user);
    }

}

