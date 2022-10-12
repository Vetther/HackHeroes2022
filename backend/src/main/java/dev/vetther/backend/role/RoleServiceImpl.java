package dev.vetther.backend.role;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service @AllArgsConstructor
class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role createRole(String name) {
        return this.roleRepository.save(new Role(null, name));
    }

    @Override
    public Set<Role> getRoles() {
        return new HashSet<>(this.roleRepository.findAll());
    }

    @Override
    public Optional<Role> getRole(String name) {
        return this.roleRepository.findByName(name);
    }
}
