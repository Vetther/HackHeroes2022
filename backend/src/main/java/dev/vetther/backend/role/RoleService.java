package dev.vetther.backend.role;

import java.util.Optional;
import java.util.Set;

public interface RoleService {

    Role createRole(String roleName);
    Set<Role> getRoles();
    Optional<Role> getRole(String roleName);
}
