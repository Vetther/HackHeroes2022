package dev.vetther.backend.image;

import dev.vetther.backend.role.Role;

import java.util.Optional;
import java.util.Set;

public interface ImageService {

    Image createImage(String imageType, byte[] image);
    Set<Image> getImages();
    Optional<Image> getImage(long id);
    void removeImage(long id);
}
