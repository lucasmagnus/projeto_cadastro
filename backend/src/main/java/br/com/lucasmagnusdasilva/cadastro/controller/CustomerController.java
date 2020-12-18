package br.com.lucasmagnusdasilva.cadastro.controller;

import br.com.lucasmagnusdasilva.cadastro.domain.Const;
import br.com.lucasmagnusdasilva.cadastro.models.Address;
import br.com.lucasmagnusdasilva.cadastro.models.Customer;
import br.com.lucasmagnusdasilva.cadastro.models.Phone;
import br.com.lucasmagnusdasilva.cadastro.models.User;
import br.com.lucasmagnusdasilva.cadastro.repository.AddressRepository;
import br.com.lucasmagnusdasilva.cadastro.repository.CustomerRepository;
import br.com.lucasmagnusdasilva.cadastro.repository.PhoneRepository;
import br.com.lucasmagnusdasilva.cadastro.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PhoneRepository phoneRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Secured({Const.ROLE_ADMIN, Const.ROLE_CLIENT})
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Customer> save(@RequestBody Customer customer) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        customer.setIdUser(user.getId());

        Set<Phone> phones = customer.getPhones();
        customer.setPhones(new HashSet<>());

        Set<Address> addresses = customer.getAdresses();
        customer.setAdresses(new HashSet<>());

        customer = this.customerRepository.save(customer);

        if(phones != null)
            for(Phone phone : phones){
                phone.setCustomer(customer);
                customer.getPhones().add(this.phoneRepository.save(phone));
            }

        if(addresses != null)
            for(Address address : addresses){
                address.setCustomer(customer);
                customer.getAdresses().add(this.addressRepository.save(address));
            }

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<Customer> edit(@RequestBody Customer customer) {
        customer = this.customerRepository.save(customer);
        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }

    @Secured({Const.ROLE_CLIENT, Const.ROLE_ADMIN})
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> list() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return new ResponseEntity<List<Customer>>(customerRepository.findByIdUserAndActive(user.getId(), 1), HttpStatus.OK);
    }

}
