package dev.vetther.backend.user;

import dev.vetther.backend.role.Role;
import dev.vetther.backend.role.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service @AllArgsConstructor
class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleService roleService;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        return getUser(usernameOrEmail).orElseThrow(() -> new UsernameNotFoundException("Username or email not found"));
    }

    @Override
    public User createUser(String name, String password, String email, Collection<Role> roles) {
        return this.userRepository.save(new User(null, name, password, email, new HashSet<>(roles)));
    }

    @Override
    public void setBalance(User user, double balance) {
        this.userRepository.save(user);
    }

    @Override
    public void setRoles(User user, Collection<Role> roles) {
        user.setRoles(new ArrayList<>(roles));
        this.userRepository.save(user);
    }

    @Override
    public void addRole(User user, Role role) {
        user.getRoles().add(role);
        this.userRepository.save(user);
    }

    @Override
    public void removeRole(User user, Role role) {
        user.getRoles().remove(role);
        this.userRepository.save(user);
    }

    @Override
    public Optional<Role> getRole(String roleName) {
        return this.roleService.getRole(roleName);
    }

    @Override
    public Set<User> getUsers() {
        return new HashSet<>(this.userRepository.findAll());
    }

    @Override
    public Optional<User> getUser(String nameOrEmail) {
        return this.userRepository.findByNameOrEmail(nameOrEmail, nameOrEmail);
    }

    @Override
    public Optional<User> getUser(long id) {
        return this.userRepository.findById(id);
    }
}
