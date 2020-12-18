package br.com.lucasmagnusdasilva.cadastro.controller;

import br.com.lucasmagnusdasilva.cadastro.domain.Const;
import br.com.lucasmagnusdasilva.cadastro.models.Role;
import br.com.lucasmagnusdasilva.cadastro.models.User;
import br.com.lucasmagnusdasilva.cadastro.repository.RoleRepository;
import br.com.lucasmagnusdasilva.cadastro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<User> save(@RequestBody User user) {

        Role role = this.roleRepository.findByName(Const.ROLE_CLIENT);
        this.roleRepository.save(role);

        user.setRoles(Arrays.asList(role));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = this.userRepository.save(user);
        user.setPassword("");
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<User>> list() {
        return new ResponseEntity<List<User>>(userRepository.findAll(), HttpStatus.OK);
    }

}
