package dev.vetther.backend.user;

import dev.vetther.backend.role.Role;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@Service
public interface UserService {

    User createUser(String name, String password, String email, Collection<Role> roles);

    void setBalance(User user, double balance);
    void setRoles(User user, Collection<Role> roles);
    void addRole(User user, Role role);
    void removeRole(User user, Role role);

    Optional<Role> getRole(String roleName);
    Set<User> getUsers();
    Optional<User> getUser(String nameOrEmail);
    Optional<User> getUser(long id);

}
