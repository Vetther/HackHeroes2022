package dev.vetther.backend.image;

import dev.vetther.backend.event.Event;
import dev.vetther.backend.role.Role;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service @AllArgsConstructor
class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Override
    public Image createImage(String imageType, byte[] image) {
        return this.imageRepository.save(new Image(null, imageType, image));
    }

    @Override
    public Set<Image> getImages() {
        return new HashSet<>(this.imageRepository.findAll());
    }

    @Override
    public Optional<Image> getImage(long id) {
        return this.imageRepository.findById(id);
    }

    @Override
    public void removeImage(long id) {
        Image image = this.imageRepository.findById(id).orElseThrow(() -> new NullPointerException("Image not found"));
        this.imageRepository.delete(image);
    }
}
